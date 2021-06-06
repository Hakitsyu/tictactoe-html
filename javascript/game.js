import Emitter from "./emitter.js";

class Game extends Emitter {
    constructor() {
        super();
        this.region = [[], [], []];
        this.turn = -1;
    }

    play = (line, column) => {
        if (this.region[line][column] == null) {
            this.region[line][column] = this.turn;
            const win = this.checkWin();

            if (win || this.regionLength() === 9) {
                const turn = this.turn;
                this.end();
                win ? this.emit("end", true, turn) : this.emit("end", false);
            } else {
                this.emit("play", true, this.turn, line, column);
                this.toggleTurn();
            }
        } else
            this.emit("play", false, this.turn, line, column);
    }

    end = () => {
        this.region = [[], [], []];
        this.turn = -1;
    }

    checkWin = () => {
        if (this.regionLength() < 5)
            return false;
        
        const checkLines = () => {
            let result = false;
            for (let i = 0; i < this.region.length; i++) {
                let sum = 0;
                for (let j = 0; j < this.region[i].length; j++)
                    sum+= this.region[i][j];

                if (sum === -3 || sum === 3)
                    result = true;
            }

            return result;
        }

        const checkColumns = () => {
            let result = false;
            for (let i = 0; i < this.region.length; i++) {
                let sum = 0;
                for (let j = 0; j < this.region.length; j++)
                    sum+= this.region[j][i];

                if (sum === -3 || sum === 3)
                    result = true;
            }

            return result;
        }

        const checkHorizontals = () => {
            let result = false;
            for (let i = 0; i < 2; i++) {
                let sum = 0;
                if (i === 0) {
                    for (let j = 0; j < this.region.length; j++)
                        sum+= this.region[j][j];
                } else {
                    for (let j = 0; j < 3; j++) {
                        const k = j === 2 || j === 0 ? Math.abs(j - 2) : 1;
                        sum+= this.region[j][k];
                    }
                }

                if (sum === -3 || sum === 3)
                    result = true;
            }
            return result;
        }

        return checkLines() || checkColumns() || checkHorizontals() ? true : false;
    }

    toggleTurn = () => this.turn = this.turn === -1 ? 1 : -1;

    regionLength = () => this.region[0].filter(elem => elem != null).length + this.region[1].filter(elem => elem != null).length + this.region[2].filter(elem => elem != null).length;
}

export default Game;