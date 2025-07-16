"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Reset any previous message

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Registration successful!");
      router.push("/login");
    } else {
      setMessage(`❌ ${data.error}`);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-800"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-800"
        />
        <input
          type="tel"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder="Phone number"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-800"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-800"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-black text-white font-semibold shadow-md hover:bg-zinc-900 transition"
      >
        Signup
      </button>

      {message && (
        <p className="text-sm mt-2 text-center text-red-500">{message}</p>
      )}

      <div className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-black hover:underline hover:text-zinc-800 transition-colors"
        >
          Login
        </Link>
      </div>
    </form>
  );
}
