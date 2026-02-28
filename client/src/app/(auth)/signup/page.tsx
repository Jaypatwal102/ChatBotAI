"use client";

import { SignupForm } from "@/components/signup-form";
import { useAuth } from "@/src/hooks/authHooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Signup() {
  const { signup, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signup({ name, email, password });
      await new Promise((resolve) => requestAnimationFrame(resolve));
      router.replace("/dashboard/newchats");
    } catch (err: string | any) {
      setError(
        err.message ||
          "Signup failed. Please check your details and try again.",
      );
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignupForm
        className="max-w-md w-full p-6 bg-white rounded shadow"
        error={error}
        name={name}
        email={email}
        password={password}
        setError={setError}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
