import { ICommand } from "wokcommands";
export default {
  category: "Testing",
  description: "Replices with pong",
  slash:true,
  callback: ({client, interaction,args}) => {
    return "pong"
  },
} as ICommand;
