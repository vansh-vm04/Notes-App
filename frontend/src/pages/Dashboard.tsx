import { useState } from "react";

export default function Dashboard() {
  const [userData, setUserData] = useState();
  const [notes, setNotes] = useState([]);

  const handleAdd = ()=>{
    
  }

  const handleDelete = (id) => {
    
  };

  return (
    <div className="min-h-screen items-center pt-20 bg-gray-100 flex flex-col">
      <main className="flex flex-col max-w-3xl h-full w-full p-4 gap-4">
        <div className="space-y-6">
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-bold">Welcome, Jonas Kahnwald !</h2>
            <p className="text-gray-600">Email: xxxxxx@xxxx.com</p>
          </div>
          <button onClick={()=>handleAdd()} className="w-full hover:cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl">
            Create Note
          </button>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Notes</h2>
          <div className="space-y-4">
            {notes.map((note, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-white shadow rounded-xl p-4"
              >
                <span>{note.note}</span>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
