import { GObject } from "./GObject.js";
import { Bullet } from "./Bullet.js";

export class Player extends GObject {
    constructor(x, y) {
        super(x, y, 40, 60);

        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") this.x -= this.speed;
            if (e.key === "ArrowRight") this.x += this.speed;
        });
    }

    update() {}

    draw(ctx) {
        ctx.fillStyle = "cyan";
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height / 2);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height / 2);
        ctx.closePath();
        ctx.fill();
    }

    shoot() {
        return new Bullet(this.x + 18, this.y);
    }
}