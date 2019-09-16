const assert = require('assert');
const periodo = require('../lib/main');

describe('Periodo', function(){

    it('Should fail when invalid input is found', function(){
        assert.throws( () => periodo(true), /Unexpected input/ );
    });


    describe('String to Milliseconds', function(){

        it('Should parse miliseconds from string representation', function(){
            let obj = periodo('1d2h3ms');
            assert.strictEqual(obj.time, 93600003);
        });

        it('Should parse miliseconds from negated string representation', function(){
            let obj = periodo('-1d2h');
            assert.strictEqual(obj.time, -93600000);
        });

        it('Should fail when invalid time unity is present', function(){
            assert.throws( () => periodo('1d3z'), /Invalid time unit/ );
        });

        it('Should fail when format is incorrect', function(){
            assert.throws( () => periodo('232'), /Invalid period format/ );
        });

        it('Should fail when time units are in incorrect order', function(){
            assert.throws( () => periodo('2d3h5y'), /Unexpected time unit/ );
        });

    });

    describe('Milliseconds to String', function(){

        it('Should generate string representation from miliseconds', function(){
            let obj = periodo(234876987);
            assert.strictEqual(obj.string, '2d17h14mn36s987ms');
        });

        it('Should cap string output at given precision', function(){
            let obj = periodo(234876987, 'mn');
            assert.strictEqual(obj.string, '2d17h14mn');
        });

        it('Should generate string representation from negative miliseconds', function(){
            let obj = periodo(-234876100);
            assert.strictEqual(obj.string, '-2d17h14mn36s100ms');
        });

        it('Should generate string representation for 0 milliseconds', function(){
            let obj = periodo(0);
            assert.strictEqual(obj.string, '0');
        });

    });

    describe('Date Operations', function(){

        it('Should return period between two dates', function(){
            let obj = periodo.diffDates('2012-12-12', '2013-12-12');
            assert.strictEqual(obj.string, '1y');
        });

        it('Should return a date decreased by the input amount', function(){
            let now = Date.now();
            let d = periodo.addTo('-300ms', now);
            assert.strictEqual(d.getTime(), now - 300);
        });

        it('Should return a date increased by the input amount', function(){
            let now = Date.now();
            periodo.addTo('300ms');
            let d = periodo.addTo('300ms', now);
            assert.strictEqual(d.getTime(), now + 300);
        });

    });

});
