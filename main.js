// select the start game button
document.querySelector(".control-buttons span").onclick = function () {

    // prompt window to ask for name
    let yourName = prompt("Whats Your Name ?");

    // if name is empty
    if (yourName == null || yourName == "") {

        // set name to unknown
        document.querySelector(".name span").innerHTML = "Unknown";

        // name is not empty
    } else {

        // set name to your name
        document.querySelector(".name span").innerHTML = yourName;

    }

    // remove splash screen
    document.querySelector(".control-buttons").remove();
};

let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()]; // ... : to convert the values to keys as an array;

shuffle(orderRange);

// add order css property to game blocks
blocks.forEach((block, index) => {

    block.style.order = orderRange[index]; // set a new property on block it's contain index;

    // add click event
    block.addEventListener('click', function () {

        // trigger the flip block function
        flipBlock(block); // when you click on it add block parametre to flipBlock function;
        document.getElementById("mouse-click").play();
    });
});

// Flip block function
function flipBlock(selectedBlock) {

    // Add class is-flipped
    selectedBlock.classList.add("is-flipped");

    // collect all flipped cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // if there's two selected blocks
    if (allFlippedBlocks.length === 2) {

        // [1] stop clicking function
        stopClicking();
        // [2] check matched block function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]); // we target this two index (0, 1) because the filter function has targeted only 2 element that means we have a condition provides for the length === 2;
    } 
};

// stop clicking function
function stopClicking() {

    // add class no clicking on main container
    blocksContainer.classList.add("no-clicking");

    // add set time out
    setTimeout(() => {
        // remove no clicking class after duration
        blocksContainer.classList.remove("no-clicking");

    }, duration)
}

// Check matched block
function checkMatchedBlocks(firstBlock, secondBlock) {

    let triesElement = document.querySelector(".tries span");

    if (firstBlock.dataset.mix === secondBlock.dataset.mix) {

        firstBlock.classList.remove("is-flipped"); // remove this class to avoid override of the function about is-flipped class; تجنب مسألة اعادة فحص العناصر التي تحمل نفس الكلاس مع أنها متطابقة مع قرينتها
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");

        document.getElementById('success').play();

    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1; // (parseInt) : to make the number integer number anyway;

        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped"); // to return the block to ! because we remove the class that make it fipped;
        }, duration);

        setTimeout(() => {
            document.getElementById("error").play();
        }, duration / 2);
    }
}
// Shuffle fucntion
function shuffle(array) {

    // setting vars
    let current = array.length,
        temp,
        random; // to declare new variables without values;

    while (current > 0) {
        // get random element
        random = Math.floor(Math.random() * current); // 0 < random() < 1

        // decrease length by one
        current--; // to finish the loop in order to avoid infinite loop;

        // [1] save current element in stash
        temp = array[current];

        // [2] current element = random element
        array[current] = array[random];

        // [3] random element = get element from stash
        array[random] = temp;
    }
    return array;
};
