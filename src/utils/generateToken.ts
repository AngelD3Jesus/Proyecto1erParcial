import jwt from "jsonwebtoken";

const ACCESS_SECRET = "12345678";

export const generateAccessToken = (userId: string): string => {
    return jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: "15m" });
};
