"use client";

import React, { useEffect, useState } from "react";
import CreateUrlForm from "./createUrlForm";
import axios from "axios";

export default function page() {
  const [urlsOfUser, setUrlsOfUser] = useState<string[]>([]);

  function handleShrinkedURL(url: string) {
    axios
      .post("/api/users/create-shrink-url", { url })
      .then((res) => {
        console.log(res.data);
        const newUrl = res.data.data.shrinkUrl;
        const newUrlsOfUser = [...urlsOfUser, newUrl];
        setUrlsOfUser(newUrlsOfUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCustomURL(url: string, customUrl: string) {
    axios
      .post("/api/users/create-custom-url", { url, customUrl })
      .then((res) => {
        console.log(res.data);
        const newUrl = res.data.data.shrinkUrl;
        const newUrlsOfUser = [...urlsOfUser, newUrl];
        setUrlsOfUser(newUrlsOfUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios
      .get("/api/users/all-urls")
      .then((res) => {
        console.log(res.data);
        setUrlsOfUser(res.data.data.shrinkUrls);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="mx-auto w-full flex flex-col gap-8 items-center justify-center">
      <h1 className="text-4xl mt-8 font-extrabold bg-gradient-to-b from-primary-dark to-primary bg-clip-text leading-relaxed text-transparent">
        Dashboard
      </h1>
      <CreateUrlForm createShrinkedUrl={handleShrinkedURL} createCustomUrl={handleCustomURL}/>
      <hr className=" h-[1px] w-full bg-gray-600" />
      <h1 className="text-4xl font-extrabold bg-gradient-to-b from-primary-dark to-primary bg-clip-text leading-relaxed text-transparent">
        Your Links
      </h1>
      <div className="flex flex-col gap-4 mb-4">
        {urlsOfUser.map((url) => (
          <a
            href={`http://${url}`}
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            {url}
          </a>
        ))}
      </div>
    </main>
  );
}
