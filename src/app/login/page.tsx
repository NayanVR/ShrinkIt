"use client";

import axios from "axios";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { LoginUserSchemaType } from "@/lib/validations/user.schema";
import { useFormik } from "formik";
import { validateLoginForm } from "@/lib/validations/forms";
import { toast } from "react-hot-toast";
import HeroBGEffect from "@/components/HeroBGEffect";

export default function Login() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    } as LoginUserSchemaType,
    validate: validateLoginForm,
    onSubmit: (values: LoginUserSchemaType) => {
      axios
        .post("/api/auth/login", {
          username: values.username,
          password: values.password,
        })
        .then((res) => {
          console.log(res);
          router.push("/dashboard");
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            style: {
              background: "#1e1e1e",
              color: "#fff",
            },
            duration: 3000,
          });
          console.error(err.response.data);
        });
    },
  });

  return (
    <section className="w-full h-screen flex items-center justify-center overflow-hidden relative">
      <HeroBGEffect />
      <div className="w-full p-4 flex gap-4 flex-col justify-center items-center">
        <h1 className="text-4xl font-heading font-extrabold leading-relaxed text-white">
          Login
        </h1>
        <form
          className="flex flex-col w-full max-w-sm gap-2"
          onSubmit={formik.handleSubmit}
        >
          {formik.errors.username && (
            <div className="text-error text-sm">{formik.errors.username}</div>
          )}
          <input
            onChange={formik.handleChange}
            value={formik.values.username}
            id="username"
            type="text"
            placeholder="Username"
            className="px-4 py-2 border border-gray bg-dark text-white placeholder:text-gray rounded-md"
          />
          {formik.errors.password && (
            <div className="text-error text-sm">{formik.errors.password}</div>
          )}
          <input
            onChange={formik.handleChange}
            value={formik.values.password}
            id="password"
            type="password"
            placeholder="Password"
            className="px-4 py-2 border border-gray bg-dark text-white placeholder:text-gray rounded-md"
          />
          <Link href="/register" className="text-white underline text-sm">
            Don't have an account? Register here
          </Link>
          <Link
            href="/forgot-password"
            className="text-white underline text-sm"
          >
            Forgot Password?
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
