import jwt from "jsonwebtoken";

const secret_key = process.env.JWT_SECRET as string;

if (!secret_key) {
  throw new Error("JWT key is not set!");
}
export const signToken = (payload: { userId: string; userName: string }) => {
  return jwt.sign(payload, secret_key, { expiresIn: "7d" });
};
export const verifyToken = (token: string) => {
  return jwt.verify(token, secret_key) as { userId: string };
};
