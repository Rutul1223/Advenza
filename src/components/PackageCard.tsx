import React from "react";
import Image from "next/image";

interface PackageCardProps {
  image: string;
  title: string;
  duration: string;
  price: string;
}

const PackageCard: React.FC<PackageCardProps> = ({ 
  image, 
  title, 
  duration, 
  price 
}) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-md max-w-xs relative group">
      {/* Image Container */}
      <div className="h-72 relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={80}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
        <div className="bg-black bg-opacity-50 backdrop-blur-sm p-4 rounded-lg">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm">{duration}</p>
          <p className="text-sm text-green-300 font-semibold">{price}</p>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;