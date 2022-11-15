/* == Constantes et variables == */

//Serpent
var snake;

//Case vide
const EMPTY = "EMPTY";

//Nourriture
var food;

//Direction du serpent
var direction;

//Score du joueur
var score = 0;


//Plateau de jeu
var WORLD = [ 
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    ];




/* == Listener == */
document.addEventListener('keydown', function(key){
    
    switch(key.code){

        case "ArrowUp":
            console.log("Up Arrow!");
            break;


        case "ArrowDown":
            console.log("Down Arrow!");
            break;


        case "ArrowLeft":
            console.log("Left Arrow!");
            break;


        case "ArrowRight":
            console.log("Right Arrow!");
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

    setInterval(step, 500);
}

//Construire le plateau
function buildWorld(){
    let worldDimension = [5, 5];
    let testWorld = [];

    for (let i = 0; i < worldDimension[0]; i++){
        testWorld[i] = [];
    }

    for (let column = 0; column < worldDimension[0]; column++){

        for (let row = 0; row < worldDimension[1]; row++){
            testWorld[column][row] = EMPTY;
        }
    }
}

function main(){

buildWorld();

}




/* === MAIN === */
main();