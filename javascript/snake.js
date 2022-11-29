/* == Constantes et variables == */

//Canvas
var canvas    = document.querySelector("canvas");
var context   = canvas.getContext("2d");
canvas.height = 400;
canvas.width  = 400;

let tileCount = 15;
let tileSize = canvas.height / 20;

//Serpent
var snake = [[0, 0]];

//Case vide
const EMPTY = "EMPTY";

//Nourriture
var food = [5 * tileSize, 5 * tileSize];

//Direction du serpent
var direction;

//Score du joueur
var score = 0;

var canChange = true;

//Plateau de jeu
var WORLD = [];
var worldDimension = [20, 20];

var gameOver = false;


var oldTail = [];

/* == Listener == */
document.addEventListener('keydown', function(key){
    
    if (canChange){
        switch(key.code){

            case "ArrowUp":
                if ((direction === "bas" && snake.length < 2) || (direction !== "bas"))
                    direction = "haut";
                break;


            case "ArrowDown":
                if ((direction === "haut" && snake.length < 2) || (direction !== "haut"))
                    direction = "bas";
                break;


            case "ArrowLeft":
                if ((direction === "droite" && snake.length < 2) || (direction !== "droite"))
                    direction = "gauche";
                break;


            case "ArrowRight":
                if ((direction === "gauche" && snake.length < 2) || (direction !== "gauche"))
                    direction = "droite";
                break;


            default:
                break;
        }
    }
    canChange = false;
});



/* == Fonctions == */

/* === MOTEUR DU JEU === */
function step(){
    
    /**
     * 1. Vérifier si l’utilisateur a enfoncé une touche, et modifier la direction du serpent en conséquence (si cela est compatible avec sa direction actuelle).
     * 2. Calculer la nouvelle position de la tête du serpent en fonction de sa direction.
     * 3. Vérifier si la tête du serpent rencontre de la nourriture, un mur, ou un morceau de son corps.
     *  - Dans le premier cas, le score augmente, et une autre nourriture est ajoutée dans une case vide aléatoire.
     *  - Dans les autres cas, la partie se termine.
     * 4. Mettre à jour le tableau SNAKE en faisant avancer le serpent ; s’il a mangé de la nourriture, son corps doit s’allonger 
     *    (ce qui revient à ne pas réduire sa queue). Mettre également à jour le tableau WORLD en conséquence.
     * 5. Effacer intégralement le canvas, et re-dessiner l’état de WORLD. 
     *   (On pourrait envisager de ne redessiner que les parties qui ont changé, mais cette méthode est plus simple et plus évolutive).
     */
    if (!gameOver){
        buildWorld();
        drawFood();
        
        canChange = true;
        if (direction !== undefined){
            moveSnake(direction);
        } else {
            drawSnake();
        }
    }
}


//Construire le plateau
function buildWorld(){

    for (let i = 0; i < worldDimension[0]; i++){
        WORLD[i] = [];
    }

    for (let column = 0; column < worldDimension[0]; column++){

        for (let row = 0; row < worldDimension[1]; row++){
            WORLD[column][row] = EMPTY;
            drawCase(row, column);
        }
    }
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
        context.fillRect(bodyPart[0], bodyPart[1], tileSize, tileSize);
    };
}

function drawFood(){
    context.fillStyle= "red";
    WORLD[food[0]][food[1]] = FOOD;
    context.fillRect(food[0], food[1], tileSize,tileSize);
}


function clearScreen(){
    context.fillStyle= "greenyellow";
    context.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
}



/* === Serpent === */
/*
function startSnake(){
    let head = [];
    let body = snake[0];
    switch(direction){
        case "haut":
            head = [body[0], body[1] - tileSize];
            break;

        case "bas":
            head = [body[0], body[1] + tileSize];
            break;

        case "gauche":
            head = [body[0] - tileSize, body[1]];
            break;

        case "droite":
            head = [body[0] + tileSize, body[1]];
            break;
    }
    snake.push(head);
}
*/

function moveSnake(direction){
    let head = snake.slice(-1)[0];
    let newHead = [head[0], head[1]];

    switch(direction){
        case "haut":
            newHead[1] -= tileSize;
            break;

        case "bas":
            Math.floor(newHead[1] += tileSize);
            break;

        case "gauche":
            Math.floor(newHead[0] -= tileSize);
            break;

        case "droite":
            Math.floor(newHead[0] += tileSize);
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
    food[0] = getRandomInt(0, worldDimension[0]) * tileSize;
    food[1] = getRandomInt(0, worldDimension[0]) * tileSize;
    } while (snake.includes(food[0]) || snake.includes(food[1]));

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
    /*
    if (head[0] === food[0] && head[1] === food[1]){
        let tail = snake[0];
        snake.unshift(tail);
    }
    */
}

function checkCollision(){
    let head = snake.slice(-1)[0];
    let body = snake.slice(0, snake.length - 1);
    let i = 0;
    while (!gameOver && i < body.length){
        bodyPart = body[i];
        gameOver = bodyPart[0] === head[0] && bodyPart[1] === head[1];
        i++;
    }

    if (!gameOver){
        gameOver = (head[0] > (worldDimension[0] - 1) * tileSize 
                || head[1] > (worldDimension[0] - 1) * tileSize
                || head[0] < 0
                || head[1] < 0);
    }
    
    
    if (gameOver){
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
    
    buildWorld();
    setInterval(step, 200);
}


/* === Canvas === */


/*
var gridH = 500;
var gridW = 500;
var dimension = 15;
var caseDimension = gridH / dimension;
var p  = 10;

var cw = gridW + (p*2) + 1;
var ch = gridH + (p*2) + 1;

canvas.height = ch;
canvas.width = cw;

function drawBoard(){
    for (var x = 0; x <= gridW; x += caseDimension) {
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, gridH + p);
    }

    for (var y = 0; y <= gridH; y += caseDimension) {
        context.moveTo(p, 0.5 + y + p);
        context.lineTo(gridW + p, 0.5 + y + p);
    }
    context.strokeStyle = "black";
    context.stroke();
}

drawBoard();
*/


/* === MAIN === */
main();