export class Game {
    player1;
    player2;
    combinations = [
        { 1: 0, 2: 0, 3: 0 },
        { 4: 0, 5: 0, 6: 0 },
        { 7: 0, 8: 0, 9: 0 },
        { 1: 0, 5: 0, 9: 0 },
        { 7: 0, 5: 0, 3: 0 },
        { 1: 0, 4: 0, 7: 0 },
        { 2: 0, 5: 0, 8: 0 },
        { 3: 0, 6: 0, 9: 0 },
    ];

    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }

    get player1() {
        return this.player1;
    }

    get player2() {
        return this.player2;
    }

    get combinations() {
        return this.combinations;
    }
}
