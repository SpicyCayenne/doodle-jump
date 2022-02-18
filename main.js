const game = new Game(5)
const gameArea = document.querySelector(".gameArea")
const startBtn = document.createElement("button")
let hTimerId;
startBtn.innerText = 'Start'
startBtn.setAttribute('id', 'start')
startBtn.addEventListener('click', function() {start()})
gameArea.appendChild(startBtn)
window.addEventListener('keydown', (e) => moveDoodler(e))
window.addEventListener('keyup', (e) => stopMovement(e))

function drawPlatforms() {
    game.platforms.forEach(platform => {
        const visual = document.createElement('div')
        visual.classList.add('platform')
        visual.style.left = platform.leftPos + 'px'
        visual.style.bottom = platform.bottomPos + 'px'
        visual.style.width = platform.width + 'px'
        gameArea.appendChild(visual)
    })
}

function drawDoodler() {
    const doodlerEl = document.createElement('div')
    doodlerEl.classList.add('doodler')
    doodlerEl.style.bottom = game.doodler.bottomPos + 'px'
    doodlerEl.style.width = game.doodler.width + 'px'
    game.doodler.leftPos = game.platforms[0].leftPos + (game.platforms[0].width/2) - (game.doodler.width/2)
    doodlerEl.style.left =  game.doodler.leftPos + 'px' //to ensure the doodler is centered on the platform
    gameArea.appendChild(doodlerEl)
}

function updateDoodler() {
    const doodler = document.querySelector('.doodler')
    doodler.style.bottom = Math.min(game.doodler.bottomPos, game.gameHeight-20) + 'px'
    doodler.style.left = game.doodler.leftPos + 'px'
}

function moveDoodler(e) {

    if (e.key == 'a') {
        if (game.doodler.currentDir == 'left') return
        clearInterval(hTimerId)
        hTimerId = setInterval(function() {game.doodler.move('left')},30)}
    if (e.key == 'd') {
        if (game.doodler.currentDir == 'right') return
        clearInterval(hTimerId)
        hTimerId = setInterval(function() {game.doodler.move('right')},30)}
}

function stopMovement() {
    clearInterval(hTimerId);
    game.doodler.currentDir = null;
}

function checkGameOver() {
    if (!game.gameOver()) return
    clearInterval(gameTimerId)
    console.log('game over!')
}

function start() {
    game.startGame()
    drawPlatforms();
    drawDoodler();
    gameTimerId = setInterval(function() {
        game.doodler.fall()
        game.checkCollision()
        game.movePlatforms()
        updateDoodler()
        checkGameOver()
    },30)
}