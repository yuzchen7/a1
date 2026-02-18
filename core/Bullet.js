import { GObject } from "./GObject.js";

export class Bullet extends GObject {
    constructor(x, y, vx, vy, radius) {
        super(x, y, 4, 15);
        // this.speed = speed;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}