import { Client, TextChannel } from 'discord.js'
import WOKCommands from 'wokcommands'
export default (client: Client, instance: WOKCommands) => {
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
}

const config = {
  displayName: "passing to level 27",
  dbName: "passin XXVII"
}
export { config }