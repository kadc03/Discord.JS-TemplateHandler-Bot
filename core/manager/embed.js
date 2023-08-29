const {
    ActionRowBuilder,
    AttachmentBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    StringSelectMenuBuilderBuilder,
    ComponentType
} = require("discord.js");

module.exports.embedEditor = (client, color = true, description) => {
    const editor = new EmbedBuilder()
        .setFooter({
            text: `${client.config.name} | New Version`
        })
        .setTimestamp();

    try {
        if (description == false);
        else editor.setDescription(description);
    } catch (error) {
        console.error(error)
    }

    if (color == true) editor.setColor("#9536c5");
    else if (color == false || color == none || color == undefined) editor.setColor("#fd5045");

    return editor;
}