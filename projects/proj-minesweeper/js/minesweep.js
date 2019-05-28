const MINE = '&#128163;'
const FLAG = '&#9971;'

var restartButton = document.querySelector('.restart');
var elTimer = document.querySelector('.timer');
var elIsWinMessage = document.querySelector('h2');
var table = document.querySelector('tbody');

var gBoard = [];
var gBoardSize = 4;
var gNumberOfMines = 2;
var gTimerInterval;
var gIsTimer = false;
var isFirstCell = true;
var isFaceSuprised = false;

table.addEventListener('mousedown', clickedAnimation);
table.addEventListener('mouseup', clickedAnimation);
restartButton.addEventListener('click', init);

function clickedAnimation() {
    if (!gIsTimer) return;
    if (isFaceSuprised) {
        restartButton.innerHTML = '<input type="image" src="img/happy.png" / class="restart">'
    } else {
        restartButton.innerHTML = '<input type="image" src="img/clicking.png" / class="restart">'
    }
    isFaceSuprised = !isFaceSuprised;
}

function init() {
    if (!isFirstCell) isFirstCell = true;
    elTimer.innerText = 00 + ''
    elIsWinMessage.innerText = '';
    gBoard = [];
    generateBoard(gBoard);
    renderBoard(gBoard);
    restartButton.innerHTML = '<input type="image" src="img/happy.png" / class="restart">'
    clearInterval(gTimerInterval);
    gIsTimer = false;
}

function timer() {
    var currCount = +elTimer.innerText
    currCount++
    elTimer.innerText = currCount + '';
}

function setLevel(elLevel) {
    gBoardSize = +elLevel.value;
    gNumberOfMines = gBoardSize;
    if (gBoardSize === 8) {
        gNumberOfMines = 12
    } else if (gBoardSize === 12) {
        gNumberOfMines = 30
    } else {
        gNumberOfMines = 2
    }

    restartButton.innerHTML = '<input type="image" src="img/happy.png" / class="restart">'
    init();
}

function aroundClickedCell(cellClicked, board) {
    
    for (var i = cellClicked.rowIdx - 1; i <= cellClicked.rowIdx + 1; i++) {
        if (i < 0 || i >= gBoardSize) { continue; }
        for (var j = cellClicked.colIdx - 1; j <= cellClicked.colIdx + 1; j++) {
            if (j < 0 || j >= gBoardSize) { continue; }
            board[i][j].isShown = true;
        }
    }
    return gBoard;
}

function cellClicked(elCell) {

    if (!gIsTimer) gTimerInterval = setInterval(timer, 1000);
    gIsTimer = true;
    var elCellClass = elCell.className;
    var coord = getCellCoord(elCellClass);

    var currPosition = gBoard[coord.i][coord.j];
    currPosition.isShown = true;

    if (currPosition.isMarked) return;

    if (isFirstCell) {
        isFirstCell = false;
        aroundClickedCell(currPosition, gBoard);
        generateMines(gNumberOfMines, gBoard, currPosition);
        renderFirstClicked(gBoard);
    }

    if (currPosition.isShown)   elCell.style.background = 'white';

    if (currPosition.isMine) {
        gameOver(gBoard);
        elCell.style.background = 'red';

    } else if (!currPosition.isMine) {
        minesAroundCell(coord.i, coord.j);
        renderCell(coord, currPosition.minesAroundCount);
    }
    isGameOver(gBoard)

    if (!currPosition.minesAroundCount && !currPosition.isMine) {
        // Iterate over close square
        for (var i = currPosition.rowIdx - 1; i <= currPosition.rowIdx + 1; i++) {
            if (i < 0 || i >= gBoardSize) { continue; }
            for (var j = currPosition.colIdx - 1; j <= currPosition.colIdx + 1; j++) {
                if (j < 0 || j >= gBoardSize) { continue; }

                var currCell = gBoard[i][j];
                if (currCell.isMine) 
                    continue;

                if (currCell.isShown)
                    continue;


                var cellClass = getClassName({ i: i, j: j });
    
                var elCell = document.querySelector('.' + cellClass);
                cellClicked(elCell);
            }
        }
    }
}

