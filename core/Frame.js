import { Bullet } from "./Bullet.js";
import { isColliding } from "./Conllision.js";
import { Enemy } from "./Enemy.js";
import { Player } from "./Player.js";

export class Frame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.player = new Player(180, 500);
        this.bullets = [];
        this.enemies = [];
        this.enemiesBullets = [];

        this.score = 0;

        this.time = 0;
        this.shootTime = 0;
        this.shootInterval = 0.1;

        this.initMouse();
    }

    start() {
        requestAnimationFrame(this.loop);
    }

    loop = () => {
        if (this.player.hp > 0) {
            this.update();
            this.draw();
            requestAnimationFrame(this.loop);
        } else {
            this.drawBackground();
            this.drawEnd();
        }
    }

    update() {
        const delta = 0.018;

        this.shootTime += delta;
        this.time += delta;

        this.player.update();
        this.enemies.forEach(e => e.update());

        this.bullets.forEach(b => b.update());
        this.enemiesBullets.forEach(b => b.update());

        if (this.shootTime >= this.shootInterval) {
            this.spawnPlayerBullet();
            this.shootTime = 0;
        }

        this.bullets.forEach((b, bindex) => {
            this.enemies.forEach((e, eindex) => {
                if (isColliding(b, e)) {
                    this.bullets.splice(bindex, 1);
                    this.enemies.splice(eindex, 1);
                    this.score += 1;
                }

                if (e.y > this.player.y) {
                    this.enemies.splice(eindex, 1);
                    this.player.hp -= 1;
                }
            });
        });
    }

    draw() {
        this.drawBackground();
        this.player.draw(this.ctx);
        this.bullets.forEach(b => b.draw(this.ctx));
        this.enemies.forEach(e => e.draw(this.ctx));
        this.drawScore();
        this.drawLife();
    }

    spawnEnemy() {
        this.enemies.push(new Enemy(Math.random() * 360, 0, this));
    }

    spawnEnemyBullet(x, y, vx, vy) {
        this.enemiesBullets.push(new Bullet(x, y, vx, vy, 3))
    }

    spawnPlayerBullet() {
        this.bullets.push(this.player.shoot());
    }

    initMouse() {
        this.canvas.addEventListener("mousemove", (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            this.player.x = mouseX - this.player.width / 2;
            this.player.y = mouseY - this.player.height / 2;

            if (this.player.x < 0) this.player.x = 0;
            if (this.player.y < 0) this.player.y = 0;
            if (this.player.x > this.canvas.width - this.player.width) this.player.x = this.canvas.width - this.player.width;
            if (this.player.y > this.canvas.height - this.player.height) this.player.y = this.canvas.height - this.player.height;
        });
    }

    drawScore() {
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.fillText("Score: " + this.score, 10, 30);
    }

    drawLife() {
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.fillText("HP: " + this.player.hp, 10, 60);
    }

    drawBackground() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#1b1918";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawEnd() {
        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Arial";
        this.ctx.fillText("Score: " + this.score, 10, 30);
    }
}