import { ExtendedClient } from '../classes';
import { Command, Event } from '../interfaces';
import path from 'path';
import fs from 'fs';

export class Handler {
  client: ExtendedClient;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  private clearCache(modulePath: string): void {
    const resolvedPath = require.resolve(modulePath);
    if (require.cache[resolvedPath]) {
      delete require.cache[resolvedPath];
    }
  }

  public async load_commands(): Promise<void> {
    const commandPath = path.join(__dirname, '..', 'commands');
    const commandFiles = fs
      .readdirSync(commandPath)
      .filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
      const filePath = path.join(commandPath, file);
      this.clearCache(filePath);
      const commandModule = await import(filePath);
      const command: Command = commandModule.default;
      if (!command.data || !command.data.name) {
        console.log(`${file} does not have valid command data.`);
        continue;
      }

      this.client.commands.set(command.data.name, command);
    }
  }

  public async load_events(): Promise<void> {
    const eventPath = path.join(__dirname, '..', 'events');
    const eventFiles = fs
      .readdirSync(eventPath)
      .filter((file) => file.endsWith('.js'));
    for (const file of eventFiles) {
      const filePath = path.join(eventPath, file);
      this.clearCache(filePath);
      const eventModule = await import(filePath);
      const event: Event = eventModule.default;
      if (!event.name) {
        console.log(`${file} does not have a name.`);
        continue;
      }

      const execute = (...args: any[]) => event.execute(...args, this.client);
      if (event.options?.ONCE) {
        this.client.once(event.name, execute);
      } else {
        this.client.on(event.name, execute);
      }
    }
  }
}
