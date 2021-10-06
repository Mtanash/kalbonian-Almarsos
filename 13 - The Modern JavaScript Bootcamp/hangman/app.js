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
  game1.makeGuess(e.key);
  renderPuzzle(game1);
});
