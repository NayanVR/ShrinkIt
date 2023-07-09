"use client";

import HeroBGEffect from "@/components/HeroBGEffect";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function PasswordReset() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    } as { password: string; confirmPassword: string },
    validate: (values) => {
      const errors: any = {};
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 6) {
        errors.password = "Must be 6 characters or greater";
      }

      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
      return errors;
    },
    onSubmit: (values) => {
      axios
        .post(`/api/auth/reset-password?token=${token}`, {
          password: values.password,
        })
        .then((res) => {
          console.log(res);
          toast.success(res.data.message, {
            style: {
              background: "#1e1e1e",
              color: "#fff",
            },
            duration: 5000,
            iconTheme: {
              primary: "#4CC700",
              secondary: "#1e1e1e",
            },
          });
          router.push("/login");
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
          Reset Password
        </h1>
        <form
          className="flex flex-col w-full max-w-sm gap-2"
          onSubmit={formik.handleSubmit}
        >
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
            className="px-4 py-2 border border-gray bg-dark text-white placeholder:text-gray rounded-md"
          />
          <button
            type="submit"
            className="group py-2 my-4 bg-dark hover:bg-white hover:text-dark border-primary border text-white rounded-md transition-all relative"
          >
            <div className="-z-10 absolute top-0 left-0 w-full h-full bg-primary blur-xl group-hover:blur-lg transition-all"></div>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
