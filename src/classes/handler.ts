import { ExtendedClient } from '../classes';
import { Command, Event, Button } from '../interfaces';
import path from 'path';
import fs from 'fs';

export class Handler {
  client: ExtendedClient;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  public async load_events(): Promise<void> {
    const eventDir = this.load_files(`${process.cwd()}/dist/events`);
    for (const file of eventDir) {
      if (file.endsWith('.ts') || file.endsWith('.js')) {
        const eventPath = path.resolve(file);
        this.clear_cache(eventPath);
        const event: Event = (await import(eventPath)).default;
        const execute = (...args: any[]) => event.execute(...args, this.client);
        if (event.options?.ONCE) {
          this.client.once(event.name, execute);
        } else {
          this.client.on(event.name, execute);
        }

        this.client.events.set(event.name, event);
      }
    }
  }

  public async load_commands(): Promise<void> {
    let commandArray: any[] = [];
    const commandDir = this.load_files(`${process.cwd()}/dist/commands`);
    for (const file of commandDir) {
      if (file.endsWith('.ts') || file.endsWith('.js')) {
        const commandPath = path.resolve(file);
        this.clear_cache(commandPath);
        const command: Command = (await import(commandPath)).default;
        commandArray.push(command.data.toJSON());
        this.client.commands.set(command.data.name, command);
      }
    }

    this.client.on('ready', async () => {
      this.client.application?.commands.set(commandArray);
    });
  }

  public async load_buttons(): Promise<void> {
    const buttonDir = this.load_files(`${process.cwd()}/dist/buttons`);
    for (const file of buttonDir) {
      if (file.endsWith('.ts') || file.endsWith('.js')) {
        const buttonPath = path.resolve(file);
        this.clear_cache(buttonPath);
        const button: Button = (await import(buttonPath)).default;
        this.client.buttons.set(button.name, button);
      }
    }
  }

  private load_files(dirName: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dirName);
    list.forEach((file) => {
      file = path.resolve(dirName, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        results = results.concat(this.load_files(file));
      } else {
        results.push(file);
      }
    });

    return results;
  }

  private clear_cache(modulePath: string): void {
    const resolvedPath = require.resolve(modulePath);
    if (require.cache[resolvedPath]) {
      delete require.cache[resolvedPath];
    }
  }
}
