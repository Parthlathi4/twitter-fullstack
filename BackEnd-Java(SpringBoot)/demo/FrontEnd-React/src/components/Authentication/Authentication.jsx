import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../Store/Auth/Action";

const Authentication = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
  });

  useEffect(() => {
    if (location.pathname === "/signup") {
      setIsSignup(true);
    } else {
      setIsSignup(false);
    }
  }, [location.pathname]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, dob } = form;

    try {
      if (isSignup) {
        const payload = {
          fullName: name,
          email,
          password,
          dateOfBirth: dob,
          r5: 3,
        };
        await dispatch(registerUser(payload));
        navigate("/login");
      } else {
        const payload = { email, password };
        await dispatch(loginUser(payload));
        navigate("/home");
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate(isSignup ? "/signup-success" : "/");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const toggleAuthMode = () => {
    navigate(isSignup ? "/login" : "/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-2xl rounded-xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        <div className="hidden md:flex w-1/2 bg-blue-500 items-center justify-center p-6">
          <img
            src="https://cdn.pixabay.com/photo/2017/02/08/08/39/twitter-2048133_1280.png"
            alt="Twitter Logo"
            className="w-32 h-32"
          />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Switter</h1>
          <h2 className="text-xl font-semibold text-center mb-4">
            {isSignup ? "Create your account" : "Log in to your account"}
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="my-4 text-center text-gray-500">or</div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <img
              src="https://cdn.pixabay.com/photo/2015/12/11/11/43/google-1088004_1280.png"
              alt="Google Logo"
              className="w-5 h-5"
            />
            Login with Google
          </button>

          <p className="text-center text-sm mt-4">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={toggleAuthMode}
            >
              {isSignup ? "Log in" : "Sign up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
