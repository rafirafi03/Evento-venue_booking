// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./store/provider";
import Script from "next/script";
import { GoogleOAuthProvider } from "@react-oauth/google";
import dotenv from 'dotenv';
import { Metadata } from "next";

dotenv.config()

const clientId = process.env.GOOGLE_AUTH_CLIENT_ID as string;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Evento",
  description: "evento booking",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
          <Script src="https://unpkg.com/flowbite@1.4.4/dist/flowbite.js" />
        </Providers>
      </body>
    </html>
  );
}
