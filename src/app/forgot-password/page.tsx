"use client";

import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import HeroBGEffect from "@/components/HeroBGEffect";

export default function ForgotPassword() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      userIdentifier: "",
    } as { userIdentifier: string },
    validate: (values) => {
      const errors: any = {};
      if (values.userIdentifier === "") {
        errors.userIdentifier = "Required";
      }
      return errors;
    },
    onSubmit: (values: { userIdentifier: string }) => {
      console.log(values);
      axios
        .post("/api/auth/password-reset-request", {
          userIdentifier: values.userIdentifier,
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
        <h1 className="text-3xl font-heading font-extrabold leading-relaxed text-white">
          Reset Password Request
        </h1>
        <form
          className="flex flex-col w-full max-w-sm gap-2"
          onSubmit={formik.handleSubmit}
        >
          {formik.errors.userIdentifier && (
            <div className="text-error text-sm">
              {formik.errors.userIdentifier}
            </div>
          )}
          <input
            onChange={formik.handleChange}
            value={formik.values.userIdentifier}
            id="userIdentifier"
            type="text"
            placeholder="Username or Email"
            className="px-4 py-2 border border-gray bg-dark text-white placeholder:text-gray rounded-md"
          />
          <p className="text-sm">
            Password reset link will be sent to your email associated with given
            account.
          </p>
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
