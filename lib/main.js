const assert = require('assert');

const UNIT_MAP = {
    y: 31536e6, m: 2628e6, w: 6048e5, d: 864e5, h: 36e5, mn: 6e4, s: 1e3, ms: 1
};
const UNITS = Object.keys(UNIT_MAP);

function stringToMs(string) {

    var neg = 1, cu, total = 0;
    if(string.charAt(0) === '-'){
        neg = -1;
        string = string.substr(1);
    }

    let input = string.match(/(\d+|[a-z]+)/gm);

    UNITS.forEach(function(u){
        cu = input[1] || input.length === 0;
        assert(cu, new Error(`[Periodo] Invalid period format in '${string}'`));

        if(cu != u)
            return;

        total += UNIT_MAP[u] * input.shift();
        input.shift();
    });

    assert(cu === true || cu in UNIT_MAP, new Error(`[Periodo] Invalid time unit '${cu}' in '${string}'`));
    assert(input.length === 0, new Error(`[Periodo] Unexpected time unit '${cu}' in '${string}'`));

    total = total * neg;
    return total;
}

function msToString(ms, precision) {

    let string = ms < 0 ? '-' : '';
    ms = Math.abs(ms);

    UNITS.some(function(u){
        var v = UNIT_MAP[u];
        var n = Math.floor(ms / v);
        if(n < 1)
            return;

        ms -= n * v;
        string += String(n) + u;

        if(precision === u)
            return true;
    });

    return string || '0';
}

function periodo(input, precision) {
    precision = precision || 'ms';
    let proto = { time: input };

    if(typeof input === 'string'){
        proto.string = input;
        proto.time = stringToMs(input);
    }
    else if(!Number.isInteger(proto.time))
        throw new Error(`[Periodo] Unexpected input '${proto.time}'. Expecting string or integer`);
    else
        proto.string = msToString(proto.time, precision);

    return proto;
}

module.exports = periodo;

module.exports.diffDates = function (d1, d2, precision) {
    d1 = new Date(d1);
    d2 = new Date(d2);
    return periodo(d2.getTime() - d1.getTime(), precision);
}

module.exports.subtractFrom = function (p, date) {
    let d = new Date(date || Date.now());
    return new Date(d.getTime() - periodo(p).time);
}

module.exports.addTo = function (p, date) {
    let d = new Date(date || Date.now());
    return new Date(d.getTime() + periodo(p).time);
}
