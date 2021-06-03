import Game from './game.js';
import drawer from './drawer.js';

const canvas = document.getElementById('root');
const context = canvas.getContext('2d');
const drawerInstance = drawer(context);
let game = null;

// Canvas Properties
const width = 500;
const height = 500;
const padding = 10;
canvas.width = width;
canvas.height = height;

const drawVertical = () => {
    for (let i = 0; i < 2; i++) {
        const x = (width / 3) * (i + 1);
        drawerInstance.line(x, 0 + padding, x, height - padding);
    }
}

const drawHorizontal = () => {
    for (let i = 0; i < 2; i++) {
        const y = (height / 3) * (i + 1);
        drawerInstance.line(0 + padding, y, width - padding, y);
    }
}

const onWin = () => {
    game.end();
    
    context.clearRect(0, 0, width, height);
    drawHorizontal();
    drawVertical();
}

const onClickCanvas = (event) => {
    const line = Math.trunc(event.offsetY / (height / 3));
    const column = Math.trunc(event.offsetX / (width / 3));
    const boxSize = width / 3;
    const boxFromX = column * boxSize;
    const boxFromY = line * boxSize;

    game.play(line, column, (success, turn) => {
        if (success) {
            turn === -1
                ? drawerInstance.x(boxSize, boxFromX, boxFromY, 60)
                : drawerInstance.circle(line, column, boxSize, boxFromX, boxFromY, 'white');
        }
    });
    
    if (game.checkWin())
        onWin();
}

const startGame = () => {
    game = new Game();
}

drawVertical();
drawHorizontal();
startGame();

canvas.addEventListener('click', onClickCanvas);