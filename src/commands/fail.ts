import { ApplyOptions } from '@sapphire/decorators';
import { Command, type ApplicationCommandRegistry } from '@sapphire/framework';
import { ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from 'discord.js';

/**
 * If not adding subcommand(s), it will register with no errors.
 * Did vlad not diff subcommands?
 */
/* @RegisterChatInputCommand((builder, command) =>
	builder
		.setName(command.name)
		.setDescription(command.description)
		.setContexts(InteractionContextType.Guild)
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
		.addSubcommand((builder) => builder.setName('failure').setDescription('Failure'))
) */
@ApplyOptions<Command.Options>({
	description: 'This will fail to register.'
})
export class UserCommand extends Command {
	// Not gonna reply to the interaction as this will fail to register in the registry anyway.
	public override chatInputRun() {}

	public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
		const builder = new SlashCommandBuilder()
			.setName(this.name)
			.setDescription(this.description)
			.setContexts(InteractionContextType.Guild)
			.setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
			.addSubcommand((builder) => builder.setName('failure').setDescription('Failure'));

		registry.registerChatInputCommand(builder);
	}
}
