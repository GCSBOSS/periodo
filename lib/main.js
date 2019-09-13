
const UNIT_MAP = {
    y: 31536e6, m: 2628e6, w: 6048e5, d: 864e5, h: 36e5, mn: 6e4, s: 1e3, ms: 1
};
const UNITS = Object.keys(UNIT_MAP);

function stringToMs(string) {
    var neg = 1;
    if(string.charAt(0) === '-'){
        neg = -1;
        string = string.substr(1);
    }

    let total = 0;
    let input = string.match(/(\d+|[a-z]+)/gm);
    let cn, cu;

    for(var u of UNITS){

        if(input.length == 0)
            break;

        cu = input[1];
        if(!cu)
            throw new Error(`[Periodo] Invalid period format in '${string}'`);

        if(! (cu in UNIT_MAP))
            throw new Error(`[Periodo] Invalid time unit '${cu}' in '${string}'`);

        if(cu != u)
            continue;

        cn = input[0];
        var n = parseInt(cn);

        /* istanbul ignore if */
        if(!n)
            throw new Error(`[Periodo] ERROR`);

        total += UNIT_MAP[u] * n;
        input.shift();
        input.shift();
    }

    if(input.length > 0)
        throw new Error(`[Periodo] Unexpected time unit '${cu}' in '${string}'`);

    total = total * neg;
    return total;
}

function msToString(ms, precision) {

    let string = ms < 0 ? '-' : '';
    ms = Math.abs(ms);

    for(var u of UNITS){

        var v = UNIT_MAP[u];
        var rat = ms / v;
        if(rat < 1)
            continue;

        var n = Math.floor(rat);
        ms -= n * v;
        string += String(n) + u;

        if(precision === u)
            break;
    }

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
