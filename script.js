let btns = document.querySelectorAll(".btn");
btns.forEach((btns) => {
    // and for each one we add a 'click' listener
    btns.addEventListener('click', () => {
        let playersChoice = (btns.innerText);
        playRound(playersChoice);

        updateImg("player", playersChoice);
        
        btns.classList.add('playing');
        btns.addEventListener('transitionend',removeTransition);
        //btns.forEach(btn=>btn.addEventListener('transitionend',removeTransition));
        
    });
});

function getComputerChoice() {
    let comChoice = "";
    
    switch (Math.floor(Math.random() * 3)) {
        case 0:
            comChoice = "ROCK";
            break;
        case 1:
            comChoice = "PAPER";
            break;
        case 2:
            comChoice = "SCISSORS";
    }
    updateImg("cpu", comChoice);
    return comChoice
}

function playRound(playerChoice) {

    let pC = playerChoice.toUpperCase();
    let cC = getComputerChoice();
    
    console.log(pC + " " + cC);
    //player wins
    if ((pC == ['ROCK'] && cC == ['SCISSORS']) ||
        (pC == ['PAPER'] && cC == ['ROCK']) ||
        (pC == ['SCISSORS'] && cC == ['PAPER'])) {
        console.log('player');
        updateScore("player");
    }
    //cpu wins
    else if ((cC == ['ROCK'] && pC == ['SCISSORS']) ||
        (cC == ['PAPER'] && pC == ['ROCK']) ||
        (cC == ['SCISSORS'] && pC == ['PAPER'])) {
        console.log('cpu');
        updateScore("cpu");
    }
    else {
        console.log('tie');
        updateScore("tie");
    }
}

function updateScore(result) {
    const scores = document.querySelector(`#score-${result}`);
    let numberScore = parseInt(scores.innerText);
    numberScore++;
    scores.innerText = numberScore;
    checkScore(result);
}

function checkScore(result){
    const score = document.querySelector(`#score-${result}`);
    if (score.innerText == 5){
        let winner = result;
        modal(winner);
    }
}
function updateImg(user, choice) {
    const userImg = document.querySelector(`#${user}Img`);
    userImg.classList.remove("hide");
    if (choice == "ROCK") {
        userImg.src = "images/rock.png";
    }
    else if (choice == "PAPER") {
        userImg.src = "images/paper.png";
    }
    else {
        userImg.src = "images/scissors.png";
    }
}
function modal(winner){
    let modal = document.getElementById("myModal");
    const modalText = document.querySelector(`#modal-text`);
    let span = document.getElementsByClassName("close")[0];

    if (winner == "tie"){
        modalText.innerText = "TIE!";
    }
    else {
        modalText.innerText = winner.toUpperCase() + " WINS!";
    }
   

    modal.style.display = "block";
    span.onclick = function() {
        location.reload();
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            location.reload();
        }
      }
}   
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
  }