import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import RootStyleRegistry from "./emotion";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const articulat = localFont({
  src: "./ArticulatCF.ttf",
  display: "swap",
  variable: "--font-articulat",
});

export const metadata = {
  title: "ShrinkIt",
  description: "Shrink your links!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${articulat.variable}`}>
      <body className="bg-dark" suppressHydrationWarning={true}>
        <RootStyleRegistry>{children}</RootStyleRegistry>
        <Toaster />
      </body>
    </html>
  );
}
