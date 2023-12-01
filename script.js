// Manipular elementos del DOM
const board = document.getElementById('board');
const scoreBoard = document.getElementById('scoreBoard');
const startButton = document.getElementById('start');
const gameOverSign = document.getElementById('gameOver');

// Game settings
const boardSize = 10;
const gameSpeed = 200;
const squareTypes = {
    emptySquare: 0, snakeSquare: 1,
    foodSquare: 2, snakeHeadSquare: 3
};
const directions = {
    ArrowUp: -10, ArrowDown: 10,
    ArrowRight: 1, ArrowLeft: -1
};

// Game variables
let snake;
let score;
let direction;
let boardSquares;
let emptySquares;
let moveInterval;

// Creamos a la serpiente
const drawSnake = () => {
    // Iermaos sobre la información de la serpiente para asignar los nuevos valores dados
    snake.forEach( square => drawSquare(square, 'snakeSquare'));
}



// Dibujamos cada cuadrado
const drawSquare = (square, type) => {
    // Separamos la informaicón de cda cuadrado
    const [ row, colunm ] = square.split('');
    // Asignamos el tipo del cuadrado según la informaicón obtenida al separar la información del cuadrado
    boardSquares[row][colunm] = squareTypes[type];
    // Manipulamos el eleemnto con el id que representa la posición de cada cuadrado
    const squareElement = document.getElementById(square);
    // Asignamos la clase con la informaicón del cuadrado (su posición y su tipo)
    squareElement.setAttribute('class', `square ${type}`);

    // validamos qué tipo de cuadrado se va a crear
    if (type === 'emptySquare') {
        // La posición que deja la serpiente la llenamos con cuadrados vacíos
        emptySquares.push(square);
    } else {
        if (emptySquares.indexOf(square) !== -1) {
            emptySquares.splice(emptySquares.indexOf(square), 1);
        }
    }
};

// Actualiza la dirección de la serpiente
const setDirection = newDirection => {
    direction = newDirection;
}

// 
const moveSnake = () => {
    const newSquare = String(
        Number(snake[snake.length - 1]) + directions[direction])
        // la función padStart rellena con ceros
        .padStart(2, '0');
    // Separamos la información del nuevo cuadrado y lo asignamos a dos variales
    const [row, colunm] = newSquare.split('');

    if( newSquare < 0 ||
        newSquare >= boardSize * boardSize ||
        (direction === 'ArrowRight' && colunm == 0) ||
        (direction === 'ArrowLeft' && colunm == 9) ||
        boardSquares[row][colunm] === squareTypes.snakeSquare) {
        showGameOversign();
    } else {
        snake.push(newSquare);
        if(boardSquares[row][colunm] === squareTypes.foodSquare) {
            addFood();
        } else {
            const emptySquare = snake.shift();
            drawSquare(emptySquare, 'emptySquare');
        }
        drawSnake();
    }
}

const addFood = () => {
    score++;
    updateScore();
    createRandomFood()
}

// Función que muestra el signo de game over y habilitamos el botón de start
const showGameOversign = () => {
    gameOverSign.style.display = 'block';
    clearInterval(moveInterval);
    startButton.disabled = false;
}

// función para indicar la dirección que tomará la serpiente cuando se apriete uno d elos botones de dirección
const directionEvent = event => {
    const key = event.key;
    switch (key) {
        // Se pone una condición para que no vala a la dirección contraria  y se llama a la función setDirection para que actualice la dieción
        case 'ArrowUp':
            direction != 'ArrowDown' && setDirection('ArrowUp');
            break;
        case 'ArrowDown':
            direction != 'ArrowUp' &&  setDirection('ArrowDown');
            break;
        case 'ArrowLeft':
            direction != 'ArrowRight' && setDirection('ArrowLeft');
            break;
        case 'ArrowRight':
            direction != 'ArrowLeft' &&  setDirection('ArrowRight');
            break;
    }
}

// función para crear la comida de la serpiente
const createRandomFood = () => {
    // asignamos un lugar random solo entre los lugares vacíos
    const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    // Asignamos el cuadrado obtenido ela información para volverlo un cuadrado de comida
    drawSquare(randomEmptySquare, 'foodSquare');
}

// Función para actualizar el score del juego
const updateScore = () => {
    scoreBoard.innerText = score;
}

// Cración del tablero
const createBoard = () => {
    // Iteramos sobre el tablero creado en la función setGame()
    boardSquares.forEach( (row, rowIndex) => {
        // Itermaos sobre cada fila (row) que creamos en la primera ieración
        row.forEach((colunm, colunmIndex) => {
            // Identificamos cada cuadrado con el índice de la fila y el de la columna
            const squareValue = `${rowIndex}${colunmIndex}`;
            // Creamos un elemento div que es el que se va a insertar en el tablero
            const squareElement = document.createElement('div');
            //Al elemento creado (squareElement) le asignamos atributos
            squareElement.setAttribute('class', 'square emptySquare');
            squareElement.setAttribute('id', squareValue);
            // Agregamos cada elemento creado al tablero
            board.appendChild(squareElement);
            // Aregamos el valor correspondiente a cada cuadrado
            emptySquares.push(squareValue)
        })
    })
};

const setGame = () => {
    // Configuramoslos valores iniciales (posición) de la serpiente
    snake = ['00', '01', '02', '03'];
    // Largo de la serpiente
    score = snake.length - 4;
    // Dirección inicial de la serpiente
    direction = 'ArrowRight';
    // Creamos el tablero
    boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare))
    // limpiar el tablero
    board.innerHTML = '';
    emptySquares = [];
    // Llamamos a la función para crear el tablero
    createBoard();
}


const startGame = () => {
    // Llamamos a la función setGame() para que cree los valores inicales del juego
    setGame();
    // Ocultamos el mensaje Game Over y desactivamos el botón de start
    gameOverSign.style.display = 'none';
    startButton.disabled = true;
    // Llamaos a la función dreawSnaque(9 paaa crear a la serpiente
    drawSnake();
    // actulizamos la informaión del juego
    updateScore();
    // Llamaos a la función para que se cree la comida de la serpiente
    createRandomFood();
    // Agregamos los eventListener() y llamamos a la función directionEvent para que se aisigne la dirección
    document.addEventListener('keydown', directionEvent);
    // Asignamos la velocidad con la que se va a mover la serpiente
    moveInterval = setInterval(() => moveSnake(), gameSpeed)
}


// Start game
startButton.addEventListener('click', startGame);



