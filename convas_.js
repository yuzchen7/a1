import { Frame } from "./core/Frame.js";

const main = () => {
    const canvas = document.getElementById("main_screen");
    // const ctx = canvas.getContext("2d");

    // ctx.fillStyle = "black";
    // ctx.fillRect(0, 0, 400, 600);
    const frame = new Frame(canvas);

    frame.start();
}

main();