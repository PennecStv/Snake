/**
 * Fichier JS récupérant les éléments dans le répertoire assets
 */


/* === Images === */
const imgBlock1 = new Image();
imgBlock1.src = './assets/img/grass-texture-1.jpg';

const imgBlock2 = new Image();
imgBlock2.src = './assets/img/grass-texture-2.jpg';

const imgBricks =  new Image();
imgBricks.src = './assets/img/bricks-texture.png';

const imgApple = new Image();
imgApple.src = './assets/img/apple.png';

const imgGoldenApple = new Image();
imgGoldenApple.src = './assets/img/golden-apple.png';

const imgSnakeHeadTop   = new Image();
imgSnakeHeadTop.src = './assets/img/snake-head-top.png';
const imgSnakeHeadBot   = new Image();
imgSnakeHeadBot.src = './assets/img/snake-head-bot.png';
const imgSnakeHeadLeft  = new Image();
imgSnakeHeadLeft.src = './assets/img/snake-head-left.png';
const imgSnakeHeadRight = new Image();
imgSnakeHeadRight.src = './assets/img/snake-head-right.png';


/* == Sons == */
const playlist = [new Audio('./assets/sound/minecraft-music-1.mp3'), new Audio('./assets/sound/minecraft-music-2.mp3'), new Audio('./assets/sound/minecraft-music-3.mp3')];

const clickSound = new Audio('./assets/sound/minecraft-click-sound.mp3');
clickSound.loop = false;

const eatSound = new Audio('./assets/sound/minecraft-eat-sound.mp3');
eatSound.loop = false;

const collisionSound = new Audio('./assets/sound/minecraft-hit-sound.mp3');
collisionSound.loop = false;