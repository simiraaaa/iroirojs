/**
 * main
 */
(function(tm) {
    tm.main(function() {
        var app = tm.display.CanvasApp("#world");
        app.resize(320, 320);
        app.background = "#000";
        app.fps = 30;
        app.fitWindow();
        app.run();

        var scene = app.currentScene;

        var player = tm.display.CircleShape({
            width : 32,
            height : 32
        });

        var enemies = [];
        tm.bullet.Shot.shooter = player;
        tm.bullet.Shot.parent = scene;
        tm.bullet.Shot.targetList = enemies;
        tm.bullet.Shot.targetType = 2;
        player.addChildTo(scene);
        var sdes = function() {
            if (this.isDes) {
                return;
            }
            this.isDes = true;
            this.remove();
        };

        var smove = function() {
            this.y -= 5;
            (this.y < 0) && this.destroy();
        };

        var shit = function(t, a, l) {
            t.destroy();
            this.destroy();
        };
        player.update = function(app) {
            var p = app.pointing;
            this.x = p.x;
            this.y = p.y;
            if (app.frame % 1 === 0) {
                var s = tm.bullet.Shot();
                s.destroy = sdes;
                s.move = smove;
                s.hit = shit;
                s.setSize(16, 16);
                tm.display.TriangleShape({
                    width : 16,
                    height : 16
                }).addChildTo(s);
            }
        };
        tm.bullet.EnemyBullet.target = player;
        tm.bullet.EnemyBullet.parent = scene;
        var hit = function(t, a) {
            this.destroy();
        };

        var destroy = function() {

            if (this.isRemove) {
                return;
            }
            this.isRemove = true;
            this.remove();
            enemies.erase(this);
        };

        var move = function(app) {
            this.y += 1;
            (this.y > 320) && this.destroy();
        };
        var start = +new Date();
        var fps = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

        scene.addChild(tm.display.Label().setPosition(160, 300)).update = function() {
            this.text = 1000 / fps.average();
        };

        scene.update = function(app) {
            fps.shift();
            fps[fps.length] = (new Date() - start);
            start = new Date();
            var b = tm.bullet.EnemyBullet();
            b.setPosition(Math.rand(0, 320), 0).setSize(16, 16);
            b.move = move;
            b.hit = hit;
            b.addChild(tm.display.CircleShape({
                width : 16,
                height : 16
            }));
            enemies[enemies.length] = b;
            b.destroy = destroy;
        };
    });
})(tm);