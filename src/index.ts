import DiscordJS, { Intents } from "discord.js";
import path from "node:path";
import WOKCommands from "wokcommands";
import { config } from "./config";
import { connectMongo } from "./database/mongo";
import { updateUser } from "./usecases/user/updateUser";
async function init() {
  try {
    await connectMongo();
    console.log("Mongo makes connection!");
  } catch {
    throw new Error("failed connection for database");
  }

  const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  });

  client.on("ready", () => {
    console.log("bot is ready :)");
    new WOKCommands(client, {
      commandsDir: path.join(__dirname, "commands"),
      typeScript: true,
      testServers: ['996552236085813279']
    });
  });

  client.login(config.TOKEN);
  await updateUser({ bookName: "Prólogo", userId: 123 });
}

init();
