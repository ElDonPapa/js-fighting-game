"use strict"

import Sprite from "./sprite.js"
import Settings from "./settings.js"

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, Settings.canvasWidth, Settings.canvasHeight);

const player1 = new Sprite(c);

// Main game loop
let lastTime;
function update(time)
{
    if(lastTime !== null)
    {
        const delta = time - lastTime;
        // Put game updates here
        c.fillStyle = "black";
        c.fillRect(0, 0, Settings.canvasWidth, Settings.canvasHeight);
        player1.update();
    }

    lastTime = time;
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
