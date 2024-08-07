import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../interfaces';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong! 🏓'),
  options: {
    // Option for cooldown goes here when implemented.
  },

  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply({
      content: `🏓 Swinging... Or am I pinging?`,
      ephemeral: true,
      fetchReply: true,
    });

    const reply = await interaction.fetchReply();
    await interaction.editReply(
      `🏓 Pong took \`${reply.createdTimestamp - interaction.createdTimestamp}\` ms`
    );
  },
};

export default command;
