'use client';

import Link from "next/link";

export default function LoginForm() {
  return (
    <form className="space-y-6">
      {/* Input Fields */}
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-800"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-800"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-zinc-800"
          />
          Remember me
        </label>
        <a
          href="#"
          className="text-black hover:underline hover:text-zinc-800 transition-colors"
        >
          Forgot password?
        </a>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-black text-white font-semibold shadow-md hover:bg-zinc-900 transition"
      >
        Login
      </button>

      {/* Register CTA */}
      <div className="text-center text-sm text-gray-600 mt-4">
        New to Advenza?{' '}
        <Link
          href="/register"
          className="text-black hover:underline hover:text-zinc-800 transition-colors"
        >
          Register your trail
        </Link>
      </div>
    </form>
  );
}
