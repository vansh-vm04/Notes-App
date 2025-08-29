import { Route, Routes, useLocation } from "react-router";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();
  const showNavbar = ['/'].includes(location.pathname);
  
  return (
    <>
    {showNavbar && <Navbar/>}
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
      <ToastContainer autoClose={1500} position="top-right"/>
    </>
  );
}

export default App;
