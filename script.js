let playerScore = 0;  // Player's score
let computerScore = 0;  // Computer's score
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
const resultElement = document.getElementById("game-result");
const resetButton = document.getElementById("reset");

const choices = ["rock", "paper", "scissors"]; // Possible choices

// Elements for player and computer choices
const playerChoiceBtns = document.querySelectorAll(".choice");

// Listen for player choice
playerChoiceBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const playerChoice = btn.id; // The ID of the button (rock, paper, or scissors)
        const computerChoice = getComputerChoice();
        const result = determineWinner(playerChoice, computerChoice);

        updateGameResult(result, computerChoice);
    });
});

// Get computer's random choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Determine winner: returns a result message
function determineWinner(player, computer) {
    if (player === computer) {
        return "It's a tie!";
    }

    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        playerScore += 1; // Player wins
        return "You win!";
    } else {
        computerScore += 1; // Computer wins
        return "You lose!";
    }
}

// Update game result and score
function updateGameResult(result, computerChoice) {
    resultElement.textContent = `${result} Computer chose ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}.`;
    playerScoreElement.textContent = playerScore; // Update the player's score
    computerScoreElement.textContent = computerScore; // Update the computer's score
    resetButton.style.display = "block"; // Show reset button
}

// Reset game
resetButton.addEventListener("click", () => {
    playerScore = 0; // Reset the player's score
    computerScore = 0; // Reset the computer's score
    playerScoreElement.textContent = playerScore; // Update the player's score to 0
    computerScoreElement.textContent = computerScore; // Update the computer's score to 0
    resultElement.textContent = ""; // Clear the result message
    resetButton.style.display = "none"; // Hide the reset button
});
