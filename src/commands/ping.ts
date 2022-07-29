import { ICommand } from "wokcommands";
export default {
  category: "Testing",
  description: "Replices with pong",
  // slash:true,
  callback: ({client, interaction}) => {
    return "pong"
  },
} as ICommand;
