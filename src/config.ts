import dotenv from "dotenv";
dotenv.config();

export const config = {
  TOKEN: process.env.TOKEN || undefined,
  MONGO_URI: process.env.MONGO_URI || "undefined",
};
