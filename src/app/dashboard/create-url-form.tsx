"use client";

import React, { useState } from "react";

interface Props {
  createShrinkedUrl: (url: string, name: string) => void;
  createCustomUrl: (url: string, customUrl: string, name: string) => void;
}

export default function createUrlForm({
  createShrinkedUrl,
  createCustomUrl,
}: Props) {
  const [customURLDisabled, setCustomURLDisabled] = useState<boolean>(true);
  const [url, setUrl] = useState<string>("");
  const [urlName, setUrlName] = useState<string>("");
  const [customUrl, setCustomUrl] = useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (customURLDisabled) {
      createShrinkedUrl(url, urlName);
    } else {
      createCustomUrl(url, customUrl, urlName);
    }
  }

  return (
    <div className="flex flex-col items-center md:items-start w-full">
      <h1 className="text-4xl font-heading font-extrabold bg-gradient-to-b from-tertiary to-tertiary-dark bg-clip-text leading-relaxed text-transparent relative inline-block">
        <div className="-z-10 absolute top-0 left-0 w-full h-full bg-tertiary blur-3xl opacity-50 transition-all"></div>
        Create Link
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-md w-full gap-2 mt-2"
      >
        <input
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          type="url"
          placeholder="Enter your URL"
          className="px-4 py-2 border border-gray bg-dark text-white placeholder:text-gray rounded-md"
          required
        />
        <input
          onChange={(e) => setUrlName(e.target.value)}
          value={urlName}
          type="text"
          placeholder="Name (optional)"
          className="px-4 py-2 border border-gray bg-dark text-white placeholder:text-gray rounded-md"
        />
        <div className="flex flex-col">
          <label>
            <input
              onChange={(e) => setCustomURLDisabled(!customURLDisabled)}
              checked={!customURLDisabled}
              type="checkbox"
              className="mr-2"
            />
            Custom URL
          </label>
          <label className="text-sm text-gray">
            (eg. shrinkit.in/your-username/custom-url)
          </label>
        </div>
        <input
          onChange={(e) => setCustomUrl(e.target.value)}
          value={customUrl}
          type="text"
          placeholder="Enter custom URL"
          className="px-4 py-2 border border-gray bg-dark disabled:bg-[#222222] text-white placeholder:text-gray rounded-md"
          disabled={customURLDisabled}
          required={!customURLDisabled}
        />
        <button
          type="submit"
          className="group py-2 my-4 bg-dark hover:bg-white hover:text-dark border-primary border text-white rounded-md transition-all relative"
        >
          <div className="-z-10 absolute top-0 left-0 w-full h-full bg-primary blur-xl group-hover:blur-lg transition-all"></div>
          Shrink It
        </button>
      </form>
    </div>
  );
}
