import { Router, RequestHandler } from "express";
import { login, getTimeToken, updateToken, getAllUsers, saveUser, updateUser } from "../controller/auth.controller";


const router = Router();

router.post("/login", login);
router.get("/getTimeToken", getTimeToken);
router.patch("/updateToken/:userId", updateToken);
router.get("/getAllUsers", getAllUsers);
router.post("/saveUser", saveUser);
router.patch("/updateUser/:userId", updateUser);

export default router;
