export class Game {
    player1;
    player2;

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
}
