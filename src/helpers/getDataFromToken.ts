import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (token: string) => {
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
export const getUserFromRequest = (request: NextRequest) => {
  const token = request.cookies.get("token")?.value || "";
  return getDataFromToken(token);
};
