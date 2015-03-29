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
    smr.definePackages("smr.util", util);
})(smr);
