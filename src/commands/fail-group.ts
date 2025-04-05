import { ApplyOptions } from '@sapphire/decorators';
import { Command, type ApplicationCommandRegistry } from '@sapphire/framework';
import { ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'A command that will fail to register'
})
export class UserCommand extends Command {
	public override chatInputRun() {}

	public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
		const builder = new SlashCommandBuilder()
			.setName(this.name)
			.setDescription(this.description)
			.setContexts(InteractionContextType.Guild)
			.setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
			.addSubcommandGroup((builder) =>
				builder
					.setName('g')
					.setDescription('group')
					.addSubcommand((builder) => builder.setName('sub').setDescription('sub'))
			);

		registry.registerChatInputCommand(builder);
	}
}
