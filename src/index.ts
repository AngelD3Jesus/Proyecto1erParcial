import  Express  from "express";
import  morgan  from "morgan";

const app = Express();
const PORT = process.env.PORT || 3000;

app.use(Express.json());
app.use(morgan("dev"));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
