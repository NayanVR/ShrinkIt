"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CreateUrlForm from "./create-url-form";
import axios from "axios";
import Navbar from "./navbar";
import MyLinks from "./my-links";
import { DashboardLinkComponent } from "@/lib/types/dashboard";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import EditLinkModal from "./edit-link-modal";
import toast from "react-hot-toast";

export default function page() {
  const [linksOfUser, setLinksOfUser] = useState<DashboardLinkComponent[]>([]);
  const [editLinkComponent, setEditLinkComponent] =
    useState<DashboardLinkComponent>({
      urlID: "",
      name: "",
      shrinkURL: "",
      originalURL: "",
      isCustom: false,
      visits: 0,
      hostName: "",
      createdAt: new Date(),
    });
  const [opened, { open, close }] = useDisclosure(false);

  const clipboard = useClipboard({ timeout: 1000 });

  useEffect(() => {
    // let links: DashboardLinkComponent[] = [];
    // for (let i = 0; i < 5; i++) {
    //   links.push({
    //     urlID: "123" + i,
    //     name: "Google" + i,
    //     shrinkURL: i % 2 === 0 ? "nayanvr/abc" + i : "abc" + i,
    //     originalURL: "https://google.com",
    //     isCustom: i % 2 === 0,
    //     visits: 0,
    //     hostName: "shrinkit.com",
    //     createdAt: new Date(),
    //   });
    // }
    // setLinksOfUser(links);
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
        copyToClipboard(newUrl.hostName + "/" + newUrl.shrinkURL);
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
        copyToClipboard(newUrl.hostName + "/" + newUrl.shrinkURL);
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

  function handleEditURL(link: DashboardLinkComponent) {
    setEditLinkComponent(link);
    open();
  }

  function updateLink(link: DashboardLinkComponent): void {
    console.log(link);
    axios
      .post("/api/users/update-url", { link })
      .then((res) => {
        console.log(res.data.data.updatedUrl);
        const updatedLink = res.data.data.updatedUrl as DashboardLinkComponent;
        const newlinksOfUser = linksOfUser.map((l) =>
          l.urlID === updatedLink.urlID ? updatedLink : l
        );
        setLinksOfUser(newlinksOfUser);
        close();
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
        <MyLinks
          linksOfUser={linksOfUser}
          deleteUrl={handleDeleteURL}
          editUrl={handleEditURL}
        />
        <EditLinkModal
          opened={opened}
          close={close}
          link={editLinkComponent}
          updateLink={updateLink}
        />
      </main>
    </>
  );
}
