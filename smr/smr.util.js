///<reference path="smr.js" />

(function (smr, undefined) {
    "use strict";

    var EQUAL = "=", AMP = "&";
    var global = smr.global;
    var encodeURIComponent = global.encodeURIComponent;

    var util = {};
    util.queryString = {

        /**
         * dataオブジェクトを key eq data[key] amp key eq data[key]な感じにする
         * 
         * @param data
         * @param encode
         *            デフォルト true //falseを指定するとそのまま結合
         * @param eq
         *            デフォルト "="
         * @param amp
         *            デフォルト "&"
         * @returns
         */
        stringify: function (data, encode, eq, amp) {
            eq = eq || EQUAL;
            amp = amp || AMP;
            encode = (encode === undefined) || encode;

            var query = [];

            if (encode) {
                for (var key in data) {
                    query[query.length] = encodeURIComponent(key) + eq + encodeURIComponent(data[key]);
                }
            } else {
                for (var key in data) {
                    query[query.length] = key + eq + data[key];
                }
            }
            return query.join(amp);
        },
        /**
         * "="以外をencodeURIComponentする
         */
        encodeURINonEqual: function (s) {
            var ar = s.split(EQUAL);
            for (var i = 0, len = ar.length; i < len; ++i) {
                ar[i] = encodeURIComponent(ar[i]);
            }
            return ar.join(EQUAL);
        },

        parse: function () {
            alert("smr.util.parse:あとで作る");
        }
    };



    //random あとで見直す
    //var Random = smr.define('smr.util.Random', {

    //    seed: 1,
    //    init: function (seed) {
    //        this.seed = seed || 1;
    //    },

    //    xor32: function () {
    //        return this.seed = xor32(this.seed);
    //    },

    //    random: function () {
    //        return random(this.xor32());
    //    },

    //});
    //function xor32(y) {
    //    y = y ^ (y << 13);
    //    y = y ^ (y >>> 17);
    //    return (y = (y ^ (y << 5)));
    //}
    //var MAX_RANDOM = 4294967295;
    //function random(x) {
    //    return (xor32(x) >>> 0) / MAX_RANDOM;
    //}
    //smr.defineProperty.call(Random, {
    //    xor32: xor32,
    //    random: random,
    //    MAX: MAX_RANDOM,
    //});

    (function () {
        var MAX = -1 >>> 0;
        var seed = ~~(Math.random() * MAX) || 1;
        var y = seed;
        function xor32() {
            y = y ^ (y << 13);
            y = y ^ (y >>> 17);
            return (y = (y ^ (y << 5)));
        }
        function random() {
            return (xor32() >>> 0) / MAX;
        }
        util.random = random;

        smr.definePackage(random, {
            xor32: xor32,
            seed: seed,
            MAX: MAX,
        });
    })();




    smr.definePackages("smr.util", util);
})(smr);
