const canvas = document.getElementById('canvas');
const pen = canvas.getContext('2d');
const cellSize = 40;
// let initial_x = 0;
// let initial_y = 0;
const w = 1200;
const h = 600;
let food = null;
let score = 0;
// pen.fillRect(initial_x, initial_y, cellSize, cellSize);

const snake = {
    // initial length of the snake
    init_len: 5,
    // default direction of the snake
    direction: 'right',
    // cells array contain all the {x,y}
    cells: [],
    createSnake: function() {
        for (let i = 0; i < this.init_len; i++) {
            this.cells.push({
                x: i,
                y: 0
            })

        }
    },

    drawSnake: function() {

        for (let cell of this.cells) {

            pen.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize - 2, cellSize - 2)

        }

    },
    updateSnake: function() {

        // getting the current haed of the snake
        const headX = this.cells[this.cells.length - 1].x;
        const heady = this.cells[this.cells.length - 1].y;
        // Food and snake is colliding
        if (headX === food.x && heady === food.y) {
            food = getRandomFood();
            score++;

        } else {
            // Removing the first cell from all cells
            this.cells.shift();
        }

        let nextX, nextY;
        // getting the coordinates for next cells to be pushed 


        if (this.direction === 'up') {
            nextX = headX;
            nextY = heady - 1;

            if (nextY * cellSize < 0) {
                clearInterval(id);
                pen.fillStyle = "red";
                pen.fillText("Game Over", 50, 100);
            }

        } else if (this.direction === 'down') {
            nextX = headX;
            nextY = heady + 1;

            if (nextY * cellSize >= h) {
                clearInterval(id);
                pen.fillStyle = "red";
                pen.fillText("Game Over", 50, 100);
            }

        } else if (this.direction === 'left') {
            nextX = headX - 1;
            nextY = heady;

            if (nextX * cellSize < 0) {
                clearInterval(id);
                pen.fillStyle = "red";
                pen.fillText("Game Over", 50, 100);
            }


        } else {
            nextX = headX + 1;
            nextY = heady;

            if (nextX * cellSize > w - cellSize) {
                clearInterval(id);
                pen.fillStyle = "red";
                pen.fillText("Game Over", 50, 100);
            }

        }

        //adding new cells at headX +1, and headY + 1 of the cells
        this.cells.push({
            x: nextX,
            y: nextY
        })

    }

}

// Initialize the function

function init() {
    snake.createSnake();

    food = getRandomFood();
    pen.fillText(`Score : ${score}`, 50, 50);

    function keyPressed(e) {
        // console.log(e);
        if (e.key === 'ArrowDown') {
            snake.direction = 'down';
        } else if (e.key === 'ArrowUp') {
            snake.direction = 'up';

        } else if (e.key === 'ArrowLeft') {
            snake.direction = 'left';
        } else {
            snake.direction = 'right';
        }
        // console.log(snake.direction);
    }

    document.addEventListener('keydown', keyPressed);
}

// Draw the function

function draw() {
    pen.clearRect(0, 0, w, h);
    pen.font = '40px sans-serif';
    pen.fillStyle = '#ffe0e9';
    pen.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
    pen.fillStyle = 'yellow';
    pen.fillText(`Score : ${score}`, 50, 50);
    pen.fillStyle = '#f77f00';

    snake.drawSnake();

}

// function for update
function update() {

    snake.updateSnake();
    // initial_x = initial_x + 1 * cellSize;

}

function gameLoop() {

    draw();
    update();
}

function getRandomFood() {
    const foodX = Math.floor(Math.random() * (w - cellSize) / cellSize);
    const foodY = Math.floor(Math.random() * (h - cellSize) / cellSize);

    const food = {
        x: foodX,
        y: foodY
    }

    return food;
}

init();

const id = setInterval(gameLoop, 100)