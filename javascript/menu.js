const modal = document.getElementById("Menu-Modal");

const easyButton = document.getElementById("easy");

const mediumButton = document.getElementById("medium");

const hardButton = document.getElementById("hard");

const extremeButton = document.getElementById("extreme");


easyButton.addEventListener("click", function(){
    modal.style.display = "none";
    level = "easy";
    main();
});


mediumButton.addEventListener("click", function(){
    modal.style.display = "none";
    level = "medium";
    main();
});


hardButton.addEventListener("click", function(){
    modal.style.display = "none";
    level = "hard";
    main();
});


extremeButton.addEventListener("click", function(){
    modal.style.display = "none";
    level = "extreme";
    main();
});