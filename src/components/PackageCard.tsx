import React from "react";

interface PackageCardProps {
  image: string;
  title: string;
  duration: string;
  price: string;
}

const PackageCard: React.FC<PackageCardProps> = ({ image, title, duration, price }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-md max-w-xs">
      <div
        className="h-72 bg-cover bg-center flex items-end p-4 text-white"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className=" bg-opacity-50 w-full p-2 rounded">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm">{duration}</p>
          <p className="text-sm text-green-300 font-semibold">{price}</p>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
