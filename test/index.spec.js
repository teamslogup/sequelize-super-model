const should = require('should');
const SuperModel = require('../index');
const Sequelize = require('sequelize');
const Mock = require('./mock');

suite('Super model test', () => {
    suiteSetup(async () => {
        this.sequelize = new Sequelize('test', 'test', '12qw12qw', {
            host: 'localhost',
            port: 3306,
            dialect: 'mysql',
            force: true,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
        this.sequelize = await this.sequelize;
        this.Mock = Mock.init(this.sequelize);
        await this.Mock.sync();
    });

    suite('setMicroDate', () => {
        test('should modify to add hooks property', () => {
            let opt = {};
            SuperModel.setMicroDate(opt);
            opt.should.have.property('hooks');
        });

        test('should modify to add property for Function in hooks property', () => {
            let opt = {};
            let arr = ['beforeCreate', 'beforeDelete', 'beforeUpdate'];
            arr.forEach((key) => {
                SuperModel.setMicroDate(opt, key);
                opt.should.have.property('hooks').property(key).instanceOf(Function);
            });
        });
    });

    suite('Class methods test', async () => {
        suite('create', async () => {
            test('should create mock row', async () => {
                let mock = this.Mock.build({
                    name: 'name',
                    secret: '123123'
                });
                try {
                    mock = await mock.save();
                    mock.should.have.property('dataValues');
                    mock.dataValues.should.containEql({name: 'name'}).containEql({secret: '123123'});
                    mock.should.have.property('dataValues').have.property('createdAt');
                    mock.dataValues.createdAt.should.above(1000000000000000); //microtime
                } catch (e) {
                    e.should.be.null();
                }
            });

            test('should fail', async () => {
                let mock = this.Mock.build({
                    name: 'name'
                });
                try {
                    mock = await mock.save();
                } catch (e) {
                    e.should.instanceOf(Error);
                }
            });
        });

        suite('findByKey', async () => {
            test('should find mock by name', async () => {
                try {
                    let mock = await this.Mock.findByKey('name', 'name');
                    mock.should.have.property('dataValues');
                    mock.dataValues.should.have.containEql({name: 'name'});
                } catch (e) {
                    e.should.be.null();
                }
            });
        });

        suite('updateByKey', async () => {
            test('should update name to updatedName', async () => {
                try {
                    let mock = await this.Mock.updateByKey('name', 'name', {name: 'updatedName'});
                    mock.should.have.property('dataValues');
                    mock.dataValues.should.have.containEql({name: 'updatedName'});
                } catch (e) {
                    e.should.be.null();
                }
            });
        });

        suite('destroyById', async () => {
            test('should find and remove mock object by id', async () => {
                try {
                    let mock = await this.Mock.findByKey('name', 'updatedName');
                    mock.should.have.property('dataValues');
                    mock.dataValues.should.have.containEql({name: 'updatedName'});
                    await this.Mock.destroyById(mock.id);
                    mock = await this.Mock.findByKey('name', 'updatedName');
                    mock.should.be.null();
                } catch (e) {
                    e.should.instanceOf(Error);
                }
            });
        });
    });

    after(() => {
        this.sequelize.close();
    });
});
