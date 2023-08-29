const { Sequelize } = require("sequelize");
const db = require("../manager/database.js");

const sequelize = new Sequelize(db.mysql.database, db.mysql.user, db.mysql.pass, {
    host: db.mysql.host,
    port: db.mysql.port,
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    logging: false
});

module.exports = sequelize;