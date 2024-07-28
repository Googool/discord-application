import { ButtonInteraction, Client } from 'discord.js';

export interface Button {
  name: string;
  execute: (interaction: ButtonInteraction, client: Client) => Promise<void>;
}
