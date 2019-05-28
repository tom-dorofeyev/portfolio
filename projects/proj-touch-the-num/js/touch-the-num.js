'use strict'

var isNum = false;

while (!isNum) {
    var numsLength = +prompt('enter number for board size (the numbers square root should be a whole number)');
    if (Math.floor(Math.sqrt(numsLength)) === Math.sqrt(numsLength)) isNum = true;
}

var gNums = [];
gNums = shuffleNums(numsLength);

var elTable = document.querySelector('table');
var elBestTime = document.querySelector('#best-time');
var playAgain = document.querySelector('button');
var numClicked = 0;
var gTimeStamp = 0;
var bestTime = 0;

playAgain.addEventListener('click', function(){alert('you clicked the button')})
renderBoard(generateBoard(gNums));

function generateBoard(nums) {
    var board = []
    var numsIdx = 0;
    for (var i = 0; i < Math.sqrt(numsLength); i++) {
        board[i] = [];
        for (var j = 0; j < Math.sqrt(numsLength); j++) {
            board[i][j] = nums[numsIdx]
            numsIdx++;
        }
    }
    return board;
}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[i].length; j++) {
            strHTML += '<td onclick="checkClick(this)" border="1">' + board[i][j] + '</td>'
        }
        strHTML += '</tr>'
    }
    elTable.innerHTML = strHTML
}

function checkClick(elCell) {
    if (numClicked === 0) gTimeStamp = Date.now();

    if (elCell.innerText === numClicked + 1 + '') {
        // numClicked = parseInt(elCell.innerText);
        numClicked = +elCell.innerText;
        elCell.innerText = 'X';
    }
    if (numClicked === numsLength) {
        var temp = ((Date.now() - gTimeStamp) / 1000)
        alert('it took you ' + temp + ' seconds WELL DONE!');
        if (temp > bestTime) {
            bestTime = temp;
            elBestTime.innerText = 'Best Time ' + bestTime;
        }

    }
}

function shuffleNums(length) {
    var nums = []
    for (var i = 0; i < length; i++) {
        nums[i] = i + 1;
    }
    var isNums = true;
    while (isNums) {
        var getNum = getRndInteger(1, numsLength);
        for (var i = 0; i < nums.length; i++) {
            if (getNum === nums[i]) {
                var temp = nums[i]
                nums.splice(i, 1);
                gNums.push(temp);
            }
        }
        if (!nums[0]) isNums = false;
    }
    return gNums;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}