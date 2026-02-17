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

        this.score = 0;

        this.initMouse();
    }

    start() {
        requestAnimationFrame(this.loop);
        setInterval(() => {this.spawnEnemy()}, 1000);
        setInterval(() => {this.shoot()}, 300);
    }

    loop = () => {
        this.update();
        this.draw();
        requestAnimationFrame(this.loop);
    }

    update() {
        this.player.update();
        this.bullets.forEach(b => b.update());
        this.enemies.forEach(e => { e.update() });

        this.bullets.forEach((b, bindex) => {
            this.enemies.forEach((e, eindex) => {
                if (isColliding(b, e)) {
                    this.bullets.splice(bindex, 1);
                    this.enemies.splice(eindex, 1);
                    this.score += 1;
                }
            });
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#808080";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx);
        this.bullets.forEach(b => b.draw(this.ctx));
        this.enemies.forEach(e => e.draw(this.ctx));
        this.drawScore()
    }

    spawnEnemy() {
        this.enemies.push(new Enemy(Math.random() * 360, 0));
    }

    shoot() {
        this.bullets.push(this.player.shoot());
    }

    initMouse() {
        this.canvas.addEventListener("mousemove", (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;

            this.player.x = mouseX - this.player.width / 2;

            if (this.player.x < 0) this.player.x = 0;
            if (this.player.x > this.canvas.width - this.player.width) this.player.x = this.canvas.width - this.player.width
        })
    }

    drawScore() {
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.fillText("Score: " + this.score, 10, 30);
    }
}