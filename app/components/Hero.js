import Link from "next/link";
import { FaAudible } from "react-icons/fa";

const Hero = () => {
  return (
    <div className=" text-gray-900 py-20 mt-8">
      <div className="container mx-auto text-center">
        {/* Logo */}
        <FaAudible className="text-6xl mx-auto mb-4" />

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="text-yellow-500">ZrChain:</span> The Next Frontier in
          Document Security and Authentication
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl lg:text-2xl mb-8">
          <span className="bg-gray-900 text-yellow-500 rounded-md p-1">
            ZrChain
          </span>{" "}
          Solutions empowers public and private institutions to authenticate,
          secure and manage their documents on the blockchain technology
        </p>

        {/* Call-to-Action Button */}
        <Link
          href="/features" // Replace with the actual section ID or link
          className="bg-yellow-500 text-blue-900 py-2 px-4 rounded-full text-lg font-semibold hover:bg-yellow-400 transition duration-300"
        >
          Explore Features
        </Link>
      </div>
    </div>
  );
};

export default Hero;
