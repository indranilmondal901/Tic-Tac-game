const inputboxs = document.querySelectorAll(".inputbox");
const player_X = "❌";
const player_O = "⭕";
let turn = player_X;

const boardState = Array(inputboxs.length);
boardState.fill(null);
// console.log(boardState)

const choice = document.getElementById("choice");
const strike = document.getElementById("strike");
const gameOveraArea = document.getElementById("gameOver-area");
const gameOverMsg = document.getElementById("gameOver-msg");
const playAgain = document.getElementById("play-again");
const resetBtnDiv = document.getElementById("resetBtnDiv")
playAgain.addEventListener("click", newGame);


// //sound
// const gameOverSound = new Audio("")
// const click = new Audio("sound_click.wav")


//hover on inputbox
function setHoverText() {
    inputboxs.forEach(inputbox => {
        //removing all hover text
        inputbox.classList.remove("X-hover");
        inputbox.classList.remove("O-hover");
    })
    //which hover and when
    let hoverclass = "X-hover";
    if (turn == player_O) {
        hoverclass = "O-hover";
    }
    inputboxs.forEach(inputbox => {
        // console.log(turn)
        // console.log(inputbox.innerText)
        if (turn == player_X && inputbox.innerText == "") {
            inputbox.classList.add(hoverclass)
        } else if (turn == player_O && inputbox.innerText == "") {
            inputbox.classList.add(hoverclass)
        }
    })
}
setHoverText();

//inputbox click fn
inputboxs.forEach(inputbox => inputbox.addEventListener("click", boxClick));

function boxClick(event) {
    // console.log(gameOveraArea.classList)
    if (gameOveraArea.classList.contains("visible")) {
        return;
    }
    const inputbox = event.target;
    // console.log(inputbox)
    const inputboxNumber = inputbox.dataset.index;
    // console.log(inputboxNumber)
    if (inputbox.innerText != "") {
        return;
    }
    if (turn == player_X) {
        // console.log(inputboxNumber)
        inputbox.innerText = player_X;
        boardState[inputboxNumber - 1] = player_X;
        // console.log(boardState);
        turn = player_O;
        choice.innerText = `Turn For : ⭕`;
    } else if (turn == player_O) {
        // console.log(inputboxNumber)
        inputbox.innerText = player_O;
        boardState[inputboxNumber - 1] = player_O;
        // console.log(boardState);
        turn = player_X;
        choice.innerText = `Turn For : ❌`;
    }
    setHoverText();
    checkWinner();
}

//Win OR Draw Logic
function checkWinner() {
    for (const condition of winningCombination) {
        //object destructuring
        const { combo, strikeClass } = condition;
        // console.log(combo)
        const inputboxValue1 = boardState[combo[0] - 1];
        const inputboxValue2 = boardState[combo[1] - 1];
        const inputboxValue3 = boardState[combo[2] - 1];
        //Winning case
        if (inputboxValue1 != null &&
            inputboxValue1 === inputboxValue2 &&
            inputboxValue1 === inputboxValue3) {
            // console.log(combo);
            console.log(inputboxValue1);
            strike.classList.add(strikeClass);
            gameOVerScreen(inputboxValue1);
            return;
        }
        //Draw Case
        const allfilled = boardState.every((element) => element !== null);
        if (allfilled) {
            gameOVerScreen(null);
            return;
        }
    }
}

function gameOVerScreen(winnerText) {
    // gameOverSound.play();
    let text = " DRAW !";
    if (winnerText != null) {
        text = `Winner is ${winnerText} !`;
    }
    gameOveraArea.classList.add("visible");
    gameOverMsg.innerText = text;
    reset.remove()
}

const winningCombination = [
    //row
    { combo: [1, 2, 3], strikeClass: "strike-row1" },
    { combo: [4, 5, 6], strikeClass: "strike-row2" },
    { combo: [7, 8, 9], strikeClass: "strike-row3" },
    //col
    { combo: [1, 4, 7], strikeClass: "strike-col1" },
    { combo: [2, 5, 8], strikeClass: "strike-col2" },
    { combo: [3, 6, 9], strikeClass: "strike-col3" },
    //diagonal
    { combo: [1, 5, 9], strikeClass: "strike-dia1" },
    { combo: [3, 5, 7], strikeClass: "strike-dia2" },
]

function newGame() {
    strike.className = "strike";
    gameOveraArea.classList = "hidden";
    boardState.fill(null);
    inputboxs.forEach((inputbox) => {
        inputbox.innerText = ""
    });
    choice.innerText = `Starting Turn For : ❌`;
    setHoverText();
        resetBtnDiv.innerHTML = `<button id="reset" class="button" onclick=resetGame()>Reset</button>`
}

function resetGame() {
    strike.className = "strike";
    boardState.fill(null);
    inputboxs.forEach((inputbox) => {
        inputbox.innerText = ""
    });
    choice.innerText = `Starting Turn For : ❌`;
    setHoverText();
}