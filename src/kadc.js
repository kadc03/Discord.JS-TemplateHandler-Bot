console.clear();

const { ShardingManager } = require("discord.js");
const chalk = require("chalk");

const config = require("../core/manager/config.js");

const manager = new ShardingManager("./src/bot.js", {
    token: config.token,
    totalShards: config.total,
    mode: "process",
    shardArgs: ['--ansi', '--color'], 
});

if (manager.totalShards > 1) {
    manager.spawn(manager.totalShards, 5000);
} else {
    manager.spawn();
}

manager.on("shardCreate", async (shard) => {
    console.log(chalk.magenta(`[SHARD]:`), chalk.green(`Launched shard ${shard.id + 1}`))
});