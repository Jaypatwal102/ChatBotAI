import { apiClient } from "./client";
import {
  LoginPayload,
  SignupPayload,
  AuthSuccessResponse,
  AuthErrorResponse,
} from "@/src/types/auth.types";

export function loginUser(data: LoginPayload) {
  return apiClient<AuthSuccessResponse>("/api/auth/login", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
  });
}

export function signupUser(data: SignupPayload) {
  return apiClient<AuthSuccessResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
