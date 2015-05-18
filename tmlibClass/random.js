/// <reference path="tmlib.js"/>

(function (tm, undefined) {
    var MAX = 4294967295;
    var seed = ~~(Math.random() * MAX);
    var y = seed;
    function xor32() {
        y = y ^ (y << 13);
        y = y ^ (y >>> 17);
        return (y = (y ^ (y << 5)));
    }

    function random() {
        return (xor32() >>> 0) / MAX;
    }
    random.xor32 = xor32;
    random.seed = seed;
    tm.using('tm.util').random = random;
})(tm);