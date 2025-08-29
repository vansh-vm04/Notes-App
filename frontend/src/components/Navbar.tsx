import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
    const {logOut} = useAuth();
  return (
    <nav className="fixed top-2 left-1/2 -translate-x-1/2 flex rounded-4xl justify-between max-md:w-full w-[768px] items-center px-8 py-4  bg-gray-100 shadow">
      <div className="flex items-center gap-4">
        <img src="/icon.svg" alt="" />
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>
      <button onClick={logOut} className="text-blue-600 underline hover:cursor-pointer hover:text-blue-800 font-medium">
        Sign Out
      </button>
    </nav>
  );
};

export default Navbar;