function isGameOver(board) {
    var shownCount = 0;
    
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].isShown) {
                shownCount++
            }
        }
    }
    if (shownCount === gBoardSize * gBoardSize - gNumberOfMines) {
        restartButton.innerHTML = '<input type="image" src="img/cool.png" / class="restart">'
        clearInterval(gTimerInterval);
        gIsTimer = false;
        return true;
    }
}

function flag(elCell) {
    var elCellClass = elCell.className;
    var coord = getCellCoord(elCellClass);
    var currPosition = gBoard[coord.i][coord.j];

    if (currPosition.isMarked) {
        currPosition.isMarked = false;
        elCell.innerHTML = '';
    } else {
        currPosition.isMarked = true;
        elCell.innerHTML = FLAG;
    }

}

function getCellCoord(strCellClass) {
    var parts = strCellClass.split('-')
    var coord = { i: +parts[1], j: +parts[2] };
    return coord;
}

function generateMines(minesNum, board) {
    for (var i = 0; i < minesNum; i++) {
        var mineRowIndex = getRandomInteger(0, board.length);
        var mineColIndex = getRandomInteger(0, board.length);

        if (!board[mineRowIndex][mineColIndex].isMine &&
            !board[mineRowIndex][mineColIndex].isShown) {
            board[mineRowIndex][mineColIndex] =
                new cell(0, false, true, false, mineRowIndex, mineColIndex);
        } else {
            i--
            continue;
        }
    }
}

function generateBoard(board) {

    for (var i = 0; i < gBoardSize; i++) {
        board[i] = []
        for (var j = 0; j < gBoardSize; j++) {

            // cell(minesAroundCount, isShown, isMine, isMarked , rowIdx, colIdx)
            board[i][j] = new cell(0, false, false, false, i, j);
        }
    }
    return board;
}

function minesAroundCell(rowIdx, colIdx) {

    var currPosition = gBoard[rowIdx][colIdx];
    var minesCount = 0;

    for (var i = rowIdx - 1; i <= rowIdx + 1 && i < gBoardSize; i++) {
        if (i < 0) { continue; }
        for (var j = colIdx - 1; j <= colIdx + 1 && j < gBoardSize; j++) {
            if (j < 0) { continue; }
            if (gBoard[i][j] === currPosition) { continue; }
            if (gBoard[i][j].isMine) {
                minesCount++
            }
        }
    }
    currPosition.minesAroundCount = minesCount;
    return minesCount;
}

function renderFirstClicked(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            var cellClass = getClassName({ i: i, j: j });

            if (currCell.isShown) {
                var elCell = document.querySelector('.' + cellClass);
                cellClicked(elCell);
            }
        }

    }
}

function renderBoard(board) {
    var elBoard = document.querySelector('.board');
    var strHTML = '';

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var cellClass = getClassName({ i: i, j: j });

            strHTML += '<td class="cell ' + cellClass +
                '" onclick="cellClicked(this)" oncontextmenu="flag(this)">';
        }
        strHTML += '</tr>\n';
    }
    elBoard.innerHTML = strHTML;
}

function gameOver(board) {
    var elBoard = document.querySelector('.board');
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];

            var cellClass = getClassName({ i: i, j: j });
            if (currCell.isMine) {
                strHTML += '<td style="background-color:red;" class="game-over ' + '"border="1" onclick="cellClicked(this)" oncontextmenu="flag(this)">' + MINE;
            } else {
                var minesAroundCount = minesAroundCell(i, j)
                strHTML += '<td class="game-over ' +
                '"border="1" onclick="cellClicked(this)" oncontextmenu="flag(this)">' + minesAroundCount;
            }

            strHTML += '</td>';
        }
        strHTML += '</tr>\n';
    }
    elBoard.innerHTML = strHTML;
    restartButton.innerHTML = '<input type="image" src="img/dead.png" / class="restart">';
    clearInterval(gTimerInterval);
    gIsTimer = false;
}

function cell(minesAroundCount, isShown, isMine, isMarked, rowIdx, colIdx) {
    this.minesAroundCount = minesAroundCount,
    this.isShown = isShown,
    this.isMine = isMine,
    this.isMarked = isMarked
    this.rowIdx = rowIdx,
    this.colIdx = colIdx
}

function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    if (value !== 0) {
        elCell.innerHTML = value;
    }
}

function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}