const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    nonGlobal: false,
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Response to ping."),
    time: 10,
    devOwner: false,
    premium: false,
    extraFields: [],
    // image: "",
    perm: {
        bot: "",
        user: ""
    },
    type: "command",
    category: "misc",

    async run(client, interaction, time) {

        let wsPing;
        const upTime = client.utils.msToTime(client.uptime);

        if (client.uptime <= 60 * 1000) {
            wsPing = `Loading...`;
        } else {
            wsPing = interaction.client.ws.ping;
        }

        return interaction.reply({
            embeds: [
                client.embed.embedEditor(client, true, false)
                .addFields({
                    name: `Bot latency:`,
                    value: `${wsPing}ms`,
                    inline: true
                }, {
                    name: `Bot uptime:`,
                    value: `${upTime}`,
                    inline: false
                })
            ],
            ephemeral : false
        });
    }
}