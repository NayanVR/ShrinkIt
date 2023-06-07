"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

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
    <section className="w-full h-screen flex items-center justify-center">
      <div className="w-full p-4 flex gap-4 flex-col justify-center items-center">
        <h1 className="text-4xl font-extrabold leading-relaxed text-white">
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
            className="px-4 py-2 border border-gray bg-dark text-white rounded-md"
            required
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="px-4 py-2 border border-gray bg-dark text-white rounded-md"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="px-4 py-2 border border-gray bg-dark text-white rounded-md"
            required
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            className="px-4 py-2 border border-gray bg-dark text-white rounded-md"
            required
          />
          <Link href="/login" className="text-white underline text-sm">
            Already have an account? Login here.
          </Link>
          <button
            type="submit"
            className="group py-2 my-4 bg-dark hover:bg-white hover:text-dark border-primary border text-white rounded-md transition-all relative"
          >
            <div className="-z-10 absolute top-0 left-0 w-full h-full bg-primary blur-xl group-hover:blur-lg transition-all"></div>
            Register
          </button>
        </form>
      </div>
    </section>
  );
}
