import { Request, Response } from "express";
import NodeCache from "node-cache";


export const login = (req:Request, res:Response) => {
    const { username, password } = req.body;
    if (username !== "admin" || password !== "1234") {
        return res.status(401)
        .json({ message: "Credenciales incorrectas" });
    }
    const userId = "123456";
    const accessToken = generateAccessToken(userId);

    const cache = new NodeCache();
    cache.set(userId, accessToken, 60*15);
    res.json({accessToken});
}