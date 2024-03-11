import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/todo");
  }, [user, loading]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-800 max-w-[400px] w-full mx-auto rounded-lg p-8 px-8 shadow-lg">
        <h2 className="text-4xl font-bold text-white text-center mb-8">Sign In</h2>
        <input
          type="text"
          className="rounded-lg bg-gray-700 w-full py-2 px-4 mb-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <input
          type="password"
          className="rounded-lg bg-gray-700 w-full py-2 px-4 mb-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Sign In
        </button>
        <button
          className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={signInWithGoogle}
        >
          Sign In with Google
        </button>
        <div className="text-center mt-4">
          <Link to="/reset" className="text-blue-500 hover:underline">
            Forgot Password
          </Link>
        </div>
        <div className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register now
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

export default Login;

