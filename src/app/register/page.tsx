"use client";

import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "") return;
    if (password.length < 6) return;
    if (password !== confirmPassword) return;

    axios
      .post("/api/auth/register", {
        username,
        email,
        password,
        confirmPassword,
      })
      .then((res) => {
        console.log(res);
        window.location.href = "/login";
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="w-full h-full p-4 flex gap-4 flex-col justify-center items-center">
      <h1 className="text-4xl font-extrabold bg-gradient-to-b from-primary-dark to-primary bg-clip-text leading-relaxed text-transparent">
        Register
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
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
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
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          type="password"
          placeholder="Confirm Password"
          className="px-4 py-2 border rounded-md"
          required
        />
        <button
          type="submit"
          className="py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-all"
        >
          Register
        </button>
      </form>
    </div>
  );
}
