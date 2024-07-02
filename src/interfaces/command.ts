import { SlashCommandBuilder } from 'discord.js';

interface CommandOptions {
  // cooldown?: number;
}

export interface Command {
  data: SlashCommandBuilder | any;
  options?: CommandOptions;
  execute: (...args: any[]) => any;
}
