"use client";

import React, { useState } from "react";

interface Props {
  createShrinkedUrl: (url: string) => void;
  createCustomUrl: (url: string, customUrl: string) => void;
}

export default function createUrlForm({ createShrinkedUrl, createCustomUrl }: Props) {
  const [customURLDisabled, setCustomURLDisabled] = useState<boolean>(true);
  const [url, setUrl] = useState<string>("");
  const [customUrl, setCustomUrl] = useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (customURLDisabled) {
      createShrinkedUrl(url);
    } else {
      createCustomUrl(url, customUrl);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-sm w-full gap-2"
    >
      <input
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        type="url"
        placeholder="Enter URL"
        className="px-4 py-2 border rounded-md"
        required
      />
      <label>
        <input
          onChange={(e) => setCustomURLDisabled(!customURLDisabled)}
          checked={!customURLDisabled}
          type="checkbox"
          className="mr-2"
        />
        Custom URL
      </label>
      <label className="text-sm text-gray-500">
        (eg. mydomain.com/your-username/custom-url)
      </label>
      <input
        onChange={(e) => setCustomUrl(e.target.value)}
        value={customUrl}
        type="text"
        placeholder="Enter custom URL"
        className="px-4 py-2 border rounded-md disabled:bg-gray-200"
        disabled={customURLDisabled}
        required={!customURLDisabled}
      />
      <button
        type="submit"
        className="py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-all"
      >
        Create
      </button>
    </form>
  );
}
