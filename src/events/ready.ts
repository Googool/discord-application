import { ActivityType } from 'discord.js';
import { Event } from '../interfaces';
import { ExtendedClient } from '../classes';

const event: Event = {
  name: 'ready',
  options: {
    ONCE: true,
    REST: false,
  },

  execute: (client: ExtendedClient) => {
    client.user?.setPresence({
      activities: [
        {
          name: 'a Game',
          type: ActivityType.Playing,
        },
      ],

      status: 'online',
    });

    console.log(`Logged in as ${client.user?.username} 🚀`);
  },
};

export default event;
