/* == Constantes et variables == */

//Canvas
var canvas    = document.querySelector("canvas");
var context   = canvas.getContext("2d");
canvas.height = 400;
canvas.width  = 400;

let tileCount = 20;
let tileSize = canvas.height / 15;

//Serpent
var snake = [[0, 0], [1 * tileSize, 0*tileSize]];

//Case vide
const EMPTY = "EMPTY";

//Nourriture
var food = [5 * tileSize, 5 * tileSize];

//Direction du serpent
var direction;

//Score du joueur
var score = 0;



//Plateau de jeu
var WORLD = [];




/* == Listener == */
document.addEventListener('keydown', function(key){
    
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
});


/* == Fonctions == */
//Moteur du jeu
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
    buildWorld();
    
    drawFood();
    
    
    if (direction !== undefined){
        moveSnake(direction);
    } else {
        drawSnake();
    }
    checkEat();
    


    setTimeout(step, 500);
}

//Construire le plateau
function buildWorld(){
    let worldDimension = [15, 15];
    let testWorld = [];

    for (let i = 0; i < worldDimension[0]; i++){
        testWorld[i] = [];
    }

    for (let column = 0; column < worldDimension[0]; column++){

        for (let row = 0; row < worldDimension[1]; row++){
            testWorld[column][row] = EMPTY;
            drawCase(row, column);
        }
    }
}

function drawCase(x, y){
    context.fillStyle   = "greenyellow";
    context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);

    context.fillStyle = "black";
    context.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
}


function drawSnake(){
    context.fillStyle="green";
    snake.forEach( function(i){
        context.fillRect(i[0], i[1], tileSize,tileSize);
    });
}


function drawFood(){
    context.fillStyle= "red";
    context.fillRect(food[0], food[1], tileSize,tileSize);
}


function clearScreen(){
    context.fillStyle= "greenyellow";
    context.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
}


function moveSnake(direction){
    let head = snake.slice(-1)[0];
    let newHead = [head[0], head[1]];
    console.log(snake);
    switch(direction){
        case "haut":
            newHead[1] -= tileSize;
            break;

        case "bas":
            newHead[1] += tileSize;
            break;

        case "gauche":
            newHead[0] -= tileSize;
            break;

        case "droite":
            newHead[0] += tileSize;
            break;
    }
    snake.push(newHead);
    snake.shift();

    drawSnake();
}


function checkEat(){
    let head = snake.slice(-1)[0];
    if (head[0] === food[0] && head[1] === food[1]){
        let tail = snake[0];
        console.log("Tail:" + tail);
        snake.unshift(tail);
        console.log("snake:" + snake);
        console.log("Miam !");
    }
}

function checkCollision(){

}


function main(){
    
    buildWorld();
    step();
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