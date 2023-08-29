const fs = require("fs");
const util = require("util");
const readdir = util.promisify(fs.readdir);

module.exports = async (client) => {
    try {
        const eventDir = await readdir(`${process.cwd()}/src/modules/events/`);
        let eventCount = 0;

        for (const dir of eventDir) {
            const eventFile = fs.readdirSync(`${process.cwd()}/src/modules/events/${dir}/`).filter(file => file.endsWith(".js"));
            
            for (const file of eventFile) {
                const event = require(`${process.cwd()}/src/modules/events/${dir}/${file}`);
                if (!event.name) {
                    return console.log( client.chalk.magenta(`[HANDLER]:`), client.chalk.green(`An unexpected error occurred with ${file}.`) );
                }
          
                eventCount++;

                if (event.once) {
                    client.once(event.name, (...args) => event.run(client, ...args));
                } else {
                    client.on(event.name, (...args) => event.run(client, ...args));
                }
            }
        }

        console.log( client.chalk.magenta(`[HANDLER]:`), client.chalk.green(`Loaded total event: ${eventCount}`) );
    } catch (err) {
        console.error(err);
    }
};