import { Request, Response, RequestHandler } from "express";
import { generateAccessToken } from "../utils/generateToken";
import cache from "../utils/cache";
import { User } from "../models/user";
import dayjs from "dayjs";
import bcrypt from "bcrypt";



export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  if (username !== "admin" || password !== "1234") {
    res.status(401).json({ message: "Credenciales inválidas" });
    return;
  }

  const userId = "123456";
  const accessToken = generateAccessToken(userId);

  cache.set(userId, accessToken, 60 * 15);
  res.json({ accessToken });
};

export const getTimeToken = (req: Request, res: Response): void => {
  const userId = req.query.userId as string;
  if (!userId) {
    res.status(400).json({ message: "Falta userId en query" });
    return;
  }
  const ttl = cache.getTtl(userId);
  if (!ttl) {
    res.status(404).json({ message: "Token no encontrado" });
    return;
  }
  const now = Date.now();
  const TimeToLife = Math.floor((ttl - now) / 1000);
  const expTime = dayjs(ttl).format('HH:mm:ss');
  res.json({
    TimeToLife,
    expTime
  });
};

export const updateToken = (req: Request, res: Response): void => {
  const { userId } = req.params;
  const ttl = cache.getTtl(userId); // Buscar el tiempo de vida del token
  if (!ttl) {
    res.status(404).json
    ({ message: "Token no encontrado" });
    return;
  }
  const newTimeTtl: number = 60 * 15; // 15 minutos
  cache.ttl(userId, newTimeTtl); // Actualizar el tiempo de vida del token
  res.json({message: "Tiempo de vida del token actualizado"});
}

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const userList = await User.find();
    const userByName = await User.find({ name: "Michel" });
    console.log("Usuarios llamados Michel:", userByName); // Esto aparecerá en la terminal
    res.json({ userList, userByName });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

export const saveUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role, phone } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      createDate: Date.now(),
      deleteDate: null,
      status: true,
    });

    const user = await newUser.save();
    res.status(201).json({ message: "Usuario creado exitosamente", user });
  } catch (error) {
    console.error("Error en saveUser", error);
    res.status(500).json({ message: "Error al crear usuario", error });
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, password, role, phone } = req.body;

    const updateFields: any = {};
    if (name) updateFields.name = name;
    if (role) updateFields.role = role;
    if (phone) updateFields.phone = phone;

    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    if (!updatedUser) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.json({ message: "Usuario actualizado con éxito", updatedUser });
  } catch (error) {
    console.error("Error en updateUser:", error);
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};
