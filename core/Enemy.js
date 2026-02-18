import { GObject } from "./GObject.js";

export class Enemy extends GObject {
    constructor(x, y, game) {
        super(x, y, 40, 40);
        this.speed = 2;
        this.angle = 0;
        this.game = game;
    }

    update(time) {
        this.angle += 0.02;
        if (Math.floor(time * 10) % 15 === 0) {
            this.shootCircle();
        }
    }

    draw(ctx) {
        ctx.fillStyle = "with";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height);
        ctx.closePath();
        ctx.fill();
    }

    shootCircle() {
        const bulletCount = 30;
        const speed = 2 + Math.random() * 1.5;

        for (let i = 0; i < speed; i++) {
            const angle = (Math.PI * 2 * i) / bulletCount;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            this.game.spawnEnemyBullet(this.x, this.y, vx, vy);
        }
    }
}