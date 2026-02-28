"use client";

import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/src/hooks/authHooks";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({ email, password });
      console.log("Login successful");
      router.replace("/dashboard/newchats");
    } catch (err: string | any) {
      console.log("Login failed", err);
      setError(
        err.message ||
          "Login failed. Please check your credentials and try again.",
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoginForm
        className="max-w-md w-full p-6 bg-white rounded shadow"
        error={error}
        email={email}
        password={password}
        setError={setError}
        setEmail={setEmail}
        setPassword={setPassword}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
