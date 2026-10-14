(function () {
    const Gameboard = (function () {
        const gameboard = [
            "", "", "",
            "", "", "",
            "", "", ""
        ];
    
        return { gameboard };
    })()

    function createPlayer() {
        let name = "";
        let marker = "";
    
        return { name, marker };
    }

    const Players = (function () {
        const player1 = createPlayer();
        const player2 = createPlayer();

        player1.name = "Player 1";
        player1.marker = "x";
        player2.name = "Player 2";
        player2.marker = "o";

        return { player1, player2 };
    })()

    let player1Turn = true;
    let gameOver = false;
    let winnerExists = false;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const result = document.querySelector(".result");
    const player1name = document.querySelector(".player-1");
    const player2name = document.querySelector(".player-2");

    function playerMove(position) {
        if (Gameboard.gameboard[position] !== "" || !Number.isInteger(position) || !(position >= 0 && position <= 8) || gameOver) return;
        if (player1Turn === true) {
            Gameboard.gameboard[position] = Players.player1.marker;
            player1Turn = false;
        }
        else {
            Gameboard.gameboard[position] = Players.player2.marker;
            player1Turn = true;
        }

        winningCombinations.forEach((combination) => {
            if (Gameboard.gameboard[combination[0]] !== "" &&
                (Gameboard.gameboard[combination[0]] === Gameboard.gameboard[combination[1]] &&
                Gameboard.gameboard[combination[1]] === Gameboard.gameboard[combination[2]])) {
                if (Gameboard.gameboard[combination[0]] === "x") {
                    result.textContent = `${player1name.value} Wins!`;
                }
                else {
                    result.textContent = `${player2name.value} Wins!`;
                }
                winnerExists = true;
                gameOver = true;
            }
        });

        if (!Gameboard.gameboard.includes("") && !winnerExists) {
            result.textContent = "Tie!";
            gameOver = true;
        }
    }

    const gameboardContainer = document.querySelector(".gameboard");

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        gameboardContainer.appendChild(cell);
    }

    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell, cellIndex) => {
        const xImage = document.createElement("img");
        xImage.src = "images/cross-svgrepo-com.svg"
        xImage.style.width = "100px";
        xImage.style.height = "auto";
        const oImage = document.createElement("img");
        oImage.src = "images/circle-svgrepo-com.svg"
        oImage.style.width = "100px";
        oImage.style.height = "auto";
        cell.addEventListener("click", () => {
            if (cell.hasChildNodes() || gameOver) return;
            if (player1Turn === true) {
                cell.appendChild(xImage);
            }
            else {
                cell.appendChild(oImage);
            }
            playerMove(cellIndex);
        })
    })

    const restartButton = document.querySelector(".restart");

    restartButton.addEventListener("click", () => {
        cells.forEach((cell) => {
            while (cell.hasChildNodes()) {
                cell.removeChild(cell.firstChild);
            }
        })
        const newGameboard = Gameboard.gameboard.map((cell) => cell = "");
        Gameboard.gameboard = newGameboard;
        result.textContent = "";
        winnerExists = false;
        gameOver = false;
        player1Turn = true;
    })
})()