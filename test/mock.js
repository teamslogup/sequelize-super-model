const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
const micro = require('microtime-nodejs');

class Mocks extends require('../index') {
    static init(sequelize) {
        return super.init({
                name: {
                    'type': DataTypes.STRING,
                    'allowNull': false
                },
                secret: {
                    'type': DataTypes.STRING,
                    'allowNull': false
                },
                createdAt: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    defaultValue: micro.now()
                },
                updatedAt: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    defaultValue: micro.now()
                }
            }, {
                createdAt: false,
                updatedAt: false,
                force: true,
                sequelize
            }
        );
    }
}

module.exports = Mocks;
