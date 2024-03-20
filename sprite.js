import Settings from "./settings.js"

export default class Sprite {
    constructor(c){
        this.c = c;
        this.height = 130;
        this.position = {
            x: 0,
            y: 0
        };
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    draw() {
        this.c.fillStyle = "red";
        this.c.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    updateGravity() {
        if((this.height + this.position.y + this.velocity.y) < Settings.canvasHeight){
            this.velocity.y += Settings.gravity;
        } else {
            this.velocity.y = 0;
        }
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.updateGravity();
    }
}

