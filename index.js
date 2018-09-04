const Sequelize = require("sequelize");
const utils = require('./utils');

class Super extends Sequelize.Model {

    static setMicroDate (opt, key) {
        if (!opt.hooks) opt.hooks = {};
        if (!opt.hooks[key]) opt.hooks[key] = utils.hooks[key];
    }

    static init(attrs, opt) {
        let DataTypes = Sequelize.DataTypes;
        if (attrs.createdAt && attrs.createdAt.key === DataTypes.BIGINT.key) {
            this.setMicroDate(opt, 'beforeCreate');
        }
        if (attrs.updatedAt && attrs.updatedAt.key === DataTypes.BIGINT.key) {
            this.setMicroDate(opt, 'beforeUpdate');
        }
        if (attrs.deletedAt && attrs.deletedAt.key === DataTypes.BIGINT.key) {
            this.setMicroDate(opt, 'beforeDelete');
        }
        for (let key in attrs) {
            if (attrs.hasOwnProperty(key)) {
                let attr = attrs[key];
                if (attr.type.key === DataTypes.STRING.key) {
                    attr.type = DataTypes.STRING(utils.attr.getStrLen(opt.charset));
                }
                if (attr.type.key === DataTypes.ENUM.key && attr.values instanceof Object) {
                    attr.values = utils.attr.getEnumArrFromStd(attr.values);
                }
            }
        }
        return super.init(attrs, opt);
    }

    static async findByKey(key, value) {
        let where = {};
        where[key] = value;
        return await this.findOne(where);
    }

    static async updateByKey(key, field, update) {
        let where = {};
        where[key] = field;
        let data = await this.findOne({where});
        return await data.updateAttributes(update);
    }

    static async destroyById(id, cascade = false) {
        return await this.destroy({where: {id: id}, cascade: cascade});
    }
}

module.exports = Super;
