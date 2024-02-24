import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google"; 
import Navbar from "./components/navbar/Navbar";
import RegisterModel from "./components/models/RegisterModel";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModel from "./components/models/LoginModel";
import getCurrentUser from "./actions/getCurrentUser";


export const metadata: Metadata = {
  title: "HMS",
  description: "Generated by create next app",
};

const font = Nunito({
  subsets: ["latin"],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

   const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <head>
      <link rel="icon" href="@/app/logo.jpg" />
      </head>
      <body className={font.className}>
        {/* <Model isOpen actionLabel="Submit" /> */}
        <ToasterProvider />
        <LoginModel />
        <RegisterModel />
        <Navbar currentUser = {currentUser} />
        {children}
        </body>
    </html>
  );
}