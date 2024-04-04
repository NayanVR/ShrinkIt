import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <video
        autoPlay
        muted
        loop
        className="fixed top-0 left-0 right-0 bottom-0 object-cover w-screen h-screen -z-10"
      >
        <source src="/chains-bg.mp4" type="video/mp4" />
      </video>
      <Image
        src="/broken-link.svg"
        alt="Broken Link 404"
        width={200}
        height={200}
      />
      <h1 className="text-6xl font-heading text-white">404</h1>
      <h1 className="text-lg font-sans text-center">
        You have broken something!
      </h1>
      <Link
        href="/"
        className="flex items-center gap-1 text-white mt-4 font-sans underline"
      >
        <span>Go to ShrinkIt</span>
        <BsArrowRight />
      </Link>
    </main>
  );
}
