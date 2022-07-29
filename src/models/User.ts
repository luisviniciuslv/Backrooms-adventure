import { Document, Model, model, Schema } from "mongoose";

export interface IUser extends Document {
  id: string;
  stamina: number;
  diary: number[];
  backrooms: number[]
}

const UserSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
  backrooms:{
    type: [],
    required: true
  },
    stamina: {
      type: Number,
      required: true,
    },
    diary: [],
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> = model("user", UserSchema);
