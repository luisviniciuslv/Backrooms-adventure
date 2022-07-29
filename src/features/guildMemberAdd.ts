import { Client, TextChannel } from 'discord.js'
import WOKCommands from 'wokcommands'
export default (client: Client, instance: WOKCommands) => {
  client.on("guildMemberAdd", (member) => {
    member.roles.set(["997669428676268133"]);
  });
}

const config = {
  displayName: "add role in new members",
  dbName: "role new member"
}
export { config }