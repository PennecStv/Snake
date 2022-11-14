/* == Constantes et variables == */
//Plateau de jeu
var world = [];

//Serpent
var snake;


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