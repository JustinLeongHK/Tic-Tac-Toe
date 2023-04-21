const updateMode = (() => {
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get("mode");

  const player_2 = document.querySelector(".player-2");
  const image = document.createElement("img");

  if (mode === "single") {
    image.src = "icons/AI.svg";
    player_2.insertBefore(image, player_2.firstChild);

    // level drop down box
    const level = document.querySelector(".level");
    const selectElement = document.createElement("select");

    let option1 = document.createElement("option");
    option1.text = "Easy";
    selectElement.add(option1);

    let option2 = document.createElement("option");
    option2.text = "Medium";
    selectElement.add(option2);

    let option3 = document.createElement("option");
    option3.text = "Impossible";
    selectElement.add(option3);

    level.appendChild(selectElement);
  } else {
    image.src = "icons/player.svg";
    player_2.insertBefore(image, player_2.firstChild);
  }
})();

const player = (symbol) => {
  const getSymbol = () => {
    return symbol;
  };

  return { getSymbol };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => {
    return board;
  };

  const setField = (index, sign) => {
    if (index < board.length) {
      board[index] = sign;
    }
  };

  const getField = (index) => {
    if (index < board.length) {
      return board[index];
    }
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { getBoard, setField, getField, reset };
})();

const gameController = (() => {
  const player_1 = player("X");
  const player_2 = player("O");
  let round = 1;
  let isOver = false;

  const playRound = (index) => {
    gameBoard.setField(index, getCurrentPlayerSign());
    if (checkWinner(index)) {
      console.log(`${getCurrentPlayerSign()} Won`);
      isOver = true;
      return;
    }
    if (round === 9) {
      isOver = true;
      console.log(`Its a draw`);
      return;
    } else {
      round++;
    }
  };

  const getCurrentPlayerSign = () => {
    return round % 2 === 1 ? player_1.getSymbol() : player_2.getSymbol();
  };

  const checkWinner = (fieldIndex) => {
    fieldIndex = parseInt(fieldIndex);
    const winConditions = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Filter the winConditions array to only include combinations that include the current fieldIndex
    const possibleCombinations = winConditions.filter((combination) =>
      combination.includes(fieldIndex)
    );

    // Check if any of the possible combinations contain only the current player's sign
    const winner = possibleCombinations.some((combination) =>
      combination.every(
        (index) => gameBoard.getField(index) === getCurrentPlayerSign()
      )
    );
    return winner;
  };

  const getIsOver = () => {
    return isOver;
  };

  const reset = () => {
    round = 1;
    isOver = false;
  };
  return {
    getCurrentPlayerSign,
    playRound,
    getIsOver,
    reset,
    checkWinner,
  };
})();

const displayController = (() => {
  const turn = document.querySelectorAll(".turn");
  const result = document.querySelector(".result");
  const boxes = document.querySelectorAll(".box");
  const sign = document.querySelectorAll(".insertSign");
  const homeBtn = document.querySelector('img[src="icons/home.svg"]');
  const refreshBtn = document.querySelector('img[src="icons/refresh.svg"]');

  homeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  refreshBtn.addEventListener("click", () => {
    location.reload();
  });

  boxes.forEach((box) => {
    box.addEventListener(
      "click",
      () => {
        const boxID = box.id;
        if (
          gameController.getCurrentPlayerSign() === "X" &&
          gameController.getIsOver() === false
        ) {
          addSymbol(boxID, "X");
          changeTurn("X");
        } else if (gameController.getIsOver() === false) {
          addSymbol(boxID, "O");
          changeTurn("O");
        }
        gameController.playRound(boxID);
      },
      { once: true }
    );
  });

  const addSymbol = (index, symbol) => {
    const crossSymbol = document.createElement("div");
    const node = sign[index];

    crossSymbol.textContent = symbol;
    if (symbol === "X") {
      crossSymbol.style.color = "#D35C37";
    } else if (symbol === "O") {
      crossSymbol.style.color = "#97B8C2";
    }
    crossSymbol.style.fontSize = "70px";
    crossSymbol.style.fontWeight = "bold";

    node.appendChild(crossSymbol);
  };

  const changeTurn = (currentPlayer) => {
    const leftSide = turn[0];
    const rightSide = turn[1];

    const img = document.createElement("img");
    img.src = "icons/hand.svg";
    img.alt = "player's turn";

    if (currentPlayer === "O") {
      // display turn signal on left and turn off right turn signal
      leftSide.appendChild(img);
      if (rightSide.firstElementChild) {
        rightSide.removeChild(rightSide.firstElementChild);
      }
    }
    if (currentPlayer === "X") {
      // display turn signal on right and turn off left turn signal
      rightSide.appendChild(img);
      if (leftSide.firstElementChild) {
        leftSide.removeChild(leftSide.firstElementChild);
      }
    }
  };
})();
