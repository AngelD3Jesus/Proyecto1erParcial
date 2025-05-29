import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    const mongoUri = "mongodb://localhost:27017/user";
    try{
        await mongoose.connect(mongoUri);
        console.log("Conectado a mongo correctamente");
    } catch (error) { 
        console.log("Error al conectar a mongo", error);
    }
}
export default connectDB;

