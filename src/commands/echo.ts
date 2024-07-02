import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../interfaces';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Echo')
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('The message which you wanted to echo.')
        .setRequired(true)
    ),
  options: {
    // Option for cooldown goes here when implemented.
  },

  execute: async (interaction: ChatInputCommandInteraction) => {
    const message = interaction.options.getString('message');
    await interaction.reply({
      content: `You said: ${message}`,
      ephemeral: true,
    });
  },
};

export default command;
