import { ApplyOptions } from '@sapphire/decorators';
import { Command, type ApplicationCommandRegistry, type Awaitable } from '@sapphire/framework';
import { ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from 'discord.js';

/* @RegisterChatInputCommand((builder, command) =>
	builder
		.setName(command.name)
		.setDescription(command.description)
		.setContexts(InteractionContextType.Guild)
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
) */
@ApplyOptions<Command.Options>({
	description: 'Sends a hello message'
})
export class UserCommand extends Command {
	public override chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		return interaction.reply({ content: 'Hi.' });
	}

	public override registerApplicationCommands(registry: ApplicationCommandRegistry): Awaitable<void> {
		const builder = new SlashCommandBuilder()
			.setName(this.name)
			.setDescription(this.description)
			.setContexts(InteractionContextType.Guild)
			.setIntegrationTypes(ApplicationIntegrationType.GuildInstall);

		registry.registerChatInputCommand(builder);
	}
}
