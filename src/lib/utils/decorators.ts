import { createClassDecorator, createProxy } from '@sapphire/decorators';
import type { ApplicationCommandRegistry, Command as FCommand } from '@sapphire/framework';
import type { Ctor } from '@sapphire/utilities';
import { SlashCommandBuilder, type SlashCommandOptionsOnlyBuilder, type SlashCommandSubcommandsOnlyBuilder } from 'discord.js';

export function RegisterChatInputCommand<Command extends FCommand = FCommand>(
	optionsFn: (
		builder: SlashCommandBuilder,
		command: ThisType<Command> & Command
	) => SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | SlashCommandOptionsOnlyBuilder
): ClassDecorator {
	return createClassDecorator((target: Ctor<ConstructorParameters<typeof FCommand>, Command>) =>
		createProxy(target, {
			construct(target, argArray) {
				const command: Command = Reflect.construct(target, argArray);

				const originalRegister = command.registerApplicationCommands?.bind(command);
				command.registerApplicationCommands = function registerApplicationCommands(registry: ApplicationCommandRegistry) {
					// registry.registerChatInputCommand((builder) => optionsFn(builder, command));
					const builder = optionsFn(new SlashCommandBuilder(), command);
					registry.registerChatInputCommand(builder);

					if (originalRegister) return originalRegister.call(this, registry);
				};

				return command;
			}
		})
	);
}
