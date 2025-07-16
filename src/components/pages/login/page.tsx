"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("✅ Login successful!");
      router.push("/"); // ✅ Now this works
    } else {
      setMessage(`❌ ${data.error}`);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-800"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-800"
        />
      </div>

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

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-black text-white font-semibold shadow-md hover:bg-zinc-900 transition"
      >
        Login
      </button>

      {message && (
        <p className="text-sm mt-2 text-center text-red-500">{message}</p>
      )}

      <div className="text-center text-sm text-gray-600 mt-4">
        New to Advenza?{" "}
        <Link
          href="/register"
          className="text-black hover:underline hover:text-zinc-800 transition-colors"
        >
          Register your trail
        </Link>
      </div>
      <div className="text-center text-sm text-gray-600 mt-4">
        <Link
          href="/"
          className="text-black hover:text-zinc-800 transition-colors"
        >
          ← Back to Homepage
        </Link>
      </div>
    </form>
  );
}
