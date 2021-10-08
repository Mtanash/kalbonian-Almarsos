let game;

const generatePuzzleDOM = (puzzleText) => {
  const puzzle = document.createElement("h3");
  puzzle.textContent = puzzleText;
  return puzzle;
};

const generateRemainingGuessesDOM = (text) => {
  const remainingGuessesElement = document.createElement("p");
  remainingGuessesElement.textContent = text;
  return remainingGuessesElement;
};

const renderPuzzle = (puzzle) => {
  const puzzleContainer = document.querySelector("#puzzle-container");
  const puzzleElement = generatePuzzleDOM(puzzle.puzzle);
  const remainingGuessesElement = generateRemainingGuessesDOM(
    puzzle.statusMessage
  );

  puzzleContainer.innerHTML = "";

  puzzleContainer.appendChild(puzzleElement);
  puzzleContainer.appendChild(remainingGuessesElement);
};

window.addEventListener("keypress", (e) => {
  game.makeGuess(e.key);
  renderPuzzle(game);
});

const startGame = async () => {
  const puzzle = await getPuzzle(3);
  game = new Hangman(puzzle, 4);
  renderPuzzle(game);
};

document.querySelector("#reset").addEventListener("click", startGame);

startGame();

// getPuzzle(3)
//   .then((puzzle) => {
//     console.log(puzzle);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// getCurrentCountry()
//   .then((country) => {
//     console.log(country);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
