class Game {
    /* 
        turn (-1 - X, 1 - O)
    */
    constructor() {
        this.region = [[], [], []];
        this.turn = -1;
    }

    play = (line, column, callback) => {
        if (this.region[line][column] == null) {
            this.region[line][column] = this.turn;

            callback(true, this.turn);
            this.toggleTurn();
            return;
        }
        
        callback(false, this.turn);
    }

    end = () => {
        this.turn = -1;
        this.region = [[], [], []];
    }

    toggleTurn = () => this.turn = this.turn === -1 ? 1 : -1;
    
    totalLenght = () => this.region[0].filter(element => element != null).length + this.region[1].filter(element => element != null).length + this.region[2].filter(element => element != null).length;

    checkWin = () => {
        if (this.totalLenght() >= 5) {
            if (this.totalLenght() === 9)
                return true;

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

        return false;
    }
}

export default Game;
