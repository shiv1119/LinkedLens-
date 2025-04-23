import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import BackToTop from "@/components/common/BackToTop";
import SessionWrapper from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LinkedLens",
  description: "Linkedin profile photo professionalism checker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <SessionWrapper>
      <Navbar />
        <div className="min-h-screen">
          {children}
        </div>
        <BackToTop />
        <Footer />
      </SessionWrapper>
      </body>
    </html>
  );
}
