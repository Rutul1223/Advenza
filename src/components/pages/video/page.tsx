'use client';
import React from "react";

export default function VideoSection() {
  return (
    <section className="px-4 md:px-16 bg-white">
      <div className="relative rounded-2xl overflow-hidden max-w-7xl mx-auto shadow-md">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-[400px] md:h-[500px] object-cover"
        >
          <source src="https://cdn.prod.website-files.com/675fdb38b60bc5242af8cd90/675fdb38b60bc5242af8cdf0_6981302-sd_960_540_25fps-transcode.mp4" type="video/mp4" />
          <source src="https://cdn.prod.website-files.com/675fdb38b60bc5242af8cd90/675fdb38b60bc5242af8cdf0_6981302-sd_960_540_25fps-transcode.webm" type="video/webm" />
        </video>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4 bg-black/30">
          <h2 className="text-4xl md:text-5xl font-semibold">
            Our <em className="italic">Journey</em> in pictures
          </h2>
          <p className="mt-4 text-sm md:text-base max-w-xl">
            See what makes each experience with our trips exceptional.
          </p>
        </div>
      </div>
    </section>
  );
}
