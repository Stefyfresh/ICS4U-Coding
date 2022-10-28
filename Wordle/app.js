const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.keyboard-container');
const messageDisplay = document.querySelector('.message-container');

let gameOver = false;
let gameBusy = false;
const wordle = 'SUPER';

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'Enter',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '<<',
];

let currentRow = 0;
let currentTile = 0;

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
];

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex);
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div');
        tileElement.setAttribute('id', `guessRow-${guessRowIndex}-tile-${guessIndex}`);
        tileElement.classList.add('tile');
        rowElement.append(tileElement);
    });

    tileDisplay.append(rowElement);
});

keys.forEach(key => {
    const buttonElement = document.createElement('button');
    if (key == "<<") {
        const fasIcon = document.createElement('i');
        fasIcon.innerHTML = '<i class="fas fa-delete-left"></i>';
        buttonElement.appendChild(fasIcon);
    } else {
        buttonElement.textContent = key;
    }
    buttonElement.setAttribute('id', key);
    buttonElement.addEventListener('click', () => handleClick(key));
    keyboard.append(buttonElement);
});

const handleClick = (letter) => {
    if (gameOver || gameBusy) return;
    if (letter === '<<') {
        console.log('Delete letter');
        deleteLetter();
        return;
    }
    if (letter === 'Enter') {
        console.log('Check row');
        checkRow();
        return;
    }

    addLetter(letter);
};

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`);
        tile.textContent = letter;
        guessRows[currentRow][currentTile] = letter;
        tile.setAttribute('data', letter);
        currentTile++;
    } else {

    }
};

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`);
        tile.textContent = '';
        guessRows[currentRow][currentTile] = '';
        tile.setAttribute('data', '');
    }
};

const checkRow = () => {
    const guess = guessRows[currentRow].join('');
    console.log(`Guess is: ${guess}, Wordle is: ${wordle}`);
    if (currentTile > 4) {
        flipTile();
        if (wordle == guess) {
            showMessage('Magnificent!');
            gameOver = true;
            return;
        } else if (currentRow >= 5) {
            showMessage('Game Over!');
            gameOver = true;
        } else if (currentRow < 5) {
            currentRow++;
            currentTile = 0;
        }
    } else {
        showMessage('Keep Going!');
    }
};

const showMessage = (message) => {
    // messageDisplay.childNodes.forEach(node => {
    //     node.remove();
    // });
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageDisplay.append(messageElement);
    setTimeout(() => {
        messageDisplay.removeChild(messageElement);
    }, 2000);

};

const addColourToKey = (keyLetter, colour) => {
    key = document.querySelector(`#${keyLetter}`);
    key.classList.add(colour);
};

const flipTile = () => {
    const rowTiles = document.querySelector(`#guessRow-${currentRow}`).childNodes;
    let checkWordle = wordle;
    const guess = [];

    gameBusy = true;

    rowTiles.forEach(tile => {
        guess.push({ letter: tile.getAttribute('data'), colour: 'grey-overlay' });
    });

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.colour = 'green-overlay';
            checkWordle = checkWordle.replace(guess.letter, '');
        }
    });

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.colour = 'yellow-overlay';
            checkWordle = checkWordle.replace(guess.letter, '');
        }
    });

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip');
            tile.classList.add(guess[index].colour);
            addColourToKey(guess[index].letter, guess[index].colour);
        }, 500 * index);
    });

    setTimeout(() => {
        gameBusy = false;
    }, 2500);
};

document.addEventListener('keydown', (event) => {
    if (gameOver || gameBusy) return;
    if (event.keyCode > 64 && event.keyCode < 91) {
        addLetter(event.key.toUpperCase());
        // console.log(`Letter pressed: ${event.key}, ${event.keyCode}`);
    } else if (event.key == "Enter") {
        // console.log('Check row');
        checkRow();
        return;
    } else if (event.key === 'Backspace') {
        // console.log('Delete letter');
        deleteLetter();
        return;
    }
});