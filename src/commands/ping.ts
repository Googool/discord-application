import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../interfaces/command';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  options: {
    cooldown: 10,
  },

  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply({
      content: `🏓 Swinging... Or am I pinging?`,
      ephemeral: true,
      fetchReply: true,
    });

    const reply = await interaction.fetchReply();
    await interaction.editReply(
      `🏓 Pong took \`${reply.createdTimestamp - interaction.createdTimestamp}\`ms`
    );
  },
};

export default command;
