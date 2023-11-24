"use client";
import React, { useEffect, useState } from "react";

import { ethers } from "ethers";

import ZrChain from "../zrChain.json";

import Loading from "react-loading";

const page = () => {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchPrivateData() {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address);
      const contract = new ethers.Contract(
        ZrChain.address,
        ZrChain.abi,
        signer
      );
      const data = await contract.getPrivateDataLake();
      console.log(data);
      setResult(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPrivateData();
  }, []);

  return (
    <div className="flex -flex-col justify-center items-center">
      {isLoading && (
        <div className="mt-2 flex justify-center">
          <Loading type="spin" color="black" height={80} width={80} />
        </div>
      )}
      {result.map((item, index) => (
        <div key={index}>
          {/* First Array */}
          {Array.isArray(item[0]) && (
            <table className="table-auto border-collapse border border-gray-800  m-8">
              <thead>
                <tr>
                  <th className="border border-gray-800">
                    Address - Name - Minted Docs - Registred - Docs Ids - Cins
                  </th>

                  {/* Add more headers as needed */}
                </tr>
              </thead>
              <tbody>
                {item[0].map((element, elementIndex) => (
                  <tr
                    key={elementIndex}
                    className={
                      elementIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }
                  >
                    <td className="border border-gray-800">
                      {element.toString()}
                    </td>
                    {/* Add more cells as needed */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Second Array */}
          {Array.isArray(item[1]) && (
            <table className="table-auto border-collapse border border-gray-800 w-full mb-4">
              <tbody>
                {item[1].map((element, elementIndex) => (
                  <tr
                    key={elementIndex}
                    className={
                      elementIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }
                  >
                    <td className="border border-gray-800">
                      {element.toString()}
                    </td>
                    {/* Add more cells as needed */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Third Array */}
          {Array.isArray(item[2]) && (
            <table className="table-auto border-collapse border border-gray-800 w-full">
              <tbody>
                {item[2].map((element, elementIndex) => (
                  <tr
                    key={elementIndex}
                    className={
                      elementIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }
                  >
                    <td className="border border-gray-800">
                      {element.toString()}
                    </td>
                    {/* Add more cells as needed */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

export default page;
