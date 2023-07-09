import React from "react";

export default function HeroBGEffect() {
  return (
    <>
      <video
        autoPlay
        muted
        loop
        className="fixed top-0 left-0 right-0 bottom-0 opacity-50 object-cover w-screen h-screen -z-10"
      >
        <source src="/chains-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 -m-32 h-64 w-64 sm:-m-48 sm:w-96 sm:h-96 opacity-10 animate-spin blur-3xl rounded-full bg-gradient-to-r from-primary via-tertiary to-secondary"></div>
      <div className="absolute top-0 right-0 -m-32 h-64 w-64 sm:-m-48 sm:w-96 sm:h-96 opacity-10 animate-spin blur-3xl rounded-full bg-gradient-to-r from-primary via-tertiary to-secondary"></div>
      <div className="absolute bottom-0 right-0 -m-32 h-64 w-64 sm:-m-48 sm:w-96 sm:h-96 opacity-10 animate-spin blur-3xl rounded-full bg-gradient-to-r from-primary via-tertiary to-secondary"></div>
      <div className="absolute bottom-0 left-0 -m-32 h-64 w-64 sm:-m-48 sm:w-96 sm:h-96 opacity-10 animate-spin blur-3xl rounded-full bg-gradient-to-r from-primary via-tertiary to-secondary"></div>
    </>
  );
}
