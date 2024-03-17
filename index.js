"use strict"

import Sprite from "./sprite.js"

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const player1 = new Sprite(c, {x: 10, y: 10});
player1.draw();

