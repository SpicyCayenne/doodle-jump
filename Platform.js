class Platform {
    constructor(bottomPos) {
        const gameWidth = document.querySelector('.gameArea').offsetWidth // get width of the game area so platforms don't go outside it
        this.width = Math.random() * 200
        this.leftPos = (Math.random() * gameWidth) - this.width
        if (this.leftPos <= 0) this.leftPos = 0
        this.bottomPos = bottomPos
    }

}