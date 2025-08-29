import { useState } from "react";
import { useNavigate } from "react-router";
import AppLogo from "../components/AppLogo";

export default function Signup() {
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [otp,setOtp] = useState("");

    const handleOtp = (e:React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        const text = e.target.value;
        if(!isNaN(Number(text))){
            setOtp(text);
        }
    }

  const handleSubmit = (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-screen w-screen">
        <div className="flex flex-col w-2/4 max-md:w-full h-full justify-center items-center">
            <div className="p-2 max-sm:mb-10 max-sm:top-6 max-sm:left-1/2 max-sm:-translate-x-1/2 absolute top-1 left-1">
            <AppLogo/>
        </div>
      <div className="w-full flex flex-col justify-center gap-2 max-sm:items-center px-16 max-sm:px-8">
        <h2 className="text-3xl font-bold mb-2">Sign up</h2>
        <p className="text-gray-500 mb-6">
          Sign up to keep your notes organized
        </p>
        <form className="max-w-2xl flex flex-col items-center" onSubmit={handleSubmit}>
          <input
            required
            type="text"
            name="name"
            placeholder="Your Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />
          <input
          required
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mb-6"
          />
          <input
          hidden={!otpSent}
          required
          maxLength={6}
            name="otp"
            placeholder="OTP"
            value={otp}
            onChange={(e)=>handleOtp(e)}
            className="w-full px-4 py-2 border rounded-lg mb-6"
          />
          <button
            type="submit"
            className="w-full hover:bg-blue-700 font-semibold hover:cursor-pointer bg-blue-600 text-white py-2 rounded-lg"
          >
            Get OTP
          </button>
          <p className="text-gray-500 mt-4">
          Already have an account?{" "}
          <span onClick={()=>navigate('/signin')} className="text-blue-600 hover:cursor-pointer">
            Sign in
          </span>
        </p>
        </form>
      </div>
        </div>
        
      <div className="w-3/4 p-1 max-md:hidden">
        <img
          src="/bg-signin.jpg"
          alt="Background"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
}
