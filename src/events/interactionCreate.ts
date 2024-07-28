import { Collection, CommandInteraction } from 'discord.js';
import { Event } from '../interfaces';
import { ExtendedClient } from '../classes';

const event: Event = {
  name: 'interactionCreate',
  options: {
    ONCE: false,
    REST: false,
  },

  execute: async (interaction: CommandInteraction, client: ExtendedClient) => {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      const { cooldowns } = client;
      const cooldownAmount = (command.options?.cooldown || 0) * 1000;
      const now = Date.now();

      if (!cooldowns.has(command.data.name)) {
        cooldowns.set(command.data.name, new Collection());
      }

      const timestamps = cooldowns.get(command.data.name);

      if (!timestamps) return;

      const expirationTime = timestamps.get(interaction.user.id)
        ? timestamps.get(interaction.user.id)! + cooldownAmount
        : now;

      if (timestamps.has(interaction.user.id)) {
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return interaction.reply({
            content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the command.`,
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
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }
  },
};

export default event;
