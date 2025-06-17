function createGame(name1, color1, name2, color2) {
    let player1 = createPlayer(name1, color1, 1);
    let player2 = createPlayer(name2, color2, 2);
    let board = createGameBoard();
    let turn = 1;
    const getPlayer1 = () => player1;
    const getPlayer2 = () => player2;
    const getBoard = () => board;
    const log = () => console.log(board.getGrid());
    return { getPlayer1, getPlayer2, getBoard, log };
}

function createGameBoard() {
    const grid = [
        ["", "", "",],
        ["", "", "",],
        ["", "", "",],
    ]
    const getGrid = () => grid;
    const markGrid = (x, y, player) => {
        if (player == 1) {
            grid[y][x] = "X";
        } else {
            grid[y][x] = "O";
        }
        return player;
    }
    return { getGrid, markGrid };
}

function createPlayer(name, color, order) {
    this.name = name;
    this.color = color;
    this.order = order;
    let score = 0;
    const getName = () => name;
    const getColor = () => color;
    const getOrder = () => order;
    const getScore = () => score;
    const upScore = () => score++;
    return { getName, getColor, getOrder, getScore, upScore };
}
let a = createGame("john", "green", "blake", "white");