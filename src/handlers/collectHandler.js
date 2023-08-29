const { Collection } = require("discord.js");
const wait = require("util").promisify(setTimeout);
const chalk = require("chalk");

module.exports = async (client) => {
    // --------------- Configuration --------------- //
    client.config = require("../../core/manager/config.js");
    client.setup = require("../../core/manager/setup.js");
    client.mysql = require("../../core/manager/database.js");
    client.embed = require("../../core/manager/embed.js");

    // --------------- Asset --------------- //
    client.staticEmo = require("../../core/asset/staticEmoji.js");

    // --------------- Lib --------------- //
    client.chalk = chalk;
    client.canvas = require("../../core/lib/canvas.js");
    client.sequelize = require("../../core/lib/sequelize.js");
    client.utils = require("../../core/lib/utils.js");
    client.functions = require("../../core/lib/functions.js");
    client.wh = require("../../core/lib/webhooks.js");

    // --------------- Collection --------------- //
    client.mt = new Collection();
    client.sls = new Collection();
    client.cd = new Collection();

    // --------------- Other --------------- //
    client.wait = wait;
    client.delay = ms => new Promise(res => setTimeout(res, ms));
    client.setMaxListeners(15);
};