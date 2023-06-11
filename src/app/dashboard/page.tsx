"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CreateUrlForm from "./create-url-form";
import axios from "axios";
import Navbar from "./navbar";
import MyLinks from "./my-links";
import { DashboardLinkComponent } from "@/lib/types/dashboard";

export default function page() {
  const [linksOfUser, setLinksOfUser] = useState<DashboardLinkComponent[]>([]);

  useEffect(() => {
    axios
      .get("/api/users/all-urls")
      .then((res) => {
        console.log(res.data);
        setLinksOfUser(res.data.data.URLs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleShrinkedURL(url: string, name: string) {
    axios
      .post("/api/users/create-shrink-url", { url, name })
      .then((res) => {
        console.log(res.data);
        const newUrl = res.data.data.URL as DashboardLinkComponent;
        const newlinksOfUser = [newUrl, ...linksOfUser];
        setLinksOfUser(newlinksOfUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCustomURL(url: string, customUrl: string, name: string) {
    axios
      .post("/api/users/create-custom-url", { url, customUrl, name })
      .then((res) => {
        console.log(res.data);
        const newUrl = res.data.data.URL as DashboardLinkComponent;
        const newlinksOfUser = [newUrl, ...linksOfUser];
        setLinksOfUser(newlinksOfUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteURL(urlID: string, isCustom: boolean) {
    axios.post("/api/users/delete-url", { urlID, isCustom }).then((res) => {
      console.log(res.data);
      const newlinksOfUser = linksOfUser.filter((link) => link.urlID !== urlID);
      setLinksOfUser(newlinksOfUser);
    });
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-screen-2xl flex flex-col items-center justify-center text-white">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-items-center md:justify-items-start px-4 md:px-36 py-16">
          <CreateUrlForm
            createShrinkedUrl={handleShrinkedURL}
            createCustomUrl={handleCustomURL}
          />
          <Image
            src="/shrinkit-info.png"
            alt="How ShrinkIt Works?"
            className="mt-12 hidden md:block lg:mr-16 w-full max-w-lg h-auto place-self-center"
            width={500}
            height={250}
          />
        </div>
        <hr className="h-[1px] w-full border-0 bg-gradient-to-r from-transparent to-transparent via-gray opacity-25" />
        <MyLinks linksOfUser={linksOfUser} deleteUrl={handleDeleteURL} />
      </main>
    </>
  );
}
