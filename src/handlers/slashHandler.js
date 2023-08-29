const fs = require("fs");
const util = require("util");
const readdir = util.promisify(fs.readdir);

module.exports = async (client) => {
    try {
        const slashDir = await readdir(`${process.cwd()}/src/modules/commands/`);
        let slashCount = 0;

        for (const dir of slashDir) {
            const slashFile = fs.readdirSync(`${process.cwd()}/src/modules/commands/${dir}/`).filter(file => file.endsWith(".js"));
            
            for (const file of slashFile) {
                const cmd = require(`${process.cwd()}/src/modules/commands/${dir}/${file}`);
                if (!cmd.data.name) {
                    return console.log( client.chalk.magenta(`[HANDLER]:`), client.chalk.green(`An unexpected error occurred with ${file}.`) );
                };

                slashCount++;
                client.sls.set(cmd.data.name, cmd);

            }
        }

        console.log( client.chalk.magenta(`[HANDLER]:`), client.chalk.green(`Loaded total command: ${slashCount}`) );
    } catch (err) {
        console.log(err);
    }
}