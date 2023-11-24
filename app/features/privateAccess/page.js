"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaUniversity,
  FaUser,
  FaIdCard,
  FaTransgender,
  FaCity,
  FaCalendar,
  FaFile,
  FaFileImport,
} from "react-icons/fa";

import { ethers } from "ethers";

import ZrChain from "../zrChain.json";

import Loading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FormData from "form-data";
import axios from "axios";

import Login from "@/app/components/Login";

const PrivateAccess = () => {
  const API_KEY = "0c61222bc1ea3c068ab4";
  const API_SECRET =
    "ad8d7ccf60595dc5af6149eac18b1f6556a64f61bcf82c27903d2761e3a472b2";

  const [fullName, setFullName] = useState("");
  const [cin, setCin] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentUri, setDocumentUri] = useState("");

  const [txHash, setTxHash] = useState("");
  const [minted, setMinted] = useState();

  const [docIsUploading, setDocIsUploading] = useState(false);

  const [isMinting, setIsMinting] = useState(false);

  // the endpoint needed to upload the file
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  function handleFullName(e) {
    console.log(e.target.value);
    setFullName(e.target.value);
  }

  function handleCin(e) {
    console.log(e.target.value);
    setCin(e.target.value);
  }

  function handleGender(e) {
    console.log(e.target.value);
    setGender(e.target.value);
  }

  function handleCity(e) {
    console.log(e.target.value);
    setCity(e.target.value);
  }

  function handleDate(e) {
    console.log(e.target.value);
    console.log(typeof e.target.value);
    setDate(e.target.value);
  }

  function handleDocumentType(e) {
    console.log(e.target.value);
    console.log(typeof e.target.value);
    setDocumentType(e.target.value);
  }

  async function handleDocument(e) {
    e.preventDefault();
    setDocIsUploading(true);
    try {
      const file = e.target.files[0];
      console.log("filename:", file.name);
      // initialize the form data
      const formData = new FormData();

      // append the file form data to
      formData.append("file", file);

      const response = await axios.post(url, formData, {
        maxContentLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
          pinata_api_key: API_KEY,
          pinata_secret_api_key: API_SECRET,
        },
      });

      console.log(`https://ipfs.io/ipfs/${response.data.IpfsHash}`);
      setDocumentUri(`https://ipfs.io/ipfs/${response.data.IpfsHash}`);
      toast("Uploaded successfully !", { type: "success" });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    setDocIsUploading(false);
  }

  async function mintDocument() {
    setIsMinting(true);
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
      const transaction = await contract.mintCertificate(
        fullName,
        cin,
        gender,
        city,
        date,
        documentType,
        documentUri
      );
      await transaction.wait();
      console.log(transaction);
      setTxHash(transaction.hash);
      setMinted(true);
      toast("Document Registred on Blockchain successfully !", {
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
    setIsMinting(false);
  }

  return (
    <section className=" text-gray-900 py-8">
      <ToastContainer />
      <div className="container mx-auto text-center">
        {/* Section Title */}
        <FaUniversity className="text-5xl inline-block mr-2" />
        <h2 className="text-2xl md:text-3xl lg:text-6xl font-bold mb-4">
          <span className="text-gray-900"> Private Access</span>
        </h2>

        {/* University Connection */}
        <Login />

        {/* Student Data Form */}
        <div className=" flex items-center justify-center m-4">
          <div className="bg-yellow-500 p-8 rounded-lg shadow-md text-center max-w-md w-full">
            <h2 className="text-3xl font-bold mb-6">Registration Form</h2>

            {/* Full Name */}
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-gray-700 font-bold mb-2"
              >
                <FaUser className="inline-block text-xl mr-2" />
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                onChange={handleFullName}
                className="w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Full Name of the student"
                required
              />
            </div>

            {/* CIN (ID Number) */}
            <div className="mb-4">
              <label
                htmlFor="cin"
                className="block text-gray-700 font-bold mb-2"
              >
                <FaIdCard className="inline-block text-xl mr-2" />
                ID Number (CIN)
              </label>
              <input
                type="text"
                id="cin"
                name="cin"
                onChange={handleCin}
                className="w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="AZ12309"
                required
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-gray-700 font-bold mb-2"
              >
                <FaTransgender className="inline-block text-xl mr-2" />
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                onChange={handleGender}
                className="w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                {/* Add more options as needed */}
              </select>
            </div>

            {/* City */}
            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-gray-700 font-bold mb-2"
              >
                <FaCity className="inline-block text-xl mr-2" />
                City
              </label>
              <select
                id="city"
                name="city"
                onChange={handleCity}
                className="w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select City</option>
                <option value="Casablanca">Casablanca</option>
                <option value="Rabat">Rabat</option>
                <option value="Kenitra">Kenitra</option>
                <option value="Tangier">Tangier</option>
                <option value="Marrakech">Marrakech</option>
                <option value="Fes">Fes</option>
                <option value="Laayoune">Laayoune</option>
                {/* Add more options as needed */}
              </select>
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label
                htmlFor="registrationDate"
                className="block text-gray-700 font-bold mb-2"
              >
                <FaCalendar className="inline-block text-xl mr-2" />
                Registration Date
              </label>
              <input
                type="date"
                id="registrationDate"
                name="registrationDate"
                onChange={handleDate}
                className="w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            {/* Document Type */}
            <div className="mb-4">
              <label
                htmlFor="documentType"
                className="block text-gray-700 font-bold mb-2"
              >
                <FaFile className="inline-block text-xl mr-2" />
                Document Type
              </label>
              <select
                id="documentType"
                name="documentType"
                onChange={handleDocumentType}
                className="w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Document Type</option>
                <option value="Diploma">Diploma</option>
                <option value="Degree">Degree</option>
                <option value="National ID Card">National ID Card</option>
                <option value="Loan Agreement">Loan Agreement</option>
                <option value="Property Deed">Property Deed</option>
                <option value="Copyright">Copyright</option>
                <option value="Quality Assurance Document">
                  Quality Assurance Document
                </option>
                <option value="Marriage Certificate">
                  Marriage Certificate
                </option>
                <option value="Land Ownership Record">
                  Land Ownership Record
                </option>
                {/* Add more options as needed */}
              </select>
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label
                htmlFor="fileUpload"
                className="block text-gray-700 font-bold mb-2"
              >
                <FaFileImport className="inline-block text-xl mr-2" />
                Upload Document
              </label>
              <input
                type="file"
                id="fileUpload"
                name="fileUpload"
                onChange={handleDocument}
                className="w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {docIsUploading && (
                <div className="mt-2 flex justify-center">
                  <Loading type="spin" color="black" height={20} width={20} />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={mintDocument}
              className="bg-gray-900 text-white py-2 px-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition duration-300"
            >
              Submit
            </button>
            {isMinting && (
              <div className="mt-2 flex justify-center">
                <Loading type="spin" color="black" height={20} width={20} />
              </div>
            )}
          </div>
        </div>
        {minted && (
          <div className="mt-2 flex flex-col items-center justify-center">
            <Link
              href={`https://mumbai.polygonscan.com/tx/${txHash}`}
              target="_blank"
              className="underline italic text-lg"
            >
              Visit the Blockchain Explorer
            </Link>
            <Link
              href={documentUri}
              target="_blank"
              className="underline italic text-lg"
            >
              Download Document
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PrivateAccess;
