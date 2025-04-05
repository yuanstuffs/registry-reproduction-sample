import '#lib/setup';

import { LogLevel, SapphireClient } from '@sapphire/framework';

const client = new SapphireClient({
	intents: [],
	logger: {
		depth: 5,
		level: LogLevel.Debug
	}
});

await client.login();
