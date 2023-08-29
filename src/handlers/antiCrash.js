const { inspect } = require("util");
const { stripIndents } = require("common-tags");

module.exports = async (client) => {
    client.on("error", (err) => {
        const errorMsg = stripIndents`
        Error: ${inspect(err)}
        Stack: ${err.stack}`;

        const channel = client.channels.cache.get(client.setup.antiCrash);
        if (channel) channel.send({
            embeds: [client.embed.embedEditor(client, true, `:x: **An error occurred: **\n\`\`\`xl\n${errorMsg}\n\`\`\``)]
        })
    });

    client.on("warn", (info) => {
        client.logger.warn(info);
    });

	process.on("unhandledRejection", err => {
        const errorMsg = stripIndents`
        Error: ${inspect(err)}
        Stack: ${err.stack}`;

        const channel = client.channels.cache.get(client.setup.antiCrash);
        if (channel) channel.send({
            embeds: [client.embed.embedEditor(client, true, `:x: **Unhandled rejection: **\n\`\`\`xl\n${errorMsg}\n\`\`\``)]
        })
    });

    process.on("uncaughtException", (err) => {
        const errorMsg = stripIndents`
        Error: ${inspect(err)}
        Stack: ${err.stack}`;

        const channel = client.channels.cache.get(client.setup.antiCrash);
        if (channel) channel.send({
            embeds: [client.embed.embedEditor(client, true, `:x: **Uncaught exception: **\n\`\`\`xl\n${errorMsg}\n\`\`\``)]
        })
    });
    
    process.on("SIGINT", () => {
        console.error("Received SIGINT. Shutting down gracefully...");
        // close any resources, save data, etc. before exiting
        process.exit(0);
    });

    process.on("warning", (warning) => {
        return console.error(warning.stack);
    });
};