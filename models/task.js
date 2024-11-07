module.exports = (sequelize, DataTypes) => {
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

    return Task;
};