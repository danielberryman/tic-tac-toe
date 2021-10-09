import { Game } from './classes/game.js';
import { Player } from './classes/player.js';
import { Symbol } from './classes/symbol.js';

const x = new Symbol("Xs","img/x.jpeg");
const o = new Symbol("Os","img/o.jpeg");

let combinations = [
    { 1: 0, 2: 0, 3: 0 },
    { 4: 0, 5: 0, 6: 0 },
    { 7: 0, 8: 0, 9: 0 },
    { 1: 0, 5: 0, 9: 0 },
    { 7: 0, 5: 0, 3: 0 },
    { 1: 0, 4: 0, 7: 0 },
    { 2: 0, 5: 0, 8: 0 },
    { 3: 0, 6: 0, 9: 0 },
];
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

    // iterate through combos
    for (let combo of combinations) {
        if (event.target.id in combo) {
            combo[event.target.id] = currentPlayer === currentGame.player1 ? 1 : 2;
            let values = Object.values(combo);
            winner = (values[0] === values[1] && values[1] === values[2]) ? currentPlayer : null;
            if (winner) break;
        }
    }

    if (winner) {
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
        if (add) {
            document.getElementById(`${i}`).addEventListener('click', placeSymbol);
        } else {
            document.getElementById(`${i}`).removeEventListener('click');
        }
    }
}

function endGame() {
    let loser = currentPlayer === currentGame.player1 ? currentGame.player2.name : currentGame.player1.name;
    alert(`${currentPlayer.name} wins for the ${currentPlayer.symbol.name}! Congratulations! Better luck next time ${loser} :(`);
    location.reload();
}

const p1 = new Player("Daniel", x);
const p2 = new Player("Grace", o);

const game = new Game(p1, p2);

console.log(game.player1.name);
console.log(game.player2.name);
console.log(game.player2.symbol.name);