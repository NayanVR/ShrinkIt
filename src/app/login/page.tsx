"use client";

import axios from "axios";
import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "" || password === "") return;
    if (password.length < 6) return;

    axios
      .post("/api/auth/login", {
        username,
        password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="w-full h-full p-4 flex gap-4 flex-col justify-center items-center">
      <h1 className="text-4xl font-extrabold bg-gradient-to-b from-primary-dark to-primary bg-clip-text leading-relaxed text-transparent">
        Login
      </h1>
      <form
        className="flex flex-col w-full max-w-sm gap-2"
        onSubmit={handleSubmit}
      >
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder="Username"
          className="px-4 py-2 border rounded-md"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          className="px-4 py-2 border rounded-md"
          required
        />
        <button
          type="submit"
          className="py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-all"
        >
          Login
        </button>
      </form>
    </div>
  );
}
