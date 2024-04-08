"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { RegisterUserSchemaType } from "@/lib/validations/user.schema";
import { validateRegistrationForm } from "@/lib/validations/forms";
import HeroBGEffect from "@/components/HeroBGEffect";

export default function Register() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    } as RegisterUserSchemaType,
    validate: validateRegistrationForm,
    onSubmit: (
      values: RegisterUserSchemaType,
      { setErrors, setSubmitting }
    ) => {
      axios
        .post("/api/auth/register", {
          username: values.username,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        })
        .then((res) => {
          console.log(res);
          router.push("/dashboard");
        })
        .catch((err) => {
          console.error(err.response.data);
          setErrors(err.response.data.errors);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <section className="w-full h-screen flex items-center justify-center overflow-hidden relative">
      <HeroBGEffect />
      <div className="w-full p-4 flex gap-4 flex-col justify-center items-center">
        <h1 className="text-4xl font-heading font-extrabold leading-relaxed text-white">
          Register
        </h1>
        <form
          className="flex flex-col w-full max-w-sm gap-1"
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
            className="px-4 py-2 mb-1 border border-gray bg-dark text-white placeholder:text-gray rounded-md"
          />
          {formik.errors.email && (
            <div className="text-error text-sm">{formik.errors.email}</div>
          )}
          <input
            onChange={formik.handleChange}
            value={formik.values.email}
            id="email"
            type="email"
            placeholder="Email"
            className="px-4 py-2 mb-1 border border-gray bg-dark text-white placeholder:text-gray rounded-md"
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
            className="px-4 py-2 mb-1 border border-gray bg-dark text-white placeholder:text-gray rounded-md"
          />
          {formik.errors.confirmPassword && (
            <div className="text-error text-sm">
              {formik.errors.confirmPassword}
            </div>
          )}
          <input
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="px-4 py-2 mb-1 border border-gray bg-dark text-white placeholder:text-gray rounded-md"
          />
          <Link href="/login" className="text-white underline text-sm">
            Already have an account? Login here.
          </Link>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="group py-2 my-4 bg-dark hover:bg-white hover:text-dark border-primary border text-white rounded-md transition-all relative"
          >
            <div className="-z-10 absolute top-0 left-0 w-full h-full bg-primary blur-xl group-hover:blur-lg transition-all"></div>
            {formik.isSubmitting ? "Please wait..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
}
