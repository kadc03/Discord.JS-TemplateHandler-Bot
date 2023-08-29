console.clear();

const {
    REST,
    Routes
} = require('discord.js');
const chalk = require('chalk');
const {
    id,
    token
} = require('../core/manager/config.js');
const {
    guildIds
} = require('../core/manager/setup.js');
const fs = require("fs");
const util = require("util");
const readdir = util.promisify(fs.readdir);

const commands = [];

const commandDirs = fs.readdirSync(`${process.cwd()}/src/modules/commands`);
for (const dir of commandDirs) {
    const commandFiles = fs.readdirSync(`${process.cwd()}/src/modules/commands/${dir}/`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`${process.cwd()}/src/modules/commands/${dir}/${file}`);
        if (command.nonGlobal) continue;
        commands.push(command.data.toJSON());
    }
}

// guild chỉ định
const guildCommands = [];

for (const dir of commandDirs) {
    const commandFiles = fs.readdirSync(`${process.cwd()}/src/modules/commands/${dir}/`).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const command = require(`${process.cwd()}/src/modules/commands/${dir}/${file}`);
        if (!command.nonGlobal) continue;
        guildCommands.push(command.data.toJSON());
    }
}

const rest = new REST({
    version: '10'
}).setToken(token);

// global
(async () => {
    try {
        console.log(chalk.magenta(`[DEPLOY]:`), chalk.green(`Started refreshing ${commands.length} application (/) commands.`));

        const data = await rest.put(Routes.applicationCommands(id), {
            body: commands
        });

        console.log(chalk.magenta(`[DEPLOY]:`), chalk.green(`Successfully reloaded ${data.length} application (/) commands.`));

        if (!fs.existsSync(`${process.cwd()}/src/modules/data_commands`)) {
            fs.mkdirSync(`${process.cwd()}/src/modules/data_commands`);
        }
        fs.writeFileSync(`${process.cwd()}/src/modules/data_commands/data.json`, JSON.stringify(data));
        console.log(chalk.magenta(`[DEPLOY]:`), chalk.green(`Saved command data to ./src/modules/data_commands/data.json`));
    } catch (error) {
        console.error(error);
    }
})();

// guild
(async () => {
    try {
        console.log(chalk.magenta(`[DEPLOY]:`), chalk.green(`Started refreshing ${guildCommands.length} guild (/) commands.`));

        const data = await rest.put(Routes.applicationGuildCommands(id, "934351520852484177"), {
            body: guildCommands,
        });

        console.log(chalk.magenta(`[DEPLOY]:`), chalk.green(`Successfully reloaded ${data.length} guild (/) commands.`));
    } catch (error) {
        console.error(error);
    }
})();