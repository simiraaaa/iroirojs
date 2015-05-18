/// <reference path="tmlib.js"/>

(function (tm, undefined) {

    var Math = tm.global.Math;

    var ARROW_LABELS = {
        '-1': 'Å~',
        1: 'Å©',
        2: 'Å™',
        3: 'Å®',
        4: 'Å´',
        0: 'ÅE'
    };


    var ARROW_DIRECTIONS = {
        '-1': { x: 0, y: 0 },
        0: { x: 0, y: 0 },
        1: { x: -1, y: 0 },
        2: { x: 0, y: -1 },
        3: { x: 1, y: 0 },
        4: { x: 0, y: 1 },

    };

    var ARROW_COLORS = {
        '-1': 'silver',
        1: 'lime',
        2: 'blue',
        3: 'red',
        4: 'orange',
        0: 'white'
    };


    var Arrow = tm.define('tm.display.Arrow', {
        superClass: "tm.display.CircleShape",


        directions: null,
        removeX: 320,
        removeY: 480,

        defaultX: 320,
        defaultY: 480,



        /**
        * @param directions Array{Number} or Number
        */
        init: function (directions, param) {
            if (directions === undefined) direction = [Arrow.getRandomDirection()];
            this.superInit({
                width: 256,
                height: 256,
                strokeStyle: 'rgba(0,0,0,0.3)',
                lineWidth: 8
            });

            this.$extend(param || {});

            if (!directions.length) directions = [directions];
            this.directions = directions;
            this.fillStyle = directions[0];

            this.createArrowLabel();

        },

        check: function (directions) {
            if (!directions.length) {
                return -1 !== this.directions.indexOf(directions);
            }
            return this.directions.some(function (d) {
                return -1 !== directions.indexOf(d);
            })
        },

        bye: function (direction) {
            var v = ARROW_DIRECTIONS[direction];
            var self = this;
            this.tweener.clear().by({
                x: v.x * this.removeX,
                y: v.y * this.removeY,
                alpha: -1,
            }, 500, 'easeOutCirc').call(function () {
                self.remove();
            });
        },

        createArrowLabel: function () {
            var self = this;
            var min = Math.min(this.width,this.height);
            this.directions.forEach(function (d) {
                self.addChild(tm.display.Label(ARROW_LABELS[d], min));
            });
        },

        moveToDefault: function () {
            return this.move(this.defaultX, this.defaultY);
        },

        move: function (x, y) {
            this.tweener.clear().to({
                x: x, y: y
            }, 500, 'easeOutCirc');
            return this;
        }
    });


    Arrow.$extend({
        getRandomDirection: function () {
            var directions = [-1, 1, 2, 3, 4];
            return directions.shuffle()[0];
        }
    });


})(tm);