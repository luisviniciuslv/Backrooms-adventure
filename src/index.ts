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
      Intents.FLAGS.GUILD_MEMBERS
    ],
  });

  client.on("ready", () => {
    if(client.application){
      client.application.commands.set([])
    }
    console.log("bot is ready :)");

    new WOKCommands(client, {
      commandsDir: path.join(__dirname, "commands"),
      featuresDir: path.join(__dirname, 'features'),
      typeScript: true,
      testServers: ["996552236085813279"],
    }).setDefaultPrefix("!")
  });

  client.login(config.TOKEN);
}

init();
