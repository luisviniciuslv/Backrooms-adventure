import DiscordJS, { Intents } from "discord.js";
import { config } from "./config";

describe("User controller tests", () => {
  test("token is not null", () => {
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

    expect(async () => {
      await client.login(config.TOKEN);
    }).not.toThrow();
  });
});
