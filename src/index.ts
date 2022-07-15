import DiscordJS, { Intents } from "discord.js";
import {config} from "./config"
import { connectMongo } from "./database/mongo";
import {createUser} from './usecases/user/createUser'
import {getUser} from './usecases/user/getUser'

async function init(){
  try{
    await connectMongo()
    console.log("Mongo makes connection!")
  }catch{
    throw new Error("failed connection for database")
  }

  const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  });
  client.on("ready", () => {
    console.log("bot is ready :)");
  });
  
  client.on("messageCreate", (message) => {
    if (message.content === "ping") {
      message.reply({ content: "pong" });
    }
  });
  
  client.login(config.TOKEN);  
  await getUser(123, 'money')
}

init()
