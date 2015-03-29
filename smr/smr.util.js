///<reference path="smr.js" />

(function (smr, undefined) {
    "use strict";

    var EQUAL = "=", AMP = "&";
    var global = smr.global;
    var encodeURI = global.encodeURI;

    var util = {};
    util.queryString = {

        /**
         * dataオブジェクトを key eq data[key] amp key eq data[key]な感じにする
         * 
         * @param data
         * @param eq
         *            デフォルト "="
         * @param amp
         *            デフォルト "&"
         * @returns
         */
        stringify: function (data, eq, amp) {
            eq = eq || EQUAL;
            amp = amp || AMP;
            var query = [];
            for (var key in data) {
                query[query.length] = encodeURI(key) + eq + encodeURI(data[key]);
            }
            return query.join(amp);
        },
        /**
         * "="以外をencodeURIする
         */
        encodeURINonEqual: function (s) {
            var ar = s.split(EQUAL);
            for (var i = 0, len = ar.length; i < len; ++i) {
                ar[i] = encodeURI(ar[i]);
            }
            return ar.join(EQUAL);
        },

        parse: function () {
            alert("smr.util.parse:あとで作る");
        }
    };
    smr.definePackages("smr.util", util);
})(smr);
