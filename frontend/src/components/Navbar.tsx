const Navbar = () => {
  return (
    <nav className="fixed top-2 left-1/2 -translate-x-1/2 flex rounded-3xl justify-between max-md:w-sm w-[768px] items-center px-8 py-4 border-b bg-white shadow">
      <div className="flex items-center gap-4">
        <img src="/icon.svg" alt="" />
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>
      <button className="text-blue-600 hover:cursor-pointer hover:text-blue-800 hover:underline font-medium">
        Sign Out
      </button>
    </nav>
  );
};

export default Navbar;
