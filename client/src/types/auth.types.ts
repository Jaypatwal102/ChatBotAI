export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthSuccessResponse {
  message: string;
  data: {
    token: string;
  };
}

export interface AuthErrorResponse {
  message: string;
}
