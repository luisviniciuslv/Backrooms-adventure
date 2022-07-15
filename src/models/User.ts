import { Document, Model, model, Schema } from "mongoose";

interface Itens {
  forca?: number;
  durabilidade?: number;
}

interface IUser extends Document {
  id: number;
  itens: Itens[];
  money: number;
}

const UserSchema = new Schema<IUser>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    itens: [
      {
        forca: {
          type: Number,
        },
        durabilidade: {
          type: Number,
        },
      },
    ],

    money: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> = model("user", UserSchema);
