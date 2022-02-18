class Game {
    constructor(platformCount) {
        this.playing = false;
        this.score = 0;
        this.platformCount = platformCount
        this.platforms = []
        this.doodler;
        this.gameWidth = document.querySelector('.gameArea').offsetWidth
        this.gameHeight = document.querySelector('.gameArea').offsetHeight
    }

    startGame() {
        this.playing = true;
        this.createPlatforms();
        this.setDoodler();
    }

    createPlatforms() {
        let platGap = this.gameHeight / this.platformCount //vertical space between platforms spaced evenly
        for (let i = 0; i < this.platformCount; i++) {
            let platBottom = 100 + (i * platGap)
            let p = new Platform(platBottom)
            this.platforms.push(p)        
        }
    }

    setDoodler() {
        this.doodler = new Player(this.platforms[0].leftPos, this.platforms[0].bottomPos + 200, this.gameHeight, this.gameWidth)
        this.doodler.jumpSpeed = 1
    }

    movePlatforms() {
        if (this.doodler.bottomPos >= this.gameHeight*0.75) {
            console.log('scroll')
        }
    }

    checkCollision() {
        if (this.doodler.isJumping) return this.doodler.jump()
        this.platforms.forEach(p => {
            if (this.doodler.leftPos + this.doodler.width>= p.leftPos && 
                this.doodler.leftPos  <= p.leftPos + p.width && // these 2 lines check that doodler is within the left and right borders of platform
                this.doodler.bottomPos <= p.bottomPos + 15 &&
                this.doodler.bottomPos >= p.bottomPos && //these 2 lines check that bottom of doodler touches platform
                !this.doodler.isJumping) { // doodler only collides while falling
                    this.doodler.isJumping = true;
                    this.doodler.startJumpPos = this.doodler.bottomPos
                    this.doodler.jumpPower = this.doodler.yVel
                    return this.doodler.jump();
                }
        })
    }

    gameOver() {
        return(this.doodler.bottomPos <= 0)
    }
}