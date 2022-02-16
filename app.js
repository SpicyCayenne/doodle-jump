document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    const startBtn = document.createElement('button')
    let doodlerLeftSpace = 50
    let startPoint = 150
    let doodlerBottomSpace = startPoint
    let isGameOver = false
    let platformCount = 5
    let platforms = []
    let upTimerId
    let downTimerId
    let isJumping = false
    let isGoingLeft
    let isGoingRight
    let leftTimerId
    let rightTimerId
    let platformTimerId
    let score = 0
    
    function showStartButton(buttonText) {
        grid.appendChild(startBtn)
        startBtn.classList.add('startBtn')
        startBtn.addEventListener('click', start)
        startBtn.innerText = buttonText
        let instructions = document.createElement('div')
        grid.appendChild(instructions)
        instructions.classList.add('instructions')
        instructions.innerText = 'Use the arrow keys or WAD to move the doodler. W/up arrow will cancel any left and right momentum. Try to land on the platforms.'

    }
    
    function createDoodler() {
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodlerLeftSpace = platforms[0].left
        doodler.style.left = doodlerLeftSpace + 'px'
        doodler.style.bottom = doodlerBottomSpace + 'px'
    }

    class Platform {
        constructor(newPlatBottom) {
            this.bottom = newPlatBottom
            this.left = Math.random() * 315
            this.visual = document.createElement('div')

            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }
    }
    function createPlatforms() {
        for (let i = 0; i < platformCount; i++) {
            let platGap = 600 / platformCount
            let newPlatBottom = 100 + i * platGap
            let newPlatform = new Platform(newPlatBottom)
            platforms.push(newPlatform)
        }
    }

    function movePlatforms() {
        if (doodlerBottomSpace >= 200) {
            platforms.forEach(platform => {
                platform.bottom -= 4
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px'
                if (platform.bottom < 10) {
                    let firstPlatform = platforms[0].visual
                    firstPlatform.classList.remove('platform')
                    grid.removeChild(firstPlatform)
                    platforms.shift()
                    score++
                    console.log(platforms)
                    let newPlatform = new Platform(600)
                    platforms.push(newPlatform)
                }
            })
        }
    }

    function fall() {
        if (!isJumping) return
        clearInterval(upTimerId)
        isJumping = false
        downTimerId = setInterval(function() {
            doodlerBottomSpace -=12
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace <= 0) {
                gameOver()
            }
            platforms.forEach(platform => {
                if (
                    (doodlerBottomSpace >= platform.bottom) &&
                    (doodlerBottomSpace <= platform.bottom + 15) &&
                    ((doodlerLeftSpace + 60) >= platform.left) &&
                    (doodlerLeftSpace <= (platform.left + 85)) &&
                    !isJumping
                ) {
                    console.log('landed')
                    startPoint = doodlerBottomSpace
                    jump()
                }
            })
        },30)
    }

    function jump() {
        if (isJumping) return
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(function() {
            doodlerBottomSpace  += 20
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace > startPoint + 200 ) {
                fall()
            }
        },30)
    }

    function gameOver() {
        console.log('game over')
        isGameOver = true
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = score
        clearInterval(upTimerId)
        clearInterval(downTimerId)
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
        clearInterval(platformTimerId)
        showStartButton('Play Again')
    }

    function control(e) {
        if (e.key === "ArrowLeft" || e.key === "a") {
            moveLeft()
        } else if (e.key === "ArrowRight" || e.key === "d") {
            moveRight()
        } else if (e.key === "ArrowUp" || e.key === "w") {
            moveStraight()
        }
    }

    function moveLeft() {
        // guard against multiple key presses
        if (isGoingLeft) return
        if (isGoingRight){
            clearInterval(rightTimerId)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimerId = setInterval(function() {
            if (doodlerLeftSpace >= 0) {
                doodlerLeftSpace -= 5
                doodler.style.left = doodlerLeftSpace + 'px'
            } else moveRight()
        },30)
    }

    function moveRight() {
        // guard against multiple key presses
        if (isGoingRight) return
        if (isGoingLeft){
            clearInterval(leftTimerId)
            isGoingLeft = false
        }
        isGoingRight = true
        clearInterval(leftTimerId)
        rightTimerId = setInterval(function() {
            if (doodlerLeftSpace <= 340) {
                doodlerLeftSpace += 5
                doodler.style.left = doodlerLeftSpace + 'px'
            } else moveLeft()
        },30)
    }

    function moveStraight() {
        isGoingLeft = false
        isGoingRight = false
        clearInterval(rightTimerId)
        clearInterval(leftTimerId)
    }

    function start() {
        startPoint = doodlerBottomSpace
        if (!isGameOver) {
            grid.removeChild(startBtn)
            grid.innerText = ''
            createPlatforms()
            createDoodler()
            platformTimerId = setInterval(movePlatforms, 30)
            jump()
            document.addEventListener('keyup', control)
        } else {
            isGameOver = false;
            platforms = []
            score = 0
            start()
        }
    }
    showStartButton('Start')
})