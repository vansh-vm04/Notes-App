import { useEffect, useState } from "react";
import { type Note, type NotesResponse, type User } from "../utils/types";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";
import { useFetch } from "../hooks/useFetch";
import { toast } from "react-toastify";
import axios from "axios";
const env = import.meta.env;

export default function Dashboard() {
  const [userData, setUserData] = useState<User | null>();
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const [create, setCreate] = useState(false);
  const [noteInput, setNoteInput] = useState("");
  const navigate = useNavigate();
  const { verify, token } = useAuth();
  const [pageLoading, setPageLoading] = useState(true);
  const { data, loading } = useFetch(`${env.VITE_BACKEND_URL}/api/note`);
  const [saving, setSaving] = useState(false);

  const autoLogin = async () => {
    const data = await verify();
    if (!data.loggedIn) navigate("/signup");
    setUserData(data as User);
    setPageLoading(false);
  };

  useEffect(() => {
    autoLogin();
  }, []);

  useEffect(() => {
    if ((data as NotesResponse).notes) {
      setNotes((data as NotesResponse).notes);
    }
  }, [data]);

  const handleSave = async () => {
    const text = noteInput.trim();
    if (text.length == 0) {
      toast.info("Please write something");
      return;
    }
    setSaving(true);
    setCreate(false);
    const toastId = toast.loading("Saving note");
    try {
      const response = await axios.post(
        `${env.VITE_BACKEND_URL}/api/note`,
        {
          note: text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotes([...notes, response.data.note]);
      toast.update(toastId, {
        type: "success",
        render: "Note saved",
        isLoading: false,
        autoClose: 1500,
      });
      setNoteInput("");
    } catch {
      toast.update(toastId, {
        type: "error",
        render: "Something went wrong",
        isLoading: false,
        autoClose: 1500,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => {
    if (create) {
      handleSave();
    } else {
      setCreate(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${env.VITE_BACKEND_URL}/api/note/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newNotes = notes.filter((n) => n._id != id);
      setNotes(newNotes);
      toast.success("Note deleted");
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (pageLoading || loading) return <Loader />;

  return (
    <div className="min-h-screen items-center pt-20 bg-gray-100 flex flex-col">
      <main className="flex items-center flex-col max-w-3xl h-full w-full p-4 gap-4">
        <div className="space-y-6 w-full">
          <div className="bg-white w-full shadow rounded-xl p-6">
            <h2 className="text-xl font-bold">
              Welcome, {userData && userData.name} !
            </h2>
            <p className="text-gray-600">Email: {userData && userData.email}</p>
          </div>
          {create && (
            <textarea
              autoFocus
              name="note"
              placeholder="Write here..."
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className="resize-none transition-all transform-3d transform-fill duration-300 overflow-y-auto scroll-smooth w-full h-40 px-4 py-2 border border-blue-400 shadow rounded-xl bg-white focus:outline-blue-600 mb-6"
            />
          )}
          <button
            disabled={saving}
            onClick={() => handleAdd()}
            className="w-full disabled:bg-blue-400 hover:cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl"
          >
            {create ? "Save note" : "Create note"}
          </button>
        </div>
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4">Notes</h2>
          <div className="space-y-4">
            {notes.length == 0 && (
              <span>Your ideas start here. Create your first note!</span>
            )}
            {notes.map((note, i) => (
              <div
                key={i}
                className={`${
                  activeNote == i ? "" : "h-[56px]"
                } transition-all transform-3d transform-fill duration-300" flex justify-between items-center bg-white shadow rounded-xl p-4`}
              >
                <span
                  onClick={() => setActiveNote(activeNote == i ? null : i)}
                  className={`text-wrap ${
                    activeNote == i && "whitespace-normal break-words"
                  } hover:cursor-pointer h-full w-[90%] truncate`}
                >
                  {note.note}
                </span>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="hover:cursor-pointer rounded-full p-0.5 bg-transparent hover:bg-gray-300 items-start flex"
                >
                  <MdDelete color="black" size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
