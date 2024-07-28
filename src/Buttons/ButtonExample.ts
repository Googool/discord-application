import { ButtonInteraction, Client } from 'discord.js';
import { Button } from '../interfaces';

const button: Button = {
  name: 'testButton',
  execute: async (interaction: ButtonInteraction, client: Client) => {
    await interaction.reply({
      content: 'Button test',
      ephemeral: true,
    });
  },
};

export default button;
