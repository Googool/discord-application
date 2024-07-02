import { SlashCommandBuilder } from 'discord.js';

interface CommandOptions {
  cooldown?: number;
  description?: string;
}

export interface Command {
  data: SlashCommandBuilder | any;
  options?: CommandOptions;
  execute: (...args: any[]) => any;
}
