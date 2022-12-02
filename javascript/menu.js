/* === Constantes: Éléments HTML === */
const menuModal     = document.getElementById("menu-Modal");

const gameOverModal = document.getElementById("gameOver-Modal");

const easyButton    = document.getElementById("easy");

const mediumButton  = document.getElementById("medium");

const hardButton    = document.getElementById("hard");

const extremeButton = document.getElementById("extreme");

const replayButton  = document.getElementById("replay");

const levelButton   = document.getElementById("change-level");

const musicButton   = document.getElementById("music");

const titre         = document.getElementById("titre");

const message       = document.getElementById("message");

const scoreField1   = document.getElementById("scoreField1");
const scoreField2   = document.getElementById("scoreField2");


const highscore     = document.getElementById("highScore");


//Variable de musique ambiante
var music;


/**
 * Afficher le score sauvegardé
 */
const stockage = window.localStorage;
if (stockage.getItem("Score") === null){
    highscore.textContent = "Meilleur score : " + 0;
} else {
    highscore.textContent = "Meilleur score : " + stockage.getItem("Score");
}



/* === Listener === */
//Niveau facile
easyButton.addEventListener("click", function(){
    clickSound.play();
    menuModal.style.display = "none";
    level = "easy";
    main();
});

//Niveau medium
mediumButton.addEventListener("click", function(){
    clickSound.play();
    menuModal.style.display = "none";
    level = "medium";
    main();
});

//Niveau difficile
hardButton.addEventListener("click", function(){
    clickSound.play();
    menuModal.style.display = "none";
    level = "hard";
    main();
});

//Niveau extrême
extremeButton.addEventListener("click", function(){
    clickSound.play();
    menuModal.style.display = "none";
    level = "extreme";
    main();
});

//Rejouer
replayButton.addEventListener("click", function(){
    gameOverModal.style.display = "none";
    clickSound.play();
    main();
});

//Choisir un niveau
levelButton.addEventListener("click", function(){
    clickSound.play();
    gameOverModal.style.display = "none";
    menuModal.style.display = "block";
});

//Toggle musique
musicButton.addEventListener("click", function(){
    clickSound.cloneNode(true).play();

    if (music == undefined){
        music = playMusic();
    }

    if (musicButton.textContent === "Musique : On"){
        musicButton.textContent = "Musique : Off";
        music.muted = true;
    } else {
        musicButton.textContent = "Musique : On";
        music.muted = false;
        
    }
});