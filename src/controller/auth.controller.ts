import { Request, Response } from "express";
import NodeCache from "node-cache";
import { generateAccessToken } from "../utils/generateToken";

export const login = (req: Request, res: Response): void => {
    const { username, password } = req.body;

    console.log("Recibido:", { username, password }); 

    if (username !== "admin" || password !== "1234") {
        res.status(401).json({ message: "Credenciales incorrectas" });
        return;
    }

    const userId = "123456";
    const accessToken = generateAccessToken(userId);

    const cache = new NodeCache();
    cache.set(userId, accessToken, 60 * 15);

    res.json({ accessToken });
};
