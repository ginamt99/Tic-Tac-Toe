const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;

const players = [//will need to save player information internally to output end game later
    {
        name: '',
        symbol: 'X'
    },
    {
        name: '',
        symbol: 'O'
    }
];

const playerConfigOverlay = document.getElementById('config-overlay');
const backdrop = document.getElementById('backdrop');
const form = document.querySelector('form');
const errorOutput = document.getElementById('config-error');
const startNewGame = document.getElementById('start-game-btn');
const gameArea = document.getElementById('active-game');
const gameFieldElements =  document.querySelectorAll('#game-board li');
const activePlayerName = document.getElementById('active-player-name');
const gameOverElement = document.getElementById('game-over');
let winnerSpan = document.getElementById('winner');

const editPlayerOneElement = document.getElementById('edit-player-one');
const editPlayerTwoElement = document.getElementById('edit-player-two');
const cancelConfig = document.getElementById('cancel');

editPlayerOneElement.addEventListener('click', openPlayerConfig);
editPlayerTwoElement.addEventListener('click', openPlayerConfig);

cancelConfig.addEventListener('click', closePlayerConfig);
backdrop.addEventListener('click', closePlayerConfig);

form.addEventListener('submit', savePlayerConfig);

startNewGame.addEventListener('click', newBoard);

for (const gameFieldElement of gameFieldElements) {
    gameFieldElement.addEventListener('click', selectGameField);
};