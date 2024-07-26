import { SlashCommandBuilder } from 'discord.js';

interface CommandOptions {
  cooldown?: number;
  permissions?: string[];
}

export interface Command {
  data: SlashCommandBuilder | any;
  options?: CommandOptions;
  execute: (...args: any[]) => any;
}
