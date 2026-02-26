"use client";

import { useState } from "react";
import { loginUser, signupUser } from "@/src/lib/api/auth.api";

import { LoginPayload, SignupPayload } from "../types/auth.types";

export function useAuth() {
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (data: LoginPayload) => {
    setLoading(true);

    try {
      const res = await loginUser(data);

      return res;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data: SignupPayload) => {
    setLoading(true);
    try {
      const res = await signupUser(data);

      return res;
    } finally {
      setLoading(false);
    }
  };

  return { login, signup, loading };
}
