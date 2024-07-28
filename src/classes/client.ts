import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import { Command, Event, Button } from '../interfaces';
import { Handler } from '../classes';

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

export class ExtendedClient extends Client {
  public commands: Collection<string, Command>;
  public cooldowns: Collection<string, Collection<string, number>>;
  public events: Collection<string, Event>;
  public buttons: Collection<string, Button>;

  constructor() {
    super({
      intents: [Guilds, GuildMembers, GuildMessages],
      partials: [User, Message, GuildMember, ThreadMember],
    });

    this.commands = new Collection();
    this.cooldowns = new Collection();
    this.events = new Collection();
    this.buttons = new Collection();
  }

  public async start(): Promise<void> {
    const handler = new Handler(this);

    try {
      await handler.load_events();
    } catch (err) {
      console.error(err);
    }

    try {
      await handler.load_commands();
    } catch (err) {
      console.error(err);
    }

    try {
      await handler.load_buttons();
    } catch (err) {
      console.error(err);
    }

    await this.login(process.env.DISCORD_TOKEN);
  }
}
