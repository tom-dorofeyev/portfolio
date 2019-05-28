var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;


function createQuestsTree() {
    if (!localStorage.getItem('tree')) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
        
    } else{
        var currTree = JSON.parse(localStorage.getItem('tree'));
        gQuestsTree = currTree;
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // DONE: update the prev, curr global vars
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];

}

function addGuess(newQuestTxt, newGuessTxt, res) {
    // DONE: Create and Connect the 2 Quests to the quetsions tree
    var newGuess = createQuest(newQuestTxt);

    newGuess.yes = createQuest(newGuessTxt);
    newGuess.no = createQuest(gCurrQuest.txt);
    gPrevQuest[res] = newGuess;
}

function saveTree(tree) {
    var strTree = JSON.stringify(tree);
    localStorage.setItem('tree', strTree);
}


