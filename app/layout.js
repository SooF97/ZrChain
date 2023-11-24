"use client";
import { Montserrat } from "next/font/google";
import "./globals.css";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import Navbar from "./components/Navbar";

const font = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ThirdwebProvider
      activeChain="mumbai"
      clientId="03ed6dc80620c178a1786170c8d5db39"
    >
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" href="/favicon.ico" />

          {/* Title */}
          <title>
            ZrChain | Blockchain-Based Solution for Document Management
          </title>

          {/* Description */}
          <meta
            name="description"
            content="Blockchain application for document registration"
          />

          {/* Open Graph tags for social media sharing */}
          <meta
            property="og:title"
            content="ZrChain | Blockchain-Based Solution for Document Management"
          />
          <meta
            property="og:description"
            content="Blockchain application for document registration"
          />
          <meta property="og:image" content="/logo1.svg" />
          <meta property="og:url" content="https://zrchain.com" />
          <meta name="twitter:card" content="/logo1.svg" />
        </head>
        <body className={font.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </ThirdwebProvider>
  );
}
