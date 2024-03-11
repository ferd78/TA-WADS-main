import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../firebase";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/todo");
  }, [user, loading]);

  const handleReset = () => {
    sendPasswordReset(email);
    setEmail(""); 
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="bg-gray-800 max-w-[400px] w-full mx-auto rounded-lg p-8 px-8 shadow-lg">
        <input
          type="text"
          className="rounded-lg bg-gray-700 w-full py-2 px-4 mb-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleReset}
        >
          Send password reset email
        </button>
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

export default Reset;
