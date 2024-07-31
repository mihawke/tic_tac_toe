//Initializing gameboard
const Gameboard = {
    board: [['', '', ''], ['', '', ''], ['', '', '']],
}


const boardContainer = document.querySelector(".container");
const logsContainer = document.querySelector(".logs");
logsContainer.innerHTML = "Press start to play"


//game IIEF containing game functions
const game = (function () {
    const start = () => {
        boardContainer.innerHTML = ''
        gameController.displayController(Gameboard)
        const button = document.querySelectorAll(".container button")
        button.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                let choice;
                if (game.setPlayer == "player1") {
                    choice = "x"
                }
                else if (game.setPlayer == "player2") {
                    choice = "o"
                }
                else {
                    choice = ""
                }
                btn.textContent = choice;
                if (btn.innerHTML == "x") {
                    btn.classList.remove(`choice-o`)
                    btn.classList.add(`choice-x`)
                }
                else if (btn.innerHTML == "o") {
                    btn.classList.remove(`choice-x`)
                    btn.classList.add(`choice-o`)
                }
                const btnIndex = gameController.getIndex(index);
                Gameboard.board[btnIndex[0]][btnIndex[1]] = choice
                gameController.checkWinner(Gameboard)
            })
        })
        logsContainer.innerHTML = "Select Player"
    };
    const reset = () => {
        // Reset the board state
        Gameboard.board = [['', '', ''], ['', '', ''], ['', '', '']];

        // Clear the UI
        boardContainer.innerHTML = ''
    };
    const end = () => {
        // Reset the board state
        Gameboard.board = [['', '', ''], ['', '', ''], ['', '', '']];

        // Clear the UI
        boardContainer.innerHTML = ''

    };
    let setPlayer;
    return { start, end, reset, setPlayer }
})();

const gameController = (function () {

    const displayController = (gameboard) => {
        gameboard.board.forEach((boardrow) => {
            boardrow.forEach((grid) => {
                const button = document.createElement("button")
                boardContainer.appendChild(button)
            })
        })
    };
    const getIndex = (item) => {
        switch (item) {
            case 0:
                return [0, 0]
                break;
            case 1:
                return [0, 1]
                break;
            case 2:
                return [0, 2]
                break;
            case 3:
                return [1, 0]
                break;
            case 4:
                return [1, 1]
                break;
            case 5:
                return [1, 2]
                break;
            case 6:
                return [2, 0]
                break;
            case 7:
                return [2, 1]
                break;
            case 8:
                return [2, 2]
                break;

            default:
                break;
        }
    };
    const checkWinner = (gameboard) => {
        const board = gameboard.board

        //check rows
        for (let row = 0; row < 3; row++) {
            if (board[row][0] != "" &&
                board[row][0] == board[row][1] &&
                board[row][0] == board[row][2] &&
                board[row][1] == board[row][2]
            ) {
                game.end()
                logsContainer.innerHTML = `Victory in row ${row + 1}. ${game.setPlayer} wins! Press start to play again.`
            }
        }

        //check columns
        for (let column = 0; column < 3; column++) {
            if (board[0][column] != "" &&
                board[0][column] == board[1][column] &&
                board[0][column] == board[2][column] &&
                board[2][column] == board[1][column]
            ) {
                game.end()
                logsContainer.innerHTML = `Victory in column ${column + 1}. ${game.setPlayer} wins! Press start to play again.`
            }
        }

        //check diagonal
        if (board[0][0] != "" &&
            board[0][0] == board[1][1] &&
            board[0][0] == board[2][2] &&
            board[2][2] == board[1][1]
        ) {
            game.end()
            logsContainer.innerHTML = `Victory in diagonal. ${game.setPlayer} wins! Press start to play again.`
        }
        else if (board[0][2] != "" &&
            board[0][2] == board[1][1] &&
            board[0][2] == board[2][0] &&
            board[2][0] == board[1][1]
        ) {
            game.end()
            logsContainer.innerHTML = `Victory in diagonal. ${game.setPlayer} wins! Press start to play again.`
        }
    }
    return { getIndex, checkWinner, displayController }
})();

const player = (function () {
    const player1 = () => {
        return "player1";
    };
    const player2 = () => {
        return "player2";
    };
    return { player1, player2 }
})();




document.addEventListener("DOMContentLoaded", () => {

    const player1Btn = document.querySelector(".player1")
    player1Btn.addEventListener("click", () => {
        game.setPlayer = player.player1()
        logsContainer.innerHTML = "Player1 playing"
    })

    const player2Btn = document.querySelector(".player2")
    player2Btn.addEventListener("click", () => {
        game.setPlayer = player.player2()
        logsContainer.innerHTML = "Player2 playing"
    })

    const startBtn = document.querySelector(".start")
    startBtn.addEventListener("click", () => {
        game.setPlayer = '';
        game.start()
    })

    const resetBtn = document.querySelector(".reset")
    resetBtn.addEventListener("click", () => {
        game.setPlayer = '';
        game.reset()
        logsContainer.innerHTML = "Press start to play"
    })

})