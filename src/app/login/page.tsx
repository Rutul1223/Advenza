'use client';

import LoginForm from '@/components/pages/login/page';
import Image from 'next/image';
import BackgroundBubbles from '@/components/bubbles/bubbles';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 relative">
      {/* Fixed Background with Gradient and Bubbles */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 opacity-90"></div>
        <BackgroundBubbles />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-5xl h-[600px] bg-white/95 rounded-[20px] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-zinc-200 relative z-10">
        {/* Left Page - Image */}
        <div className="w-full lg:w-1/2 h-full relative">
          <Image
            src="https://images.pexels.com/photos/914128/pexels-photo-914128.jpeg"
            alt="Travel background"
            fill
            className="object-cover"
            quality={80}
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Right Page - Form */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-10 py-8 bg-white/95 relative z-10">
          {/* Branding */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome Back, Explorer 🧭
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Login to continue your adventure
            </p>
          </div>
          {/* Form */}
          <LoginForm />
        </div>

        {/* Center Fold Effect */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-zinc-300 shadow-inner z-20" />
      </div>
    </div>
  );
}