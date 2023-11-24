"use client";
import { FaWallet, FaCheck } from "react-icons/fa";
import Login from "../components/Login";

import React, { useState, useEffect } from "react";

import { ethers } from "ethers";

import ZrChain from "../zrChain.json";

import Loading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const [name, setName] = useState("");
  const [universityAddress, setUniversityAddress] = useState("");
  const [registred, setRegistred] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleName(e) {
    console.log(e.target.value);
    setName(e.target.value);
  }

  function handleAddress(e) {
    console.log(e.target.value);
    setUniversityAddress(e.target.value);
  }

  async function registerEntity() {
    setIsLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address);
      const contract = new ethers.Contract(
        ZrChain.address,
        ZrChain.abi,
        signer
      );
      const smartContractOwner = await contract.contractOwner();
      console.log("This is the smart contract owner", smartContractOwner);
      if (address === smartContractOwner) {
        const transaction = await contract.registerUniversity(
          universityAddress,
          name
        );
        await transaction.wait();
        toast("Registred successfully!", { type: "success" });
        setRegistred(true);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <section className=" text-gray-900 py-20">
      <ToastContainer />
      <div className="container mx-auto text-center">
        {/* Section Title */}
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
          <span className="text-yellow-500">Entity Registration:</span>
          <h4 className="italic text-lg m-2">
            <span className="underline text-xl">Disclaimer</span>: Only smart
            contract owner can register an Entity
          </h4>
          <Login />
        </div>

        <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-lg shadow-md text-left">
          {/* University Wallet Address */}
          <div className="mb-6">
            <label
              htmlFor="walletAddress"
              className="block text-white font-bold mb-2"
            >
              University Wallet Address
            </label>
            <input
              type="text"
              id="walletAddress"
              name="walletAddress"
              className="w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="0x123.....90abcdef12345678"
              onChange={handleAddress}
              required
            />
          </div>
          {/* University Name */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-white font-bold mb-2">
              University Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="University Name"
              onChange={handleName}
              required
            />
          </div>

          {/* Register Button */}
          <div className="flex flex-col justify-center items-center">
            <button
              onClick={registerEntity}
              className="bg-yellow-500 text-gray-900 py-2 px-4 rounded-full text-lg font-semibold hover:bg-yellow-400 transition duration-300"
            >
              Register University
            </button>
            {isLoading && (
              <div className="mt-2 flex justify-center">
                <Loading type="spin" color="white" height={20} width={20} />
              </div>
            )}
          </div>
          <div>
            {registred && (
              <div>
                <FaCheck className="text-2xl text-green-700 mr-2" />
                <p className="text-green-700">
                  University registered successfully!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
