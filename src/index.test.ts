import DiscordJS, { Intents } from "discord.js"; //hello
import { config } from "./config";

describe("User controller tests", () => {
  test("token is not null", () => {
    const client = new DiscordJS.Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });

    client.on("ready", () => {
      console.log("bot is ready :)");
    });

    expect(async () => {
      await client.login(config.TOKEN);
    }).not.toThrow();
  });
});
