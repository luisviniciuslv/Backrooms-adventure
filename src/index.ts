import DiscordJS, { Intents } from "discord.js";
import path from "node:path";
import WOKCommands from "wokcommands";
import { config } from "./config";
import { connectMongo } from "./database/mongo";
async function init() {
  try {
    await connectMongo();
    console.log("Mongo makes connection!");
  } catch {
    throw new Error("failed connection for database");
  }
  const client = new DiscordJS.Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_INTEGRATIONS,
      Intents.FLAGS.GUILD_MEMBERS,
    ],
  });
  client.on("ready", () => {
    // if(client.application){
    //   client.application.commands.set([])
    // }
    console.log("bot is ready :)");
    new WOKCommands(client, {
      commandsDir: path.join(__dirname, "commands"),
      typeScript: true,
      testServers: ["996552236085813279"],
    });
  });

  client.on("messageCreate", async (message) => {
    if (message.content.toLowerCase() === "piso") {
      message.delete();
      if (message.member?.roles.cache.has("997669428676268133")) {
        message.member?.roles.set(["998244480601825331"]).catch(console.error);
        message.channel.send(
          `${message.author} Caiu em uma backroom aleatória`
        );
      }
    }
  });

  client.on("guildMemberAdd", (member) => {
    member.roles.set(["997669428676268133"]);
  });
  client.login(config.TOKEN);
}

init();
