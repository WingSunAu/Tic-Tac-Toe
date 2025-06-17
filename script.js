function createGame(name1, color1, mark1, name2, color2, mark2) {
    let player1 = createPlayer(name1, color1, mark1);
    let player2 = createPlayer(name2, color2, mark2);
    let board = createGameBoard();
    let turn = 1;
    let running = true;
    const log = console.log(board.getGrid());
    return {};
}

function createGameBoard() {
    const grid = [
        ["", "", "",],
        ["", "", "",],
        ["", "", "",],
    ]
    const getGrid = () => grid;
    const markGrid = (x, y, mark, order) => {
        grid[y][x] = mark;
        return order;
    }
    return { getGrid, markGrid };
}

function createPlayer(name, color, mark, order) {
    this.name = name;
    this.color = color;
    this.mark = mark;
    this.order = order;
    let score = 0;
    const getName = () => name;
    const getColor = () => color;
    const getMark = () => mark;
    const getOrder = () => order;
    const getScore = () => score;
    const upScore = () => score++;
    return { getName, getColor, getMark, getOrder, getScore, upScore };
}
let a = createGame();