import Settings from "./settings.js"

export default class Fighter {
    constructor({context, position, color = "red"}){
        this.c = context;
        this.color = color;
        this.height = 130;
        this.width = 50;
        this.moveSpeed = 4;
        this.jumpHeight = 15;
        this.baseHealth = 100;
        this.health = this.baseHealth;
        this.attackDamage = 10;
        this.facingEast = true;
        this.lastKey;
        this.canJump = false;
        this.isAttacking = false;
        this.position = position;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: {
                x: 0,
                y: 0
            },
            width: 100,
            height: 50
        }
    }

    draw() {
        this.c.fillStyle = this.color;
        this.c.fillRect(this.position.x, this.position.y, this.width, this.height);

        // Attack box
        if(this.isAttacking) {
            this.c.fillStyle = "green";
            this.c.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
            );
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }

    updateGravity() {
        if((this.height + this.position.y + this.velocity.y) < Settings.canvasHeight){
            this.velocity.y += Settings.gravity;
        } else {
            this.velocity.y = 0; 
            this.canJump = true;
        }
    }

    updateOrientation() {
        this.attackBox.offset.x = (this.facingEast) ? 0 : this.width;
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;
        this.updateOrientation();
        this.updateGravity();
    }
}

