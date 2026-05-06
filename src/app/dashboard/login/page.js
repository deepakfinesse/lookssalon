"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// Shared input class string — constant, not recreated per render
const INPUT_CLS =
  "w-full py-3 px-0 bg-transparent border-0 border-b border-[#333] " +
  "text-white text-sm outline-none transition-[border-color] duration-200 " +
  "focus:border-[#c9a84c]";

export default function DashboardLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Login failed.");
          return;
        }
        router.push("/dashboard");
        router.refresh();
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [username, password, router]
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-5 font-[Georgia,serif]">
      {/* Ambient gold glow — fixed, pointer-events-none, GPU composited */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.05) 0%, transparent 60%)," +
            "radial-gradient(ellipse at 80% 50%, rgba(201,168,76,0.03) 0%, transparent 60%)",
        }}
      />
      {/*
        NOTE: The radial-gradient above uses style={} ONLY because Tailwind v4 cannot
        express multi-stop arbitrary radial gradients inline. Everything else is pure
        Tailwind. If you add a custom bg utility in globals.css you can remove this too.
      */}

      <div className="relative w-full max-w-[420px]">
        {/* ── Branding ── */}
        <div className="text-center mb-12">
          <p className="text-[#c9a84c] text-[10px] tracking-[6px] uppercase mb-2.5">
            Since 1995
          </p>
          <h1 className="text-white text-[28px] font-light tracking-[6px] uppercase m-0">
            LOOKS SALON
          </h1>
          {/* Gold rule */}
          <div className="w-10 h-px bg-[#c9a84c] mx-auto mt-3.5" />
          <p className="text-[#555] text-[11px] tracking-[3px] uppercase mt-3.5">
            Admin Portal
          </p>
        </div>

        {/* ── Card ── */}
        <div className="bg-[#111] border border-[#222] rounded-sm p-10">
          <h2 className="text-white text-base font-light tracking-[2px] uppercase text-center mb-8">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} noValidate>
            {/* Username */}
            <div className="mb-5">
              <label
                htmlFor="login-user"
                className="block text-[#666] text-[10px] tracking-[3px] uppercase mb-2.5"
              >
                Username
              </label>
              <input
                id="login-user"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className={INPUT_CLS}
              />
            </div>

            {/* Password */}
            <div className="mb-8">
              <label
                htmlFor="login-pass"
                className="block text-[#666] text-[10px] tracking-[3px] uppercase mb-2.5"
              >
                Password
              </label>
              <input
                id="login-pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className={INPUT_CLS}
              />
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="bg-[rgba(220,53,69,0.1)] border border-[rgba(220,53,69,0.3)]
                           rounded-sm px-4 py-3 mb-5"
              >
                <p className="text-red-400 text-xs m-0">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#c9a84c] text-black border-0 rounded-sm
                         text-[11px] tracking-[3px] uppercase font-bold cursor-pointer
                         transition-opacity duration-200 will-change-[opacity]
                         hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
