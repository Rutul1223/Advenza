'use client';

import RegisterForm from '@/components/pages/register/page';
import Image from 'next/image';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 px-4 py-10">
      <div className="w-full max-w-5xl h-[650px] bg-white rounded-[20px] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-zinc-200 relative">
        {/* Left Page - Image */}
         <div className="w-full lg:w-1/2 h-full relative">
            <Image
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJla2tpbmd8ZW58MHx8MHx8fDA%3D"
              alt="Travel background"
              fill
              className="object-cover"
              quality={80}
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

        {/* Right Page - Form */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-10 py-8 bg-white relative z-10">
          {/* Branding */}
          <div className="mb-6 text-left">
            <h1 className="text-3xl font-bold text-gray-800">Signup</h1>
            <p className="text-sm text-gray-500 mt-2">
              Register to continue your adventure
            </p>
          </div>

          {/* Form */}
          <RegisterForm />
        </div>

        {/* Center Fold Effect */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-zinc-300 shadow-inner z-20" />
      </div>
    </div>
  );
}
