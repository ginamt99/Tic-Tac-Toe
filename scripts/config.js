function openPlayerConfig(event) {
    const selectedPlayerId = +event.target.dataset.playerid; //either '1' or '2' so + converts it to number
    editedPlayer = selectedPlayerId
    playerConfigOverlay.style.display = 'block';
    backdrop.style.display = 'block';
}

function closePlayerConfig() {
    playerConfigOverlay.style.display = 'none';
    backdrop.style.display = 'none';
    form.firstElementChild.classList.remove('error');
    errorOutput.textContent = ''; //clears error message on reset
    form.firstElementChild.lastElementChild.value = '';
}

function savePlayerConfig(event) {
    event.preventDefault(); /*prevents browser default behavior - now event won't reload page*/
    const formData = new FormData(event.target); /*JS will analyze form and look for inputs */
    const enteredPlayerName = formData.get('playername').trim(); // get() retrieves value from our input, trim() eliminates white space behind and after input 
    //=> now you can identify empty strings in input as invalid input
    if (!enteredPlayerName) {
        errorOutput.textContent = 'Error: Please enter a valid name';
        event.target.firstElementChild.classList.add('error');
        return; // stops function execution if the user entered something invalid
    }

    const updatedPlayerData = document.getElementById('player-' + editedPlayer + '-data'); //either player-1-data or player-2-data
    updatedPlayerData.children[1].textContent = enteredPlayerName;

    players[editedPlayer - 1].name = enteredPlayerName;
    
    closePlayerConfig(); //manually closes overlay once input is saved
}   



