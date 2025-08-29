import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AppLogo from "../components/AppLogo";
import { useAuth } from "../hooks/useAuth";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
const env = import.meta.env;

export default function Signup() {
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const { verify } = useAuth();
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    if (canResend) {
      getOtp("signin");
    }
  };

  const autoLogin = async () => {
    const { loggedIn } = await verify();
    if (loggedIn) navigate("/");
  };

  useEffect(() => {
    autoLogin();
  }, []);

  const handleOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.target.value.trim();
    if (!isNaN(Number(text))) {
      setOtp(text);
    }
  };

  const getOtp = async (type: string) => {
    const toastId = toast.loading("Sending OTP...");
    try {
      setLoading(true);
      await axios.post(`${env.VITE_BACKEND_URL}/api/request-otp`, {
        type,
        name,
        email,
      });
      toast.update(toastId, {
        render: "OTP Sent to email",
        type: "success",
        autoClose: 1500,
        isLoading: false,
      });
      setCanResend(false);
      setTimeLeft(120);
      setOtpSent(true);
    } catch (err) {
      if ((err as AxiosError)?.response?.status === 409) {
        toast.update(toastId, {
          render: "User already exists",
          type: "info",
          autoClose: 1500,
          isLoading: false,
        });
      } else {
        toast.update(toastId, {
          render: "Something went wrong",
          type: "error",
          autoClose: 1500,
          isLoading: false,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    const toastId = toast.loading("Verifying OTP...");
    try {
      setLoading(true);

      const response = await axios.post(
        `${env.VITE_BACKEND_URL}/api/verify-otp`,
        {
          otp,
          email,
        }
      );
      toast.update(toastId, {
        render: "Sign up successful",
        type: "success",
        autoClose: 1500,
        isLoading: false,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 410) {
        toast.update(toastId, {
          render: "OTP expired",
          type: "info",
          autoClose: 1500,
          isLoading: false,
        });
      } else if ((error as AxiosError)?.response?.status === 401) {
        toast.update(toastId, {
          render: "Wrong OTP",
          type: "error",
          autoClose: 1500,
          isLoading: false,
        });
      } else {
        toast.update(toastId, {
          render: "User not found",
          type: "error",
          autoClose: 1500,
          isLoading: false,
        });
      }
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otpSent) {
      verifyOtp();
    } else {
      getOtp("signup");
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-col w-2/4 max-md:w-full h-full justify-center items-center">
        <div className="p-2 max-sm:mb-10 max-sm:top-6 max-sm:left-1/2 max-sm:-translate-x-1/2 absolute top-1 left-1">
          <AppLogo />
        </div>
        <div className="w-full flex flex-col justify-center gap-2 max-sm:items-center px-16 max-sm:px-8">
          <h2 className="text-3xl font-bold mb-2">Sign up</h2>
          <p className="text-gray-500 mb-6">
            Sign up to keep your notes organized
          </p>
          <form
            className="max-w-2xl flex w-full flex-col items-center"
            onSubmit={handleSubmit}
          >
            <input
              required
              type="text"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border focus:outline-blue-600 rounded-lg mb-4"
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border focus:outline-blue-600 rounded-lg mb-6"
            />
            <div className="w-full mb-6">
              {otpSent && (
                <input
                  required
                  maxLength={6}
                  minLength={6}
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => handleOtp(e)}
                  className="w-full px-4 py-2 border focus:outline-blue-600 rounded-lg mb-2"
                />
              )}
              <span
                hidden={!otpSent}
                onClick={() => handleResend()}
                className="text-blue-600 underline hover:cursor-pointer"
              >
                {canResend
                  ? "Resend OTP"
                  : `Resend in ${Math.floor(timeLeft / 60)}:${String(
                      timeLeft % 60
                    ).padStart(2, "0")}`}
              </span>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full hover:bg-blue-700 disabled:bg-blue-400 font-semibold hover:cursor-pointer bg-blue-600 text-white py-2 rounded-lg"
            >
              {otpSent ? "Sign up" : "Get OTP"}
            </button>
            <p className="text-gray-500 mt-4">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/signin")}
                className="text-blue-600 underline hover:cursor-pointer"
              >
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
