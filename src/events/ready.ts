import { Event } from '../interfaces/event';
import { ExtendedClient } from '../classes';

const event: Event = {
  name: 'ready',
  execute: (client: ExtendedClient) => {
    console.log(`Logged in as ${client.user?.tag}!`);
  },
};

export default event;
