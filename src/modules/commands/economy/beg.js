const { SlashCommandBuilder } = require("discord.js");
const UserConfig = require('../../database/models/userConfig.js');
const UserPremium = require('../../database/models/userPremium.js');

module.exports = {
    nonGlobal: false,
    data: new SlashCommandBuilder()
    .setName("beg")
    .setDescription("If you really want money, you can beg for it."),
    time: 300,
    devOwner: false,
    premium: false,
    extraFields: [],
    // image: "",
    perm: {
        bot: "",
        user: ""
    },
    type: "command",
    category: "economy",

    async run(client, interaction, time) {

        const userConfig = await UserConfig.findOne({ where: { userId: interaction.user.id } });
        const userPremium = await UserPremium.findOne({ where: { userId: interaction.user.id } });

        if (userConfig) {
            let money = client.utils.randomNumberLimit(1000, 5000);
            if (userPremium) money = client.utils.randomNumberLimit(3000, 5000);

            if (client.utils.commandPassed(50)) {
                userConfig.money += Math.round(money);
                return interaction.reply({
                    embeds: [client.embed.embedEditor(client, true, `You begged for money and got ${client.utils.parseNum(money)} ${client.staticEmo.money}.`)]
                });;
            } else {
                return interaction.reply({
                    embeds: [client.embed.embedEditor(client, false, `You begged for money but nobody wanted to give you money.`)]
                });
            }
        }
    }
}