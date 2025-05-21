import express from "express";
import morgan from "morgan";
import loginRoutes from "./routes/loginRoutes";

const app = express();
const PORT = process.env.PORT || 3011;

app.use(express.json());
app.use(morgan("dev"));
app.use("/api", loginRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
