export default class Sprite {
    constructor(c, position){
        this.c = c;
        this.position = position;
    }

    draw() {
        c.fillStyle = "red";
        c.fillRect(this.position.x, this.position.y, 50, 150);
    }
}

