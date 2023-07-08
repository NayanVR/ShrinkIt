"use client";

import { useClipboard } from "@mantine/hooks";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function AnonUrlForm() {
  const [url, setUrl] = useState<string>("");

  const clipboard = useClipboard({ timeout: 1000 });

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const toastId = toast.loading("Creating anonymous URL...", {
      style: {
        background: "#1e1e1e",
        color: "#fff",
      },
    });

    axios
      .post("/api/util/create-anon-url", { url })
      .then((res) => {
        console.log(res.data);
        const generateUrl = res.data.data;
        toast.dismiss(toastId);
        copyToClipboard(generateUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function copyToClipboard(text: string) {
    clipboard.copy(text);
    toast.success("Copied to clipboard!", {
      style: {
        background: "#1e1e1e",
        color: "#fff",
      },
      duration: 3000,
      iconTheme: {
        primary: "#4CC700",
        secondary: "#1e1e1e",
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xs w-full gap-0 mt-2">
      <input
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        type="url"
        placeholder="Enter your URL"
        className="w-full px-4 py-2 border border-r-0 border-gray bg-dark text-white placeholder:text-gray rounded-l-md"
        required
      />
      <button
        type="submit"
        className="group py-2 px-3 bg-white hover:bg-dark hover:text-white border-gray border text-dark rounded-r-md transition-all"
      >
        Try&nbsp;Now!
      </button>
    </form>
  );
}
