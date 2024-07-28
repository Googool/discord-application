import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';
import { Command } from '../interfaces';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong! 🏓'),
  options: {
    // Option for cooldown goes here when implemented.
  },

  execute: async (interaction: ChatInputCommandInteraction) => {
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId('testButton')
        .setLabel('Press me')
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({
      content: `🏓 Swinging... Or am I pinging?`,
      ephemeral: true,
      fetchReply: true,
      components: [row],
    });

    const reply = await interaction.fetchReply();
    await interaction.editReply(
      `🏓 Pong took \`${reply.createdTimestamp - interaction.createdTimestamp}\` ms`
    );
  },
};

export default command;
