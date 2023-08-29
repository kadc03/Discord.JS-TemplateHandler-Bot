const { DataTypes } = require('sequelize');
const sequelize = require('../../../../core/lib/sequelize.js');

const UserPremium = sequelize.define('userPremium', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timeBuy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timeExpired: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'user_premium'
});

module.exports = UserPremium;
