// make setters
function createPlayer(name, color, order) {
    this.name = name;
    this.color = color;
    this.order = order;
    let score = 0;
    const getName = () => name;
    const getColor = () => color;
    const getOrder = () => order;
    const getScore = () => score;
    const setName = (name) => this.name = name;
    const setColor = (color) => this.color = color;
    const upScore = () => score++;
    return { getName, getColor, getOrder, getScore, upScore, setName, setColor };
}

game = (() => {
    let player1 = createPlayer("default1", "red", 1);
    let player2 = createPlayer("default2", "blue", 2);
    let board = (() => {
        const grid = [
            ["", "", "",],
            ["", "", "",],
            ["", "", "",],
        ]
        let whoseTurn = 1;
        let turnCount = 0;
        let playing = true;
        //0 = tie, 1 = 1 win, 2 = 2 win
        let win = 0;
        const getGrid = () => grid;
        const markGrid = (x, y) => {
            if (playing) {
                if (x < 3 && y < 3 && grid[y][x] == "") {
                    turnCount++;
                    if (whoseTurn == 1) {
                        grid[y][x] = "X";
                        document.getElementById(x + "," + y).textContent = grid[y][x];
                        checkGrid(whoseTurn);
                        whoseTurn = 2;
                    } else {
                        grid[y][x] = "O";
                        document.getElementById(x + "," + y).textContent = grid[y][x];
                        checkGrid(whoseTurn);
                        whoseTurn = 1;
                    }
                    log();
                    return;
                } else {
                    log();
                    return "invalid space, make a different move";
                }
            }
            return "game over, start a new game!"
        }
        const checkGrid = (player) => {
            if (turnCount == 9) {
                playing = false;
                win = 0;
                return "tie!";
            }
            let mark = "";
            let nextTurn = 0;
            if (player == 1) {
                mark = "X";
                nextTurn = 2;
            } else {
                mark = "O";
                nextTurn = 1;
            }
            if (grid[1][1] == mark) {
                // check in order, diag, anti diag, row, col
                if (grid[0][0] == mark && grid[2][2] == mark ||
                    grid[2][0] == mark && grid[0][2] == mark ||
                    grid[0][1] == mark && grid[2][1] == mark ||
                    grid[1][0] == mark && grid[1][2] == mark
                ) {
                    win = player;
                }
            }
            // check left col, top and bottom rows
            else if (grid[0][0] == mark && (grid[1][0] == mark && grid[2][0] == mark ||
                grid[0][1] == mark && grid[0][2] == mark) ||
                grid[2][0] == mark && grid[2][1] == mark && grid[2][2] == mark
            ) {
                win = player;
            }
            //check right col
            else if (grid[0][2] == mark && grid[1][2] == mark && grid[2][2] == mark) {
                win = player;
            }
            if (win > 0) {
                playing = false;
                return "player " + player + " won!"
            }
            return "player" + nextTurn + "'s turn";
        }
        const reset = () => {
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    grid[i][j] = "";
                }
            }
            whoseTurn = 1;
            turnCount = 0;
            playing = true;
            win = 0;
        }
        return { getGrid, markGrid, reset };
    })();
    const reset = () => {
        board.reset();
        player1.setName("default1");
        player2.setName("default2");
        player1.setColor("red");
        player2.setColor("blue");
    }
    const getPlayer1 = () => player1;
    const getPlayer2 = () => player2;
    const getBoard = () => board;
    const log = () => console.log(board.getGrid());
    return { getPlayer1, getPlayer2, getBoard, reset };
})();

display = (() => {
    const init = () => {
        grid = document.getElementById("grid");
        let xCount = 0;
        let yCount = 0;
        let title = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];
        for (let i = 1; i < 10; i++) {
            let box = document.createElement("button");
            box.classList.add("box");
            box.id = "" + i;
            // assign x y values to according box
            box.id = xCount + "," + yCount;
            let x = xCount;
            let y = yCount;
            box.addEventListener('click', () => {
                game.getBoard().markGrid(x, y);
            });
            xCount++;
            if (xCount > 2) {
                xCount = 0;
                yCount++;
            }
            box.textContent = title[i - 1];
            grid.appendChild(box);
        }
    }
    const clear = () => {
        set = document.getElementsByClassName(".box");
        for (let box of set) {
            box.textContent = "";
        }
        game.reset();
    }
    return { init, clear }
})();
document.getElementById("start").addEventListener('click', () => { display.clear(); });
display.init(true);