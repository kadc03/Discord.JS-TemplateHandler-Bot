const { Events, PermissionsBitField, Collection } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async run(client, interaction) {
        if (!interaction.guild || interaction.user.bot) return;

        if (interaction.channel.partial) await interaction.channel.fetch();
        await interaction.guild.members.fetch({ force: true })

        if (interaction.isCommand()) {
            const command = client.sls.get(interaction.commandName);

            if (!command) return interaction.reply({
                embeds : [client.embed.embedEditor(client, false, `An error occurred while running this command!\nPlease report bugs at this [guild](${client.setup.support})!`)],
                ephemeral : true
            }) && client.sls.delete(interaction.commandName);

            // --------------------- For owner bot -------------------- //
            if (command.devOwner && interaction.user.id !== client.setup.developerIds) {
                return interaction.reply({
                    embeds : [client.embed.embedEditor(client, false, `This command can only be used by the bot developer!`)],
                    ephemeral : true
                })
            }

            // --------------------- For permissions -------------------- //
            if (command.perm.bot) {
                if (!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve([`SendMessages`, `ViewChannel`, `AttachFiles`, `Speak`, `Connect`]))) {
                    return interaction.reply({
                        embeds: [client.embed.embedEditor(client, false, `It seems like I am missing the following permissions: \`SendMessages, ViewChannel, AttachFiles, Connect, Speak\``)],
                        ephemeral : true
                    })
                }

                if (!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.data.permission.bot || []))) {
                    return interaction.reply({
                        embeds: [client.embed.embedEditor(client, false, `It seems like I am missing the following permissions: \`${command.data.permission.bot || []}\``)],
                        ephemeral : true
                    })
                    .catch((e) => {
                        console.log(e)
                    });;
                }
            }

            if (command.perm.user) {
                if (!interaction.memberPermissions.has(PermissionsBitField.resolve(command.data.permission.user || []))) {
                    return interaction.reply({
                        embeds: [client.embed.embedEditor(client, false, `It seems like you are missing the following permissions: \`${command.data.permission.user || []}\``)],
                        ephemeral : true
                    })
                    .catch((e) => {
                        client.logger.error(e)
                    });;
                }
            }
            
            // --------------------- For cooldown -------------------- //
            let timeCDs = command.time;
            if (userPremium) {
                timeCDs = Math.floor(timeCDs * 0.6); // Reduce by 40%
            }
            
            if (!client.cd.has(command.data.name)) {
                client.cd.set(command.data.name, new Collection());
            }

            let time = client.cd.get(command.data.name);

            if (timeCDs && interaction.user.id !== client.setup.developerIds) {
                if (time.has(interaction.user.id)) {
                    const expTime = time.get(interaction.user.id) + (timeCDs * 1000)
                    if (Date.now() < expTime) {
                        var timeLeft = (expTime - Date.now()) / 1000
                        return interaction.reply({
                            embeds: [client.embed.embedEditor(client, false, `Please wait ${client.utils.msToTime(timeLeft.toFixed(1) * 1000)} before using this command again!`)],
                            ephemeral: true
                        }).catch((err) => {
                            client.logger.error(err);
                        });
                    }
                }

                time.set(interaction.user.id, Date.now())
                setTimeout(() => {
                    time.delete(interaction.user.id)
                }, timeCDs * 1000)
            }

            // --------------------- For premium ---------------------//
            if (command.premium) {
                return interaction.reply({
                    embeds : [client.embed.embedEditor(client, false, `Unfortunately, you do not currently have access to the premium features required to use this command!`)],
                    ephemeral : true
                })
            }

            await client.functions.checkLvl(client, interaction, command.type);

            command.run(client, interaction, time);
        }
    }
}