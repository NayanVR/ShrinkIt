"use client";

import axios from "axios";
import Link from "next/link";
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
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="w-full p-4 flex gap-4 flex-col justify-center items-center">
        <h1 className="text-4xl font-extrabold leading-relaxed text-white">
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
          <Link href="/register" className="text-white underline text-sm">
            Don't have an account? Register here.
          </Link>
          <button
            type="submit"
            className="group py-2 my-4 bg-dark hover:bg-white hover:text-dark border-primary border text-white rounded-md transition-all relative"
          >
            <div className="-z-10 absolute top-0 left-0 w-full h-full bg-primary blur-xl group-hover:blur-lg transition-all"></div>
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
