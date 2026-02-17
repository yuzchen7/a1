import { GObject } from "./GObject.js";

export class Bullet extends GObject {
    constructor(x, y) {
        super(x, y, 4, 15);
        this.speed = 7;
    }

    update() {
        this.y -= this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}