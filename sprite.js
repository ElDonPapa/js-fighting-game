export default class Sprite {
    constructor(c){
        this.c = c;
        this.position = {
            x: 0,
            y: 0
        };
    }

    draw() {
        this.c.fillStyle = "red";
        this.c.fillRect(this.position.x, this.position.y, 50, 130);
    }

    update() {
        this.draw();
        this.position.y++;
    }
}

