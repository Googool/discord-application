import { ButtonInteraction, Events } from 'discord.js';
import { Event } from '../interfaces';
import { ExtendedClient } from '../classes';

const event: Event = {
  name: Events.InteractionCreate,
  options: {
    ONCE: false,
  },

  execute: async (interaction: ButtonInteraction, client: ExtendedClient) => {
    if (!interaction.isButton()) return;

    const button = client.buttons.get(interaction.customId);

    if (!button) return;

    try {
      await button.execute(interaction, client);
    } catch (error) {
      console.error(`Error executing button: ${error}`);
      await interaction.reply({
        content: 'Ocurrió un error. Pronto estará solucionado.',
        ephemeral: true,
      });
    }
  },
};

export default event;
