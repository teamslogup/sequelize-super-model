const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

class Users extends require('./index') {
    static init(sequelize) {
        return super.init({
                email: {
                    'type': DataTypes.STRING,
                    'allowNull': true,
                    'unique': true
                },
                secret: {
                    'type': DataTypes.STRING,
                    'allowNull': true
                }
            }, {
                sequelize
            }
        );
    }
}

module.exports = Users;
