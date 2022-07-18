import {
  MessageActionRow,
  MessageSelectMenu,
  SelectMenuInteraction,
} from "discord.js";
import { ICommand } from "wokcommands";
import { getUser } from "../usecases/user/getUser";
async function hasLeaf(userId: number, book: number, folha: String) {
  const pages = await getUser(userId, "books");
  if (pages[book].pages.includes(folha)) {
    return `Folha ${folha}`;
  } else {
    return "???";
  }
}
export default {
  category: "Inventário",
  description: "Olhar páginas do diário coletadas",
  slash: true,
  callback: async ({ member, interaction: msgInt, channel }) => {
    if(member?.roles.cache.has("997669428676268133")){
      var folha1 = '???';
    var folha2 = '???';
    var folha3 = '???';
    const folhas = await getUser(Number(msgInt.user.id), "books")
    if(folhas[0].pages.includes("1")){
      folha1 = "Folha 1"
    }
    if(folhas[0].pages.includes("2")){
      folha2 = "Folha 2"
    }
    if(folhas[0].pages.includes("3")){
      folha3 = "Folha 3"
    }

    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("Backroom 0")
        .setPlaceholder("Diário")
        .addOptions([
          {
            label: folha1,
            description: "enviar ao chat",
            value: "Folha 1",
          },
          {
            label: folha2,
            description: "enviar ao chat",
            value: "Folha 2",
          },
          {
            label: folha3,
            description: "enviar ao chat",
            value: "Folha 3",
          },
        ])
    );
    await msgInt.reply({
      content: "Diário",
      components: [row],
    });

    const collector = channel.createMessageComponentCollector({
      max: 14,
      time: 1000 * 15,
    });
    collector.on("collect", async (i: SelectMenuInteraction) => {
      const value = i.values[0];

      if (i.user.id === msgInt.user.id) {
        if (value === "Folha 1") {
          const book = await getUser(Number(msgInt.user.id), "books");
          if (book[0].pages.includes("1")) {
            i.reply({
              content: `${value} enviado ao chat do ${msgInt.user}\nCaso não receba a mensagem, entre em contato com um adm`,
              components: [],
            });
            const channel = msgInt.channel;
            msgInt.user
              .send(
                "https://cdn.discordapp.com/attachments/996464678647640264/998054307817590905/folha_1.png"
              )
              .catch(console.error);
          } else {
            i.reply({
              content: "Você não tem esse item",
            });
          }
        }

        if (value === "Folha 2") {
          const book = await getUser(Number(msgInt.user.id), "books");
          if (book[0].pages.includes("2")) {
            i.reply({
              content: `${value} enviado ao chat do ${msgInt.user}\nCaso não receba a mensagem, entre em contato com um adm`,
              components: [],
            });
            msgInt.user.send("folha 2").catch(console.error);
            // enviar ao chat
          } else {
            i.reply({
              content: "Você não tem esse item",
            });
          }
        }

        if (value === "Folha 3") {
          const book = await getUser(Number(msgInt.user.id), "books");
          if (book[0].pages.includes("3")) {
            i.reply({
              content: `${value} enviado ao chat do ${msgInt.user}\nCaso não receba a mensagem, entre em contato com um adm`,
              components: [],
            });
            msgInt.user.send("folha 3").catch(console.error);
            // enviar ao chat
          } else {
            i.reply({
              content: "Você não tem esse item",
            });
          }
        }
      } else {
        return;
      }
    });
    }
    else{
      return "você não tem permissão para usar esse comando"
    }
  },
} as ICommand;
