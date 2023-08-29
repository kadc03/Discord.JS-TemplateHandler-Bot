const { ButtonComponent, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require("discord.js")
const moment = require('moment');

module.exports.checkId = async function (client, id) {
    try {
        await client.users.fetch(id);
        return "user";
    } catch {}

    try {
        await client.guilds.fetch(id);
        return "guild";
    } catch {}

    return null;
}