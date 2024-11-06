const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    }
});

module.exports = User;