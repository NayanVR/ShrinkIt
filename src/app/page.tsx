import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import AnonUrlForm from "./anon-url-form";
import HeroBGEffect from "@/components/HeroBGEffect";

export default function Home() {
  return (
    <main className="w-full h-screen px-4 flex flex-col items-center justify-between relative overflow-hidden">
      <HeroBGEffect />

      {/* Top Logo */}
      <div className="w-64 h-20 relative">
        <Image
          src="/hero-logo-bg.svg"
          alt="Polygon"
          width={300}
          height={200}
          className="absolute -top-px left-1/2 -translate-x-1/2"
        />
        <Image
          src="/full-logo.svg"
          alt="Shrinkit Logo"
          width={100}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Hero Section */}
      <div className="flex flex-col gap-2 items-center">
        <div className="flex flex-col justify-center flex-wrap sm:flex-row text-6xl sm:text-8xl font-heading text-center text-transparent">
          <h1 className="animate-firstTitle from-white to-white bg-clip-text">
            Free.
          </h1>
          <h1 className="animate-secondTitle from-white to-white bg-clip-text">
            Fast.
          </h1>
          <h1 className="animate-thirdTitle from-white to-white bg-clip-text">
            No Ads.
          </h1>
        </div>
        <p className="text-center font-sans text-gray">
          Problem with sharing long links?
          <br />
          Shrink your links with Shrinkit 😉
        </p>
        <Link
          href={"/login"}
          className="my-4 px-6 py-2 rounded-md bg-dark text-white border animate-ctaButtonBorder hover:bg-white hover:text-dark transition-all text-lg relative"
        >
          <div className="-z-10 absolute top-0 left-0 w-full h-full animate-ctaButtonBlur blur-xl"></div>
          Shrinkit
          <BsArrowRight className="inline-block ml-2" />
        </Link>
        <div className="flex items-center w-full max-w-xs gap-4">
          <hr className="w-full text-gray opacity-50" />
          OR
          <hr className="w-full text-gray opacity-50" />
        </div>
        <AnonUrlForm />
      </div>

      {/* dummy div for flex alignment */}
      <div className="h-8"></div>
    </main>
  );
}
