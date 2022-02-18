class Player {
    constructor(leftPos, bottomPos, gameHeight, gameWidth) {
        this.leftPos = leftPos;
        this.bottomPos = bottomPos;
        this.width = 40
        this.isJumping = false;
        this.jumpHeight = gameHeight * .5;
        this.yVel = 20
        this.xVel = 4
        this.gravity = 0.95
        this.fallSpeed = 1;
        this.jumpPower = this.yVel;
        this.startJumpPos;
        this.currentDir = null;
        this.gameWidth = gameWidth
    }

    fall() {
        if (!this.isJumping){
        this.fallSpeed /= this.gravity
        if (this.fallSpeed > this.yVel) {
            this.fallSpeed = this.yVel}
        this.bottomPos -= this.fallSpeed}
    }

    jump() {
        this.bottomPos += this.jumpPower
        this.jumpPower *= this.gravity
        if (this.bottomPos >= this.startJumpPos + this.jumpHeight || this.jumpPower < 1) {
            this.isJumping = false;
            this.fallSpeed = this.jumpPower
            this.fall()
        }
    }

    move(dir) {
        this.currentDir = dir
        if (dir == 'left') {
            this.leftPos -= this.xVel
            if (this.leftPos <= 0) {
                this.leftPos = this.gameWidth
            }
            return;
        }
        if (dir == 'right') {
            this.leftPos += this.xVel
            if (this.leftPos + this.width >= this.gameWidth) {
                this.leftPos = 0 - this.width
            }
            return;
        }
    }
}