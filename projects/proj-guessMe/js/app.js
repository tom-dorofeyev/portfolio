'use strict';

var gLastRes = null;

$('.game-start button').click(onStartGuessing);

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing(el) {
    // DONE: hide the game-start section
    $('.game-start').hide();
    renderQuest();
    // DONE: show the quest section
    $('.quest').show();
}

function renderQuest() {
    // DONE: select the <h2> inside quest and update its text by the currQuest text
    $('.quest h2').text(gCurrQuest.txt);

}

function onUserResponse(res) {

    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            alert('Yes, I knew it!');
            // TODO: improve UX
        } else {
            // DONE: hide and show new-quest section
            $('.quest').hide();
            $('.new-quest').show();
        }
    } else {
        // DONE: update the lastRes global var
        gLastRes = res;
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    // DONE: Get the inputs' values
    var newGuess = $('#newGuess').val();
    var newQuest = $('#newQuest').val();
    // DONE: Call the service addGuess

    addGuess(newQuest, newGuess, gLastRes);
    
    onRestartGame();
}


function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    saveTree(gQuestsTree);
    createQuestsTree();
}

