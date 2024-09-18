import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/app/_trpc/Provider";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/papercss@1.9.2/dist/paper.min.css"
        />
      </head>
      <body className={inter.className}>
        <Provider>
          <Toaster />
          {children}
        </Provider>
      </body>
    </html>
  );
}