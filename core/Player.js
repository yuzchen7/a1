import { GObject } from "./GObject.js";
import { Bullet } from "./Bullet.js";

export class Player extends GObject {
    constructor(x, y) {
        super(x, y, 25, 50);
        this.hp = 10;
        this.radius = 4;
    }

    draw(ctx) {
        ctx.fillStyle = "#e4d17b";
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height / 2 + 10);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height / 2 + 10);
        ctx.closePath();
        ctx.fillRect(this.x - 1, this.y + this.height - 5, 5, 5);
        ctx.fillRect(this.x + this.width - 4, this.y + this.height - 5, 5, 5);
        ctx.fill();
    }

    shoot() {
    //     let angle = (Math.PI * 2 / )
        return new Bullet(this.x + Math.floor(this.width / 2), this.y - 20, 0, -8, 6);
    }
}