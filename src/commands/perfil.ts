import Canvas from "@napi-rs/canvas";
import { MessageAttachment } from "discord.js";
import { fetch } from "undici";
import { ICommand } from "wokcommands";
import { createUser } from "../usecases/user/createUser";
import { updateDiary } from "../usecases/user/updateDiary";

function toBuffer(ab) {
  const buf = Buffer.alloc(ab.byteLength);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
}

async function downloadImage(url) {
  const response = await fetch(url);
  const arrBuffer = await response.arrayBuffer();
  const buffer = toBuffer(arrBuffer);
  return buffer;
}

export default {
  category: "Testing",
  description: "Replices with pong",
  // slash: true,
  expectedArgs: "<Perfil>",
  minArgs: 0,
  maxArgs: 1,
  callback: async ({ client, interaction, args }) => {
    await updateDiary({userId: interaction.user.id, num1: 1, num2: 2 , num3: 4})
    
    var userid = interaction.user.id;
    var userAvatar = interaction.user.avatar;
    if (args[0]) {
      userid = args[0].replace(/[<>@!]/g, "");
      userAvatar = interaction!.guild!.members.resolve(userid)?.user.avatar!;
    }

    const canvas = Canvas.createCanvas(700, 250);
    const context = canvas.getContext("2d");

    const background = new Canvas.Image();
    background.src = await downloadImage(
      "https://cdn.discordapp.com/attachments/994424200137818182/999094380365357128/parking-garage-neon-night-liminal-dark-hd-wallpaper-preview.jpg"
    );
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.strokeStyle = "#0099ff";
    context.strokeRect(0, 0, canvas.width, canvas.height);

    context.font = "60px sans-serif";
    context.fillStyle = "#ffffff";
    if (interaction.member?.user) {
      context.fillText(
        String(interaction.guild?.members.resolve(userid)?.user.username),
        canvas.width / 2.5,
        canvas.height / 1.8
      );
    }

    context.beginPath();
    context.arc(125, 125, 100, 0, Math.PI * 2, true);
    context.lineWidth = 10;
    context.strokeStyle = "#fff";
    context.stroke();
    context.closePath();
    context.clip();

    const avatar = new Canvas.Image();
    avatar.src = await downloadImage(
      `https://cdn.discordapp.com/avatars/${userid}/${userAvatar}.png?size=1024`
    );
    context.drawImage(avatar, 25, 0, 200, canvas.height);

    const attachment = new MessageAttachment(
      canvas.toBuffer("image/png"),
      "profile-image.png"
    );
    interaction.reply({ files: [attachment] });
  },
} as ICommand;
