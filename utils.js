const micro = require('microtime-nodejs');

module.exports = {
    attr: {
        getStrLen: (charset) => {
            if (!charset) charset = 'utf8mb4';
            return (charset === 'utf8mb4') ? 191 : 255;
        },
        getEnumArrFromStd: (enumObj) => {
            let arr = [];
            for (let key in enumObj) {
                if (enumObj.hasOwnProperty(key)) {
                    arr.push(enumObj[key]);
                }
            }
            return arr;
        }
    },
    hooks: {
        beforeCreate: (instance) => {
            instance.set("createdAt", micro.now());
            instance.set("updatedAt", micro.now());
        },
        individualHooks: (options) => {
            options.individualHooks = true;
        },
        beforeUpdate: (instance) => {
            instance.set("updatedAt", micro.now());
        },
        beforeDelete: (instance) => {
            instance.set("deletedAt", micro.now());
        }
    }
};
