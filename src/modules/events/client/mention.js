const { Events } = require("discord.js");

module.exports = {
    name: Events.MessageCreate,
    async run(client, message) {
        try {
            if (!message.guild || message.author.bot) return;

            if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return;

            if (message.content.match(new RegExp(`^<@!?${client.config.id}>( |)$`))) {
                    return await message.channel.send({
                        embeds: [client.embed.embedEditor(client, true, `:flag_vn: Xin chào tôi là <@${client.config.id}>!\n\nĐây là thông báo khi bạn đề cập đến tôi. Nếu bạn muốn xem menu hãy dùng [ <@${client.config.id}> help ] !\n\nCảm ơn bạn đã đọc. Chúc bạn một ngày tốt lành!`)]
                    })
            }
        } catch (e) {
            console.error(e);
        }
    }
}