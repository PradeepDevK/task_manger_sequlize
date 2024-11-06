const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

Task.associate = (models) => {
    Task.belongsTo(models.User, { foreignKey: 'userId' });
};

module.exports = Task;