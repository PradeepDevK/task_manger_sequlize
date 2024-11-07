module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        }
    });

    return User;
};