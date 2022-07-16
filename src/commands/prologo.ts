import { ICommand } from "wokcommands";
import { prologo } from "../lore/Prólogo";
export default {
  category: "Lore",
  description: "Prólogo da história",
  slash:true,
  callback: ({client, interaction,args}) => {
    return prologo
  },
} as ICommand;
