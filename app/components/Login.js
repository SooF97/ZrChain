"use client";

import {
  ThirdwebProvider,
  ConnectWallet,
  darkTheme,
} from "@thirdweb-dev/react";

import React from "react";

const Login = () => {
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
  return (
    <ThirdwebProvider
      activeChain="mumbai"
      clientId="03ed6dc80620c178a1786170c8d5db39"
    >
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
    </ThirdwebProvider>
  );
};

export default Login;
