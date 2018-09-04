suite('Utils test', () => {
    suiteSetup(() => {
        this.utils = require('../utils');
    });

    suite('utils about attribute', () => {
        suite('getStrLen', () => {
            test('should return 191 when charset is utf8md4.', () => {
                let len = this.utils.attr.getStrLen();
                len.should.be.eql(191);

                len = this.utils.attr.getStrLen('utf8mb4');
                len.should.be.eql(191);
            });

            test('should return 255 when charset is not utf8mb4', () => {
                let len = this.utils.attr.getStrLen('utf8');
                len.should.be.eql(255);
            });
        });

        suite('getEnumArrFromStd', () => {
            test('should return 191 when charset is utf8md4.', () => {
                let obj = {
                    a: 1,
                    b: 2
                };
                let arr = this.utils.attr.getEnumArrFromStd(obj);
                arr.should.containDeep([1, 2]);
            });
        });
    });
});
