const { ActivityType, Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    async run(client) {
        try {
            console.log( client.chalk.magenta(`[EVENT]:`), client.chalk.green(`Dọn dẹp thời gian hồi collection.`) );
            console.log( client.chalk.magenta(`[EVENT]:`), client.chalk.yellow(`${client.user.username} đã hoạt động!`) );

            client.sequelize.authenticate()
            .then(async () => {
                
                require('../../database/syncModels');

                console.log( client.chalk.magenta(`[EVENT]:`), client.chalk.green(`Kết nối cơ sở dữ liệu đã được thiết lập thành công.`) );
            })
            .catch(err => {
                console.log( client.chalk.magenta(`[EVENT]:`), client.chalk.green(`Không thể kết nối với cơ sở dữ liệu: ${err}`) );
            });

            client.user.setActivity({
                name: `prefix : @${client.config.name}`,
                type: ActivityType.Playing
            });
        } catch (e) {
            console.error(e)
        }
    }
}