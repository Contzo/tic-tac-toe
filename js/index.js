// App namespace
const App = {
  $: {
    menu: document.querySelector("[data-id='menu']"), // we select the element using the data-* attribute in order to decouple CSS classes from JS
    menuItems: document.querySelector("[data-id='menu-popover']"),
    resetButton: document.querySelector("[data-id='reset-btn']"),
    newRoundButton: document.querySelector("[data-id='new-round-button']"),
    squares: document.querySelectorAll("[data-id='square-btn']"),
  },

  state: {
    moves: [],
  },

  getGameStatus(moves) {
    const p1Moves = moves
      .filter((move) => move.playerId === 1)
      .map((move) => move.squareId);
    const p2Moves = moves
      .filter((move) => move.playerId === 2)
      .map((move) => move.squareId);
    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let winner = null;

    winningPatterns.forEach((pattern) => {
      const p1Wins = pattern.every((v) => p1Moves.includes(v));
      const p2Wins = pattern.every((v) => p2Moves.includes(v));
      if (p1Wins) winner = 1;
      if (p2Wins) winner = 2;
    });
    return {
      status:
        moves.length === 9 || winner !== null ? "complete" : "in-progress", // in-progress || complete
      winner, // 1 || 2 || null
    };
  },
  init() {
    App.registerEventListeners();
  },

  registerEventListeners() {
    // Toggle menu
    App.$.menu.addEventListener("click", (event) => {
      App.$.menuItems.classList.toggle("hidden");
    });
    App.$.resetButton.addEventListener("click", (event) => {
      console.log(event.target);
    });
    App.$.newRoundButton.addEventListener("click", (event) => {
      console.log(event.target);
    });

    // Squares
    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        const squareElement = event.currentTarget;

        // Check if the square is already played
        const hasMove = (squareId) => {
          return App.state.moves.some((move) => move.squareId === squareId);
        };
        if (hasMove(+squareElement.id)) {
          console.log("Square already has an icon");
          return;
        }

        // Update the square element and the current player state
        const currentPlayer = App.state.moves.length % 2 === 0 ? 1 : 2;
        const icon = document.createElement("i");
        if (currentPlayer == 1) {
          icon.classList.add("fa-solid", "fa-x", "yellow");
        } else {
          icon.classList.add("fa-solid", "fa-o", "turquoise");
        }

        App.state.moves.push({
          squareId: +squareElement.id,
          playerId: currentPlayer,
        });
        squareElement.replaceChildren(icon);

        // Check if there is a winner or tie
        const status = App.getGameStatus(App.state.moves);
        console.log(status);
      });
    });
  },
};

// Init all the event listeners and logic only after the windows has loaded
window.addEventistener("load", App.init);
