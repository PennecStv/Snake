const menuModal     = document.getElementById("menu-Modal");

const gameOverModal = document.getElementById("gameOver-Modal");

const easyButton    = document.getElementById("easy");

const mediumButton  = document.getElementById("medium");

const hardButton    = document.getElementById("hard");

const extremeButton = document.getElementById("extreme");

const replayButton  = document.getElementById("replay");

const levelButton   = document.getElementById("change-level");


easyButton.addEventListener("click", function(){
    menuModal.style.display = "none";
    level = "easy";
    main();
});


mediumButton.addEventListener("click", function(){
    menuModal.style.display = "none";
    level = "medium";
    main();
});


hardButton.addEventListener("click", function(){
    menuModal.style.display = "none";
    level = "hard";
    main();
});


extremeButton.addEventListener("click", function(){
    menuModal.style.display = "none";
    level = "extreme";
    main();
});


replayButton.addEventListener("click", function(){
    gameOverModal.style.display = "none";
    main();
});


levelButton.addEventListener("click", function(){
    gameOverModal.style.display = "none";
    menuModal.style.display = "block";
    //clearGame();
});