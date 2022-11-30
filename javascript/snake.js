/* == Constantes et variables == */

//Canvas
var canvas    = document.querySelector("canvas");
var context   = canvas.getContext("2d");
canvas.height = 400;
canvas.width  = 400;

let tileSize = canvas.height / 20;

var level = "medium";

//Serpent
var snake = [];
var SNAKE = null;

//Nourriture
var food = [];
var FOOD = null;

var wallList = [];
var WALL = null;

//Case vide
const EMPTY = null;

//Direction du serpent
var direction;

//Score du joueur
var score = 0;

var canChange = true;

//Plateau de jeu
var WORLD = [];

var gameOver = false;

var oldTail = [];

/* == Listener == */
document.addEventListener('keydown', function(key){
    
    if (canChange){
        switch(key.code){

            case "ArrowUp":
                if (direction !== "bas")
                    direction = "haut";
                break;


            case "ArrowDown":
                if (direction !== "haut" && direction !== undefined)
                    direction = "bas";
                break;


            case "ArrowLeft":
                if (direction !== "droite")
                    direction = "gauche";
                break;


            case "ArrowRight":
                if (direction !== "gauche")
                    direction = "droite";
                break;


            default:
                break;
        }
    }
    canChange = false;
});


/* === Récupération des données JSON === */
function loadLevel(level){
    
    jsonFile = "json/" + level + ".json";

    fetch(jsonFile)
    .then(function(response){
        if (response.ok){
            return response.json();
        } else {
            throw ("Error" + response.statuts);
        }
    })

    .then (function(data) {
        worldDimension = data.dimensions;
        tileSize = canvas.height / worldDimension[0];

        snake = data.snake;
        food  = data.food;
        wallList = data.walls;

        setInterval(step, data.delay);
    })

    .catch (function(error){
        console.log(error);
    });
}



/* == Fonctions == */

/* === MOTEUR DU JEU === */
function step(){
    
    if (!gameOver){
        buildWorld(worldDimension);
        
        canChange = true;
        if (direction !== undefined){
            moveSnake(direction);
        } else {
            drawSnake();
        }

        drawFood();
    }
}


//Construire le plateau
function buildWorld(dimension){

    for (let i = 0; i < dimension[0]; i++){
        WORLD[i] = [];
    }

    for (let column = 0; column < dimension[0]; column++){

        for (let row = 0; row < dimension[1]; row++){
            WORLD[column][row] = EMPTY;
            drawCase(row, column);
        }
    }

    drawWall();
}


/* === Drawer === */
function drawCase(x, y){
    context.fillStyle   = "greenyellow";
    context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);

    context.fillStyle = "black";
    context.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
}


function drawSnake(){
    context.fillStyle="green";
    for (let i = 0; i < snake.length; i++){
        let bodyPart = snake[i];
        WORLD[bodyPart[0]][bodyPart[1]] = SNAKE;
        context.fillRect(bodyPart[0] * tileSize, bodyPart[1] * tileSize, tileSize, tileSize);
    };
}

function drawFood(){
    context.fillStyle= "red";
    WORLD[food[0]][food[1]] = FOOD;
    context.fillRect(food[0] * tileSize, food[1] * tileSize, tileSize, tileSize);
}


function drawWall(){
    context.fillStyle= "brown";
    for (let i = 0; i < wallList.length; i++){
        let wall = wallList[i];
        WORLD[wall[0]][wall[1]] = WALL;
        context.fillRect(wall[0] * tileSize, wall[1] * tileSize, tileSize, tileSize);
    };
}



/* === Serpent === */
function moveSnake(direction){
    let head = snake.slice(-1)[0];
    let newHead = [head[0], head[1]];

    switch(direction){
        case "haut":
            newHead[1] -= 1;
            break;

        case "bas":
            newHead[1] += 1;
            break;

        case "gauche":
            newHead[0] -= 1;
            break;

        case "droite":
            newHead[0] += 1;
            break;
    }
    snake.push(newHead);
    oldTail = snake[0];
    snake.shift();
    
    checkCollision();

    checkEat();

    drawSnake();
}



function eatFood(){
    drawCase(food[0], food[1]);

    do {
    food[0] = getRandomInt(0, worldDimension[0]);
    food[1] = getRandomInt(0, worldDimension[0]);
    } while (snake.includes(food[0]) || snake.includes(food[1]) || wallList.includes(food[0]) || wallList.includes(food[1]));

    console.log("Food:" + food);
    snake.unshift(oldTail);
    drawFood();

}




/* === Checker === */
function checkEat(){
    let head = snake.slice(-1)[0];
    console.log(head);
    switch(direction){
        case "haut":
            if (head[0] === food[0] && head[1] === food[1]){
                eatFood();
            }
            break;

        case "bas":
            if (head[0] === food[0] && head[1] === food[1]){
                eatFood();
            }
            break;

        case "gauche":
            if (head[0] === food[0] && head[1] === food[1]){
                eatFood();
            }
            break;

        case "droite":
            if (head[0] === food[0] && head[1] === food[1]){
                eatFood();
            }
            break;
    }
}

function checkCollision(){
    let head = snake.slice(-1)[0];
    let body = snake.slice(0, snake.length - 1);
    console.log("Tete =" + snake);
    console.log("Body =" + body);
    let i = 0;
    while (!gameOver && i < body.length){
        bodyPart = body[i];
        gameOver = (bodyPart[0] === head[0] && bodyPart[1] === head[1]);
        i++;
    }

    let j = 0;
    while (!gameOver && j < wallList.length){
        wall = wallList[j];
        gameOver = (wall[0] === head[0] && wall[1] === head[1]);
        j++;
    }

    if (!gameOver){
        gameOver = (head[0] > (worldDimension[0] - 1) 
                || head[1] > (worldDimension[0] - 1)
                || head[0] < 0
                || head[1] < 0);
    }
    
    
    if (gameOver){
        snake.pop();
        snake.unshift(oldTail);
        console.log("Out of bound!");
    }
}



/* === Utilitaire === */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }


  /* === Main === */
function main(){
    loadLevel(level);
}


/* === Canvas === */



/* === MAIN === */
//main();