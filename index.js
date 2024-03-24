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

const player1HealthBar = document.querySelector("#player1HealthBar");
const player2HealthBar = document.querySelector("#player2HealthBar");

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

function rectangularCollision({rectangle1, rectangle2}){
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width > rectangle2.position.x
        && rectangle1.attackBox.position.x < rectangle2.position.x + rectangle2.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height > rectangle2.position.y
        && rectangle1.attackBox.position.y < rectangle2.position.y + rectangle2.height
    );
}


const timer = document.querySelector("#timer");
let timerTime = 10;
let timerId;
function decreaseTimer() {
    if(timerTime > 0) {
        timerTime --;
        timer.innerHTML = timerTime;
        timerId = setTimeout(decreaseTimer, 1000);
    } else {
        determineWinner(player1, player2);
    } 
}

const winMessage = document.querySelector("#winMessage");
function determineWinner(player1, player2) {
    clearTimeout(timerId);
    if(player1.health === player2.health) {
        winMessage.innerHTML = "Tie";
    } else if(player1.health > player2.health) {
        winMessage.innerHTML = "Player 1 Wins";
    } else {
        winMessage.innerHTML = "Player 2 Wins";
    }
    winMessage.style.visibility = "visible";
}

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
        
        // Player 1 Attack box collisions check
        if(
            rectangularCollision({
                rectangle1: player1,
                rectangle2: player2 
            }) && player1.isAttacking) {
            player1.isAttacking = false;
            player2.health -= player1.attackDamage;
            player2HealthBar.style.width = (player2.health / player2.baseHealth) * 100 + "%";
        }

        // Player 2 Attack box collisions check
        if(
            rectangularCollision({
                rectangle1: player2,
                rectangle2: player1 
            }) && player2.isAttacking) {
            player2.isAttacking = false;
            player1.health -= player2.attackDamage;
            player1HealthBar.style.width = (player1.health / player1.baseHealth) * 100 + "%";
        }

        // Players Orientation update
        const player1XCenter = player1.position.x + player1.width / 2;
        const player2XCenter = player2.position.x + player2.width / 2;

        player1.facingEast = (player1XCenter < player2XCenter);
        player2.facingEast = (player2XCenter < player1XCenter);

        // End game on death
        if(player1.health <= 0 || player2.health <= 0){
            determineWinner(player1, player2, timerId);
        }

    }

    lastTime = time;
    window.requestAnimationFrame(update);
}

decreaseTimer();
window.requestAnimationFrame(update);

// Handle player movements
window.addEventListener("keydown", (event) => {
    switch(event.key) {
        // Player 1
        case "d":
            keys.d.pressed = true; 
            player1.lastKey = "d";
            break;
        case "q": 
            keys.q.pressed = true;
            player1.lastKey = "q";
            break;
        case "z":
            if(player1.canJump){
                player1.canJump = false;
                player1.velocity.y = -player1.jumpHeight;
            }
            break;
        case "s":
            player1.attack();
            break; 

        // Player 2
        case "ArrowRight":
            keys.arrowRight.pressed = true;
            player2.lastKey = "ArrowRight";
            break
        case "ArrowLeft":
            keys.arrowLeft.pressed = true;
            player2.lastKey = "ArrowLeft";
            break
        case "ArrowUp":
            if(player2.canJump){
                player2.canJump = false;
                player2.velocity.y = -player2.jumpHeight;
            }
            break;
        case "ArrowDown":
            player2.attack();
            break;
    }
})

window.addEventListener("keyup", (event) => {
    switch(event.key) {
        // Player 1
        case "d":
            keys.d.pressed = false;
            break;
        case "q":
            keys.q.pressed = false;
            break

        // Player 2
        case "ArrowRight":
            keys.arrowRight.pressed = false;
            break
        case "ArrowLeft":
            keys.arrowLeft.pressed = false;
            break
    }
})
