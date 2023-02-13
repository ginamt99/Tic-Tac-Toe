function resetGameStatus() { //to clear previous game
    activePlayer = 0;
    currentRound = 1;
    gameOverElement.firstElementChild.innerHTML = '<h2>You won, <span id="winner">PLAYER NAME</span>!</h2>';
    gameOverElement.style.display = 'none';

    for (let i = 0; i < 3; i++) { //reset gameData
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
            
        }
    }
    gameFieldElements.textContent = '';
    gameFieldElements.classList.remove('disabled');
}

function newBoard() {
    if (players[0].name === '' || players[1].name === '') {
        alert('Please set custom player names');
        return;
    }

    resetGameStatus();
    
    activePlayerName.textContent = players[activePlayer].name;
    gameArea.style.display = 'block';
};

function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer =1;
    } else {
        activePlayer = 0;
    }
    activePlayerName.textContent = players[activePlayer].name;
}

function selectGameField(event) {
    const selectedField = event.target;

    const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;

    if (gameData[selectedRow][selectedColumn] > 0) {
        return; //so other player can't select a field already assigned to other player
    }

    selectedField.textContent = players[activePlayer].symbol; //players[0] and players[1]
    selectedField.classList.add('disabled'); //block becomes dark and nonclickable


    gameData[selectedRow][selectedColumn] = activePlayer + 1; //first bracket for main array, second for item inside array

    const winnerId = checkGameOver();
    console.log(winnerId);

    if (winnerId !== 0) { //then either someone has won or it is a draw
        endGame(winnerId);
    }

    currentRound++;
    switchPlayer();
}


function checkGameOver() {
    for (let i = 0; i < 3; i++) { //checks rows for equality
    if (gameData[i][0] > 0 && 
        gameData[i][0] === gameData[i][1] && 
        gameData[i][1] === gameData[i][2]) {
        return gameData[i][0];
        }
    }

    for (let i = 0; i < 3; i++) { //checks cols for equality
        if (gameData[0][i] > 0 && 
            gameData[0][i] === gameData[1][i] && 
            gameData[1][i] === gameData[2][i]) {
            return gameData[0][i];
            }
        }

        if (gameData[0][0] > 0 && //diag top L to bottom R
        gameData[0][0] == gameData[1][1] && 
        gameData[1][1] == gameData[2][2]
        ) {
            return gameData[0][0];
        }

        if (gameData[2][0] > 0 && //diag bottom L to top R
        gameData[2][0] == gameData[1][1] && 
        gameData[1][1] == gameData[0][2]
        ) {
            return gameData[2][0];
        }
        if (currentRound === 9) {
            return -1
        }
        return 0;
}

function endGame(winnerId) {
    gameOverElement.style.display = 'block';

    if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name; //winnerId is 1 or 2 in grid, need 0/1 to access player 1 and 2 object values 
    winnerSpan.textContent = winnerName; //changes span element to winner Name
    } else {
        gameOverElement.firstElementChild.textContent = 'It\'s a draw!'
    }
}

