// src/events/interactionCreate.ts

import { CommandInteraction, Collection } from 'discord.js';
import { Event } from '../interfaces/event';
import { ExtendedClient } from '../classes';

const event: Event = {
  name: 'interactionCreate',
  execute: async (interaction: CommandInteraction, client: ExtendedClient) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    const { cooldowns } = client;
    let timestamps = cooldowns.get(command.data.name);

    if (!timestamps) {
      timestamps = new Collection();
      cooldowns.set(command.data.name, timestamps);
    }

    const now = Date.now();
    const cooldownAmount = (command.options?.cooldown || 3) * 1000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime =
        timestamps.get(interaction.user.id)! + cooldownAmount;

      if (now < expirationTime) {
        const cooldownEnd = `<t:${Math.floor(expirationTime / 1000)}:R>`;
        return interaction.reply({
          content: `You can use the \`${command.data.name}\` command again ${cooldownEnd}.`,
          ephemeral: true,
        });
      }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  },
};

export default event;
