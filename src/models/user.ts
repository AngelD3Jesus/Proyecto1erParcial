import { Document, model, Schema, Types } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    _id: Types.ObjectId;
    phone: string;
    createDate: Date;
    deleteDate: Date;
    status: boolean;
}

const UserSchema = new Schema <IUser>({
    name: { 
        type: String,
        required: true,     
    },
    email: {
        type: String,
        required: true,  
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    deleteDate: {
        type: Date,
    },
    status: {
        type: Boolean,
    },
});

export const User = model<IUser>("User", UserSchema, "users");
