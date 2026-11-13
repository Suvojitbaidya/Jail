import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

export function verifyJwtToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!); // Make sure secret is set
}