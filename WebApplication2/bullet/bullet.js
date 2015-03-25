// Copyright (c) 2014 simiraaaa
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php


///<reference path="tmlib.js"/>

tm.bullet = tm.bullet || {};

(function(tm, Worker, undefined) {

    var BULLET_NAMESPACE = "tm.bullet.";
    var createName = function(name) {
        return BULLET_NAMESPACE + name;
    };

    var Bullet = tm.define(createName("Bullet"), {
        superClass : tm.display.CanvasElement,

        targetType : 1 + 2,
        target : null,
        targetList : null,

        // 発生源のオブジェクト
        shooter : null,

        init : function() {
            this.superInit();
        },

        setShooter : function(shooter) {
            this.shooter = shooter;
            return this;
        },

        setTarget : function(target) {
            this.target = target;
            return this;
        },

        setTargetList : function(targetList) {
            this.targetList = targetList;
            return this;
        },

        setTargetType : function(type) {
            this.targetType = type;
            return this;
        },

        hitTest : function(target, app, list) {
            if (this.isHitElement(target)) {
                this.hit(target, app, list);
            }
            return this;
        },

        hit : function(target, app, list) {
        // 実装して衝突時の動作を指定
        },

        move : function(app) {
        // 移動時の動作、その他
        },

        _oneHitTest : function(app) {
            if (this.target) {
                this.hitTest(this.target, app);
            }
            return this;
        },

        _listHitTest : function(app) {
            var list = this.targetList;
            if (!list) {
                return this;
            }
            var copy = list.slice();

            for (var i = 0, len = copy.length; i < len; ++i) {
                this.hitTest(copy[i], app, list);
            }
            return this;
        },

        onType : function(t) {
            var on = (this.targetType & t) === t;
            if (!on) {
                this.targetType += t;
            }
            return this;
        },

        offType : function(t) {
            if ((this.targetType & t) === t) {
                this.targetType -= t;
            }
            return this;
        },

        onAllType : function() {
            return this.onType(1).onType(2);
        },

        offAllType : function() {
            return this.offType(1).offType(2);
        },

        update : function(app) {
            this.move(app);
            var t = this.targetType;
            if ((t & 1) === 1) {
                this._oneHitTest(app);
            }

            if ((t & 2) === 2) {
                this._listHitTest(app);
            }

        }

    });

    var Shot = (function() {

        var target = null, targetList = null, targetType = 3, shooter = null, parent = null;

        var Shot = tm.define(createName("Shot"), {
            superClass : Bullet,
            targetType : 3,

            init : function() {
                this.superInit();
                this.target = target || null;
                this.targetList = targetList || null;
                this.targetType = targetType || 0;
                shooter && this.setPosition(shooter.x, shooter.y);
                parent && this.addChildTo(parent);
            },

        });

        Shot.onType = function(t) {
            var on = (targetType & t) === t;
            if (!on) {
                targetType += t;
            }
            return Shot;
        };

        Shot.offType = function(t) {
            if ((targetType & t) === t) {
                targetType -= t;
            }
            return Shot;
        };

        Shot.onAllType = function() {
            return Shot.onType(1).onType(2);
        };

        Shot.offAllType = function() {
            return Shot.offType(1).offType(2);
        };

        Shot.accessor("target", {
            set : function(t) {
                target = t;
            },
            get : function() {
                return target;
            }
        });

        Shot.accessor("shooter", {
            set : function(s) {
                shooter = s;
            },
            get : function() {
                return shooter;
            }
        });

        Shot.accessor("parent", {
            set : function(p) {
                parent = p;
            },
            get : function() {
                return parent;
            }
        });

        Shot.accessor("targetList", {
            set : function(list) {
                targetList = list;
            },
            get : function() {
                return targetList;
            }
        });

        Shot.accessor("targetType", {
            set : function(type) {
                targetType = type;
            },
            get : function() {
                return targetType;
            }
        });

        return Shot;
    })();

    var EnemyBullet = (function() {

        var target = null, targetList = null, targetType = 1, shooter = null, parent = null;

        var EnemyBullet = tm.define(createName("EnemyBullet"), {
            superClass : Bullet,

            init : function() {
                this.superInit();
                this.target = target || null;
                this.targetList = targetList || null;
                this.targetType = targetType || 0;
                shooter && this.setPosition(shooter.x, shooter.y);
                parent && this.addChildTo(parent);

            }

        });

        EnemyBullet.onType = function(t) {
            var on = (targetType & t) === t;
            if (!on) {
                targetType += t;
            }
            return EnemyBullet;
        };

        EnemyBullet.offType = function(t) {
            if ((targetType & t) === t) {
                targetType -= t;
            }
            return EnemyBullet;
        };

        EnemyBullet.onAllType = function() {
            return EnemyBullet.onType(1).onType(2);
        };

        EnemyBullet.offAllType = function() {
            return EnemyBullet.offType(1).offType(2);
        };

        EnemyBullet.accessor("target", {
            set : function(t) {
                target = t;
            },
            get : function() {
                return target;
            }
        });

        EnemyBullet.accessor("shooter", {
            set : function(s) {
                shooter = s;
            },
            get : function() {
                return shooter;
            }
        });

        EnemyBullet.accessor("parent", {
            set : function(p) {
                parent = p;
            },
            get : function() {
                return parent;
            }
        });

        EnemyBullet.accessor("targetList", {
            set : function(list) {
                targetList = list;
            },
            get : function() {
                return targetList;
            }
        });

        EnemyBullet.accessor("targetType", {
            set : function(type) {
                targetType = type;
            },
            get : function() {
                return targetType;
            }
        });

        return EnemyBullet;
    })();

})(tm, Worker);
