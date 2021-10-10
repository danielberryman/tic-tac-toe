import { Game } from './classes/game.js';
import { Player } from './classes/player.js';
import { Symbol } from './classes/symbol.js';

const x = new Symbol("Xs","img/x.jpeg");
const o = new Symbol("Os","img/o.jpeg");

let turn = 0;
let lastTurn = 9;
let gameIsDone = false;
let gameEndMsg;
let currentGame;
let currentPlayer = null;
let winner;
let newGameForm = document.getElementById('form');
newGameForm.addEventListener('submit', newGame);

function newGame(event) {
    event.preventDefault();
    
    const f = new FormData(newGameForm);
    f.get('player1');
    f.get('player1');
    // create players with names from the inputs
    let p1 = new Player(f.get('player1'), o);
    let p2 = new Player(f.get('player2'), x);

    // create game via the players
    currentGame = new Game(p1,p2);

    // set the current player
    togglePlayer();
    actOnSquares(true);
}

function placeSymbol(event) {
    event.preventDefault();

    console.log(event.target.id);

    // set src attribute of appropriate image tag
    event.target.innerHTML = `<img class="symbol" src="${currentPlayer.symbol.image}">`;
    // event.target.querySelector('img').setAttribute('src', currentPlayer.symbol.image);

    turn++;
    console.log(turn);

    // iterate through combos
    for (let combo of currentGame.combinations) {
        if (event.target.id in combo) {
            combo[event.target.id] = currentPlayer === currentGame.player1 ? 1 : 2;
            let values = Object.values(combo);
            winner = (values[0] === values[1] && values[1] === values[2]) ? currentPlayer : null;
            if (isGameDone()) {
                setGameEndMsg();
                break;
            }
        }
    }

    if (gameIsDone) {
        setTimeout(endGame, 100);
    } else {
        togglePlayer();
    }
}

function togglePlayer() {
    console.log(currentGame);
    if (currentPlayer != null && currentPlayer === currentGame.player1) {
        currentPlayer = currentGame.player2;
    } else {
        currentPlayer = currentGame.player1;
    }
    console.log(currentPlayer);
    document.getElementById('current-player').innerHTML = `Your turn ${currentPlayer.name}.`;
}

function actOnSquares(add) {
    for (let i = 1; i < 10; i++) {
        let element = document.getElementById(`${i}`);

        if (add) {
            element.classList.remove('inactive');
            element.classList.add('active');
            element.addEventListener('click', placeSymbol);
        } else {
            element.classList.remove('active');
            element.classList.add('inactive');
            element.removeEventListener('click', placeSymbol);
            document.getElementById(i).innerHTML = '';
        }
    }
}

function isGameDone() {
    if (winner || turn === lastTurn) {
        gameIsDone = true;
    }
    return gameIsDone;
}

function setGameEndMsg() {
    if (winner) {
        let loser = currentPlayer === currentGame.player1 ? currentGame.player2.name : currentGame.player1.name;
        gameEndMsg = `${currentPlayer.name} wins for the ${currentPlayer.symbol.name}! Congratulations! Better luck next time ${loser} :(`;
    } else {
        gameEndMsg = `It's a tie! You're both just too good at this :)`;
    }
}

function endGame() {
    alert(gameEndMsg);
    turn = 0;
    gameIsDone = false;
    currentGame = null;
    actOnSquares(false);
    document.getElementById('current-player').innerHTML = '';
    // location.reload();
}
