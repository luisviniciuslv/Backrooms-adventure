import { ICommand } from "wokcommands";
import { updateUser } from "../usecases/user/updateUser";
export default {
  category: "Looting",
  description: "Sair para descobrir os arredores!",
  slash: true,
  callback: async ({member, message, interaction, args }) => {
    if(member?.roles.cache.has("997669428676268133")){
      async function pag() {
        const pag = await updateUser({
          userId: parseInt(interaction.user.id),
          bookName: "0",
        });
        return pag;
      }
      if (await pag()) {
        console.log(member?.roles)
        return `${interaction.user} achou uma página de um diário, digite /diario para ver`;
      } else {
        
        return `${interaction.user} andou, mas não encontrou nada`;
      }
    }
  },
} as ICommand;
