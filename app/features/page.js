import { FaLock, FaGlobe } from "react-icons/fa";
import Link from "next/link";

const Features = () => {
  return (
    <section className=" py-20">
      <div className="container mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
          Explore the <span className="text-yellow-500">Features</span> of
          ZrChain
        </h2>

        {/* Feature Buttons */}
        <div className="flex flex-col m-6 md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Public Access Button */}
          <FeatureButton
            icon={<FaGlobe className="text-4xl" />}
            title="Public Access"
            description="View and manage your documents."
            actionText="Explore Now"
            actionLink="/features/publicAccess" // Replace with the actual link
          />

          {/* Private Access Button */}
          <FeatureButton
            icon={<FaLock className="text-4xl" />}
            title="Private Access"
            description="Register any document on the blockchain."
            actionText="Register Now"
            actionLink="/features/adminAccess" // Replace with the actual link
          />
        </div>
      </div>
    </section>
  );
};

const FeatureButton = ({
  icon,
  title,
  description,
  actionText,
  actionLink,
}) => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md text-center">
      {icon}
      <h3 className="text-2xl font-bold mt-4 mb-2">{title}</h3>
      <p className="text-gray-200 mb-4">{description}</p>
      <Link
        href={actionLink}
        className="bg-yellow-500 text-gray-900 py-2 px-4 rounded-full text-lg font-semibold hover:bg-yellow-400 transition duration-300 inline-block"
      >
        {actionText}
      </Link>
    </div>
  );
};

export default Features;
