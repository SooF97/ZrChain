"use client";
import Link from "next/link";
import {
  ThirdwebProvider,
  ConnectWallet,
  darkTheme,
  useAddress,
} from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";

import { FaUniversity } from "react-icons/fa";

import { ethers } from "ethers";

import ZrChain from "../zrChain.json";

const page = () => {
  const address = useAddress();
  const [isRegistred, setIsRegistred] = useState(false);

  const customDarkTheme = darkTheme({
    fontFamily: "Montserrat, sans-serif",
    colors: {
      primaryButtonBg: "#211750",
      modalBg: "#CCC5F0",
      accentText: "#211750",
      primaryButtonText: "white",
      primaryText: "#211750",
      secondaryText: "#5D5A6C",
      connectedButtonBg: "#B5B2C6",
      connectedButtonBgHover: "#867BC5",
      dropdownBg: "#B5B2C6",
      scrollbarBg: "#867BC5",

      // ... etc
    },
  });

  async function checkAddress() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const contract = new ethers.Contract(
        ZrChain.address,
        ZrChain.abi,
        provider
      );
      const universities = await contract.getRegistredUniversities();
      console.log(universities);
      for (let i = 0; i < universities.length; i++) {
        if (universities[i][0] === address) {
          setIsRegistred(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkAddress();
  }, [address]);

  return (
    <div>
      <div className="container mx-auto text-center">
        {/* Section Title */}
        <FaUniversity className="text-5xl inline-block mr-2" />
        <h2 className="text-2xl md:text-3xl lg:text-6xl font-bold mb-4">
          <span className="text-gray-900"> Private Access</span>
        </h2>
      </div>
      <div className="flex flex-col justify-center items-center">
        <ConnectWallet
          btnTitle="Sign In"
          modalTitle="Sign In"
          theme={customDarkTheme}
          welcomeScreen={{
            title: "Welcome to ZrChain",
            subtitle: "Blockchain-based Document Registration Solution ",
            img: {
              src: "https://ipfs.io/ipfs/QmWtex9qERcmCFB48D92EL9ZqMT8YzRzRycsW5mzHvA1xA",
              width: 200,
              height: 200,
            },
          }}
        />
      </div>

      {isRegistred && (
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
          <Link href="/features/privateAccess">
            <button className="certify bg-gray-900 text-white">
              <span>Certify Document</span>
              <svg
                width="34"
                height="34"
                viewBox="0 0 74 74"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="37"
                  cy="37"
                  r="35.5"
                  stroke="white"
                  strokeWidth="3"
                ></circle>
                <path
                  d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                  fill="white"
                ></path>
              </svg>
            </button>
          </Link>
          <Link href="/features/privateData">
            <button className="private">
              <span>Get Private Data</span>
              <svg
                width="34"
                height="34"
                viewBox="0 0 74 74"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="37"
                  cy="37"
                  r="35.5"
                  stroke="black"
                  strokeWidth="3"
                ></circle>
                <path
                  d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                  fill="black"
                ></path>
              </svg>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
