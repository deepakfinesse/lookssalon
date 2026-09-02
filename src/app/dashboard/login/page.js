"use client";

import { useState, useCallback } from "react";
import { signIn }                from "next-auth/react";
import { useRouter }             from "next/navigation";
import Image                     from "next/image";
import Button                    from "@/components/ui/Button";

const INPUT_CLS =
  "w-full py-1 px-0 bg-transparent border-0 border-b border-white" +
  "text-white text-base tracking-wide " +
  "outline-none appearance-none transition-[border-color] duration-200 " +
  "focus:border-white placeholder-transparent";

export default function DashboardLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (!res) {
        setError("Something went wrong. Please try again.");
        return;
      }

      if (res.error) {
        setError("Invalid username or password.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [username, password, router]);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-center px-4 py-12"
      style={{ backgroundImage: "url('/img/all/book-appointement.webp')" }}
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <Image
          src="/img/logo-white.svg"
          alt="Looks Salon"
          width={180}
          height={60}
          className="mx-auto mb-6"
          priority
        />
        
        
      </div>

      {/* Login Form */}
      <div className="max-w-3xl w-full mx-auto px-4 pb-12">
        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm p-10 max-w-md mx-auto">
          <h2 className="text-white text-lg font-light tracking-[2px] uppercase font-medium text-center mb-8">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} noValidate>

            <div className="mb-5">
              <label
                htmlFor="login-user"
                className="block text-white text-sm tracking-[3px] uppercase mb-2.5"
              >Username</label>
              <input
                id="login-user"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete="username"
                className={INPUT_CLS}
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="login-pass"
                className="block text-white text-sm tracking-[3px] uppercase mb-2.5"
              >Password</label>
              <input
                id="login-pass"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className={INPUT_CLS}
              />
            </div>

            {error && (
              <div
                role="alert"
                className="bg-red-500/10 border border-red-500/30 rounded-sm px-4 py-3 mb-5"
              >
                <p className="text-red-400 text-xs m-0">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              label={loading ? "Signing in…" : "Sign In"}
              variant="dark"
              disabled={loading}
              className="w-full justify-center"
            />

          </form>
        </div>
      </div>
    </div>
  );
}
