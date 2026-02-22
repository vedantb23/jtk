import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("testuser");
  const [password, setPassword] = useState("Test123");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "testuser" && password === "Test123") {
      navigate("/list");
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-xl shadow-xl w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <input
          className="w-full p-3 border rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        <input
          type="password"
          className="w-full p-3 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />


        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
