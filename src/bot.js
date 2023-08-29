const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require("discord.js");
var cron = require("node-cron");

const client = new Client({
    disableMentions: ["everyone", "here"],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.Reaction,
        Partials.User,
        Partials.GuildMember,
        Partials.ThreadMember
    ],
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,

        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
        // GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,

        GatewayIntentBits.MessageContent,

        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,
    ]
});

module.exports = client;

["antiCrash", "collectHandler", "eventHandler", "slashHandler"].forEach((handler) => { // mentionHandler
    require(`./handlers/${handler}`)(client);
});

const UserPremium = require("./modules/database/models/userPremium.js");

cron.schedule('*/1 * * * *', async () => {
    try {
        await UserPremium.findAll()
        .then(async (getData) => {
            getData.forEach(async (data) => {
                const id = data.userId;
                const timeBuy = parseInt(data.timeBuy);
                const timeExpired = parseInt(data.timeExpired);
                const expirationTime = timeBuy + timeExpired;

                if (expirationTime <= Date.now()) {
                    const user = await client.users.fetch(id);

                    await client.wh.premium.send({
                        embeds: [
                            client.embed.embedEditor(client, false, `Your Premium subscription has expired, <@${user.id}> (**${user.username}**, \`${user.id}\`). We sincerely appreciate your experience with Premium!`)
                            .setThumbnail(user.displayAvatarURL())
                        ]
                    })

                    await data.destroy();
                }
            });
        });
    } catch (e) {
        client.logger.error(`Failed to check expired premium: ${err}`)
    }
});

client.login(client.config.token);