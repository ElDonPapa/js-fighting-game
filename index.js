"use strict"

import Sprite from "./sprite.js"

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

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
        c.fillRect(0, 0, canvas.width, canvas.height);
        player1.update();
    }

    lastTime = time;
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
