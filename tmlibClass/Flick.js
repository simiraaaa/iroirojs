/// <reference path="tmlib.js"/>

(function (tm) {

    var Math = tm.global.Math;

    //’è”
    var
        NONE = -1,
        LEFT = 1,
        UP = 2,
        RIGHT = 3,
        DOWN = 4;




    tm.define('tm.input.Flick', {

        xList: null,
        yList: null,


        init: function () {
            this.xList = [];
            this.yList = [];
        },

        clear: function () {
            this.xList.length = this.yList.length = 0;
        },

        push: function (x, y) {
            var xlist = this.xList;
            var ylist = this.yList;
            xlist.push(x);
            ylist.push(y);
            if (xlist.length > 10) {
                xlist.shift();
                ylist.shift();
            }
        },

        getAverage: function () {
            return tm.geom.Vector2(this.xList.average(), this.yList.average());
        },

        getDirection: function () {
            var delta = this.getAverage();
            this.clear();

            if (delta.lengthSquared() > 2) {
                var x = delta.x, y = delta.y;
                if (Math.abs(x) < Math.abs(y)) {
                    return y < 0 ? UP : DOWN;
                } else {
                    return x < 0 ? LEFT : RIGHT;
                }
            }
            return NONE;
        },

    });

    tm.input.Flick.$extend({
        LEFT: LEFT,
        UP: UP,
        RIGHT: RIGHT,
        DOWN: DOWN,
        NONE: NONE,
    });

})(tm);
