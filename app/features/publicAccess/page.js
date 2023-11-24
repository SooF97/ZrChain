"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import QRCode from "qrcode.react";

import Link from "next/link";

import { ethers } from "ethers";

import ZrChain from "../zrChain.json";

import Loading from "react-loading";

const page = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);

  function handleValue(e) {
    console.log(e.target.value);
    setValue(e.target.value);
  }

  async function fetchData() {
    try {
      const provider = new ethers.providers.AlchemyProvider(
        "maticmum",
        "mrvXire3FFkkoWo_HFHsBmRpJDRh1snd"
      );
      const contract = new ethers.Contract(
        ZrChain.address,
        ZrChain.abi,
        provider
      );
      const data = await contract.publicAccess(value);
      console.log(data);
      setResult(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="bg-yellow-500  p-4  flex items-center justify-center">
        <div className="flex contain mx-auto items-center justify-between">
          {/* Search Input */}
          <div className="flex-grow mr-4">
            <input
              type="text"
              placeholder="Search by ID..."
              onChange={handleValue}
              required
              className="w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={fetchData}
            className="bg-gray-900 text-white py-2 px-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition duration-300"
          >
            <FaSearch className="text-xl" />
          </button>
        </div>
      </div>
      {result.map((item, index) => (
        <div
          key={index}
          className="border flex flex-col justify-center items-center text-lg p-3 my-2"
        >
          <h3>
            <span className="underline font-bold">Full Name : </span>
            {item[0]}
          </h3>
          <h3>
            <span className="underline font-bold">CIN ° : </span>
            {item[1]}
          </h3>
          <h3>
            <span className="underline font-bold">Gender : </span>
            {item[2]}
          </h3>
          <h3>
            <span className="underline font-bold">City : </span>
            {item[3]}
          </h3>
          {/* Map through the inner array and display its elements */}
          {item[4] && item[4].length > 0 && (
            <ul>
              {item[4].map((innerItem, i) => (
                <li key={i}>
                  <Link
                    href={innerItem}
                    target="_blank"
                    className="underline italic"
                  >
                    Download Document {i + 1}
                    <div className="flex flex-col justify-center items-center">
                      <QRCode value={innerItem} width={40} height={40} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );
};

export default page;
