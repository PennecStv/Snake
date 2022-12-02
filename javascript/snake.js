/* == Constantes et variables == */

//Canvas
var canvas    = document.querySelector("canvas");
var context   = canvas.getContext("2d");
canvas.height = 500;
canvas.width  = 500;
var tileSize;

//Plateau de jeu
var WORLD = [];

//Niveau
var level;

//Serpent
var snake = [];
const SNAKE = "SNAKE";

//Nourriture
const food = {pos: [],
            foodType: ""};
const FOOD = "FOOD";

//Mur
var wallList = [];
const WALL = "WALL";

//Case vide
const EMPTY = "EMPTY";

//Direction du serpent
var direction;

//Score du joueur
var score = 0;

//Jeu en cours (booléen)
var gameOn;

//Booléen pour savoir si la direction peut changer
var canChange = true;



var gameOver = false;

var oldTail = [];

var victory;


/* === Listener === */
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
        food.pos  = data.food;
        food.foodType = "Apple";
        wallList = data.walls;
        
        //Jeu lancé
        gameOn = setInterval(step, data.delay);
    })

    .catch (function(error){
        console.log(error);
    });
}



/* == Fonctions == */

/**
 * Moteur faisant fonctionner le jeu en temps réel
 */
function step(){
    if (!gameOver){
        buildWorld(worldDimension);
        drawFood();
        canChange = true;
        if (direction !== undefined){
            moveSnake(direction);
        } else {
            drawSnake();
        }
    }
}


/**
 * Construit dessine le plateau WORLD
 * @param {*} dimension 
 */
function buildWorld(dimension){

    for (let i = 0; i < dimension[0]; i++){
        WORLD[i] = [];
    }

    for (let column = 0; column < dimension[0]; column++){

        for (let row = 0; row < dimension[1]; row++){
            WORLD[column][row] = EMPTY;
            if (row%2 === 0 && column%2 === 1 || row%2 === 1 && column%2 == 0){
                drawCase(imgBlock1, row, column);
            } else {
                drawCase(imgBlock2, row, column);
            }
                
        }
    }

    drawWall();
}


/* === Drawer === */
/**
 * Dessine une case
 * @param {*} image 
 * @param {*} x 
 * @param {*} y 
 */
function drawCase(image, x, y){
    //context.fillStyle   = "greenyellow";
    //context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    context.drawImage(image, x * tileSize, y * tileSize, tileSize, tileSize);
}


function drawSnake(){
    context.fillStyle   = "green";
    for (let i = 0; i < snake.length; i++){
        let bodyPart = snake[i];
        WORLD[bodyPart[0]][bodyPart[1]] = SNAKE;
        if (i === snake.length - 1){
            drawHead(bodyPart[0] * tileSize, bodyPart[1] * tileSize, tileSize, tileSize);
        } else {
            context.fillRect(bodyPart[0] * tileSize, bodyPart[1] * tileSize, tileSize, tileSize);
        };
    };
}


function drawHead(x, y, w, h){
    switch(direction){
        case "haut":
            context.drawImage(imgSnakeHeadTop, x, y, w, h);
            break;

        case "bas":
            context.drawImage(imgSnakeHeadBot, x, y, w, h);
            break;

        case "gauche":
            context.drawImage(imgSnakeHeadLeft, x, y, w, h);
            break;

        case "droite":
            context.drawImage(imgSnakeHeadRight, x, y, w, h);
            break;

        default:
            context.drawImage(imgSnakeHeadTop, x, y, w, h);
            break;
    }
}


function drawFood(){
    let imageFood;
    if (food.foodType === "goldenApple"){
        imageFood = imgGoldenApple;
    } else {
        imageFood = imgApple;
    }
    
    WORLD[food.pos[0]][food.pos[1]] = FOOD;
    context.drawImage(imageFood, food.pos[0] * tileSize, food.pos[1] * tileSize, tileSize, tileSize);
}


