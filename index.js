"use strict"

import Sprite from "./sprite.js"
import Settings from "./settings.js"

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = Settings.canvasWidth;
canvas.height = Settings.canvasHeight;
c.fillRect(0, 0, Settings.canvasWidth, Settings.canvasHeight);

const player1 = new Sprite({
    context: c,
    position: {
        x: Settings.canvasWidth/3,
        y: 0
    }
});

const player2 = new Sprite({
    context: c,
    position: {
        x: Settings.canvasWidth - Settings.canvasWidth/3,
        y: 0
    },
    color: "blue"
});

let lastKey;
const keys = {
    q: {
        pressed: false
    },
    d: {
        pressed: false
    },
    arrowLeft: {
        pressed: false
    },
    arrowRight: {
        pressed: false
    },
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
        player2.update();
        
        // Player 1 movements
        player1.velocity.x = 0;
        if(keys.d.pressed && player1.lastKey === "d"){
            player1.velocity.x = player1.moveSpeed;
        } else if(keys.q.pressed && player1.lastKey === "q") {
            player1.velocity.x = -player1.moveSpeed;
        }

        // Player 2 movements
        player2.velocity.x = 0;
        if(keys.arrowRight.pressed && player2.lastKey === "ArrowRight"){
            player2.velocity.x = player2.moveSpeed;
        } else if(keys.arrowLeft.pressed && player2.lastKey === "ArrowLeft") {
            player2.velocity.x = -player2.moveSpeed;
        }
        
        // Attack box collisions check
        if(
            player1.attackBox.position.x + player1.attackBox.width > player2.position.x
            && player1.attackBox.position.x < player2.position.x + player2.width
        ) {
            console.log("ATTACK");
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
            player1.lastKey = "d";
            break;
        case "q": 
            keys.q.pressed = true;
            player1.lastKey = "q";
            break;
        case "ArrowRight":
            keys.arrowRight.pressed = true;
            player2.lastKey = "ArrowRight";
            break
        case "ArrowLeft":
            keys.arrowLeft.pressed = true;
            player2.lastKey = "ArrowLeft";
            break
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
        case "ArrowRight":
            keys.arrowRight.pressed = false;
            break
        case "ArrowLeft":
            keys.arrowLeft.pressed = false;
            break
    }
})
