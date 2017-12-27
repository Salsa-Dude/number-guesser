// Game function
// - User must guess a number between 1 and 10
// - User has a certain amount tries 
// - Notify user of guess remaining
// - Notify user of the correct answer if loose
// - let user choose to play again

// Game values
let min = 1,
    max = 10,
    winningNum = randomWinningNum(min,max),
    guessesLeft = 3;

// Ul elements
const game = document.querySelector("#game"),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

// Assign minNum and maxNum
minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
})

guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);
  console.log(guess);
  
  if (isNaN(guess) === true || guess < min || guess > max ) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    return;
  } 

  // Check if won
  if (guess === winningNum) {
    gameOver(true,`${winningNum} is correct, You Win!`);
    // // Disable input
    // guessInput.disabled = true;
    // // Change border color
    // guessInput.style.borderColor = 'green';
    // // Set message
    // setMessage(`${winningNum} is correct, You Win!`, 'green');
  } else {
      // Wrong number
      guessesLeft -= 1;
      if (guessesLeft === 0) {
        // Lost game over
        gameOver(false, `Game over, You lost. The correct number was ${winningNum}` );
        // // Disable input
        // guessInput.disabled = true;
        // // Change border color
        // guessInput.style.borderColor = 'red';
        // // Set message
        // setMessage(`Game over, You lost. The correct number was ${winningNum}`, 'red');
      } else {
        // Change border color
        guessInput.style.borderColor = 'red';
        // Clear input
        guessInput.value = '';
        // Game continues - answer wrong
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red' );
      }
  }
});

function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = 'color';
  // Set message
  setMessage(msg, color);

  // Play again?
  guessBtn.value = "Play again?";
  guessBtn.className += 'play-again';
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function randomWinningNum(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}