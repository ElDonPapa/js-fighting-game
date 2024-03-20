"use strict"

import Sprite from "./sprite.js"
import Settings from "./settings.js"

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = Settings.canvasWidth;
canvas.height = Settings.canvasHeight;
c.fillRect(0, 0, Settings.canvasWidth, Settings.canvasHeight);

const player1 = new Sprite(c);

let lastKey;
const keys = {
    q: {
        pressed: false
    },
    d: {
        pressed: false
    }
};

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
        
        // Player 1 movements
        player1.velocity.x = 0;
        if(keys.d.pressed && lastKey === "d"){
            player1.velocity.x = player1.moveSpeed;
        } else if(keys.q.pressed && lastKey === "q") {
            player1.velocity.x = -player1.moveSpeed;
        }
    }

    lastTime = time;
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);

// Handle player movements
window.addEventListener("keydown", (event) => {
    switch(event.key) {
        case "d":
            keys.d.pressed = true; 
            lastKey = "d";
            break;
        case "q": 
            keys.q.pressed = true;
            lastKey = "q";
            break;
    }
})

window.addEventListener("keyup", (event) => {
    switch(event.key) {
        case "d":
            keys.d.pressed = false;
            break;
        case "q":
            keys.q.pressed = false;
            break
    }
})
