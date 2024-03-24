export default class Sprite {
    constructor({context, position, imgSrc}) {
        this.c = context;
        this.position = position;
        this.image = new Image();
        this.image.src = imgSrc;
    }

    draw() {
        this.c.drawImage(this.image, this.position.x, this.position.y);
    }

    update() {
        this.draw();
    }
}