function drawWall(){
    for (let i = 0; i < wallList.length; i++){
        let wall = wallList[i];
        WORLD[wall[0]][wall[1]] = WALL;
        context.drawImage(imgBricks, wall[0] * tileSize, wall[1] * tileSize, tileSize, tileSize);
        //context.fillRect(wall[0] * tileSize, wall[1] * tileSize, tileSize, tileSize);
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

    
    checkEat();
    
    checkCollision();

    drawSnake();

    checkVictory();
}


function addScore(){
    if (food.foodType === "goldenApple"){
        score += 50;
    } else {
        score += 10;
    }
}


function eatFood(){
    addScore();
    eatSound.play();
    scoreField1.textContent = "Score : " + score;

    if (food.pos[0]%2 === 0 && food.pos[1]%2 === 1 || food.pos[0]%2 === 1 && food.pos[1]%2 == 0){
        drawCase(imgBlock1, food.pos[0], food.pos[1]);
    } else {
        drawCase(imgBlock2, food.pos[0], food.pos[1]);
    }

    do {
        food.pos[0] = getRandomInt(0, worldDimension[0]);
        food.pos[1] = getRandomInt(0, worldDimension[0]);

        console.log(snake.length);
        console.log(snake.length - 1 === worldDimension[0] * worldDimension[1] - wallList.length);
        if (snake.length + 1 === worldDimension[0] * worldDimension[1] - wallList.length){
            console.log("Breaking");
            break;
        }
    } while (contains(snake, food.pos)|| contains(wallList, food.pos)
                    || (oldTail[0] === food.pos[0] && oldTail[1] === food.pos[1]));

    console.log("Food: " + food.pos);
    console.log("Tail: " + oldTail)
    console.log(oldTail[0] === food.pos[0] && oldTail[1] === food.pos[1]);
    snake.unshift(oldTail);
    if (getRandomInt(0, 5) === 4){
        food.foodType = "goldenApple";
    } else {
        food.foodType = "Apple";
    }
    

    drawFood();
}




/* === Checker === */
function checkEat(){
    let head = snake.slice(-1)[0];
    console.log(head);
    switch(direction){
        case "haut":
            if (head[0] === food.pos[0] && head[1] === food.pos[1]){
                eatFood();
            }
            break;

        case "bas":
            if (head[0] === food.pos[0] && head[1] === food.pos[1]){
                eatFood();
            }
            break;

        case "gauche":
            if (head[0] === food.pos[0] && head[1] === food.pos[1]){
                eatFood();
            }
            break;

        case "droite":
            if (head[0] === food.pos[0] && head[1] === food.pos[1]){
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
        collisionSound.play();
        stopGame();
        console.log("Out of bound!");
    }
}


function checkVictory(){
    victory = true;
    let i = 0;
    while (i < WORLD.length && victory){
        j = 0;

        while (j < WORLD[i].length && victory){
            if (WORLD[i][j] === EMPTY || WORLD[i][j] === FOOD)
                victory = false;
            j++;
        }

        i++;
    }
    
    

    if (victory){
        stopGame();
    }
    
}


function stopGame(){
    snake.pop();
    snake.unshift(oldTail);
    clearInterval(gameOn);
    scoreField2.textContent = "Score: "+ score;
    console.log(stockage);
    if (score > stockage.getItem("Score") || stockage.getItem("Score") === null){
        stockage.setItem("Score", score);
        highscore.textContent = "Meilleur score : " + stockage.getItem("Score");
    };

    if (victory){
        titre.textContent = "victoire !";
        message.textContent = "Miam...";
    } else {
        titre.textContent = "ouch...";
        message.textContent = "fin de la partie";
    }

    gameOverModal.style.display = "block";
}

function playMusic(){        
    music = playlist[getRandomInt(0, playlist.length)];
    music.loop = false;
    music.muted = true;
    console.log(music.src);
    music.play();
    music.addEventListener("ended", playMusic);
    return music;
}


/* === Utilitaire === */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }


  function contains(list, element){
    let i = 0;
    isFound = false;

    while (!isFound && i < list.length){
        if (JSON.stringify(list[i]) === JSON.stringify(element)){
            isFound = true;
        }
        i++;  
    }

    return isFound;
  }


  /* === Main === */
function main(){
    gameOver = false;
    direction = undefined;
    scoreField1.textContent = "Score : 0";
    score = 0;
    loadLevel(level);
}


/* === Canvas === */



/* === MAIN === */
//main();
//