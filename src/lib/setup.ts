import '@sapphire/plugin-logger/register';

import { ApplicationCommandRegistries, RegisterBehavior } from '@sapphire/framework';
import { setup } from '@skyra/env-utilities';

setup(new URL('../../src/.env', import.meta.url));

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.VerboseOverwrite);
