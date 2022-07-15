import { Document, Model, model, Schema } from "mongoose";

interface Itens {
  forca?: number;
  durabilidade?: number;
}

export interface Book {
  maxPages: number;
  name: string;
  pages: number[];
}

export interface IUser extends Document {
  id: number;
  itens: Itens[];
  money: number;
  books: Book[];
}

const UserSchema = new Schema<IUser>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    books: [
      {
        pages: {
          type: [Number]
        },
        name: {
          type: String
        },
        maxPages: {
          type: Number
        }
      }
    ],
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
