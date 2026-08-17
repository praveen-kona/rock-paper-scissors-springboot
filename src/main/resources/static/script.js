// ==========================================
// PLAY GAME
// ==========================================

function playGame(userChoice) {

    // --------------------------------
    // SHOW USER CHOICE IMMEDIATELY
    // --------------------------------

    document.getElementById("userChoice").textContent =
        "Your Choice: " +
        getChoiceDisplay(userChoice);


    // --------------------------------
    // SHOW COMPUTER THINKING
    // --------------------------------

    document.getElementById("computerChoice").textContent =
        "Computer Choice: 🤖 Thinking...";


    const resultElement =
        document.getElementById("result");


    resultElement.textContent =
        "⏳ COMPUTER IS THINKING...";


    resultElement.className =
        "result-thinking";


    // --------------------------------
    // DISABLE CHOICE BUTTONS
    // --------------------------------

    document.querySelectorAll(".choice-button").forEach(button => {

        button.disabled = true;

        button.classList.add("button-disabled");

    });


    // --------------------------------
    // WAIT FOR COMPUTER THINKING
    // --------------------------------

    setTimeout(() => {

        fetch("/api/game/play", {

            method: "POST",

            headers: {
                "Content-Type": "text/plain"
            },

            body: userChoice

        })


        // --------------------------------
        // CHECK RESPONSE
        // --------------------------------

        .then(async response => {

            if (!response.ok) {

                let errorMessage =
                    "Something went wrong. Please try again.";


                try {

                    const errorData =
                        await response.json();


                    if (errorData.message) {

                        errorMessage =
                            errorData.message;

                    }

                }

                catch (error) {

                    console.error(
                        "Could not read error response:",
                        error
                    );

                }


                throw new Error(errorMessage);

            }


            return response.json();

        })


        // --------------------------------
        // SUCCESS
        // --------------------------------

        .then(game => {

            // --------------------------------
            // SHOW USER CHOICE
            // --------------------------------

            document.getElementById("userChoice").textContent =
                "Your Choice: " +
                getChoiceDisplay(game.userChoice);


            // --------------------------------
            // SHOW COMPUTER CHOICE FIRST
            // --------------------------------

            document.getElementById("computerChoice").textContent =
                "Computer Choice: " +
                getChoiceDisplay(game.computerChoice);


            // --------------------------------
            // KEEP THINKING MESSAGE
            // --------------------------------

            resultElement.textContent =
                "🎮 CALCULATING RESULT...";


            resultElement.className =
                "result-thinking";


            // --------------------------------
            // WAIT BEFORE SHOWING RESULT
            // --------------------------------

            setTimeout(() => {

                // Remove previous result classes

                resultElement.className = "";


                // --------------------------------
                // USER WON
                // --------------------------------

                if (game.result === "USER_WON") {

                    resultElement.textContent =
                        "🏆 YOU WIN!";


                    resultElement.classList.add(
                        "result-win"
                    );


                    // Show popup AFTER computer choice

                    showGameResultPopup(
                        "🏆",
                        "YOU WIN!",
                        "Congratulations! 🎉",
                        "popup-win"
                    );

                }


                // --------------------------------
                // COMPUTER WON
                // --------------------------------

                else if (game.result === "COMPUTER_WON") {

                    resultElement.textContent =
                        "😔 COMPUTER WINS!";


                    resultElement.classList.add(
                        "result-loss"
                    );


                    // Show popup AFTER computer choice

                    showGameResultPopup(
                        "😔",
                        "COMPUTER WINS!",
                        "Better luck next time!",
                        "popup-loss"
                    );

                }


                // --------------------------------
                // DRAW
                // --------------------------------

                else {

                    resultElement.textContent =
                        "🤝 IT'S A DRAW!";


                    resultElement.classList.add(
                        "result-draw"
                    );


                    // Show popup AFTER computer choice

                    showGameResultPopup(
                        "🤝",
                        "IT'S A DRAW!",
                        "Both players chose the same move.",
                        "popup-draw"
                    );

                }


                // --------------------------------
                // UPDATE SCORE
                // --------------------------------

                getScore();


                // --------------------------------
                // UPDATE HISTORY
                // --------------------------------

                loadGameHistory();


            }, 700);

        })


        // --------------------------------
        // ERROR
        // --------------------------------

        .catch(error => {

            console.error(error);


            resultElement.className =
                "result-loss";


            resultElement.textContent =
                "⚠️ " + error.message;


            // --------------------------------
            // SHOW ERROR POPUP
            // --------------------------------

            showInvalidChoicePopup(
                "⚠️",
                "INVALID CHOICE",
                error.message
            );

        })


        // --------------------------------
        // ENABLE BUTTONS
        // --------------------------------

        .finally(() => {

            setTimeout(() => {

                document
                    .querySelectorAll(".choice-button")
                    .forEach(button => {

                        button.disabled = false;

                        button.classList.remove(
                            "button-disabled"
                        );

                    });

            }, 750);

        });


    }, 800);

}



// ==========================================
// CHOICE DISPLAY
// ==========================================

function getChoiceDisplay(choice) {

    if (choice === "ROCK") {

        return "🪨 ROCK";

    }


    if (choice === "PAPER") {

        return "📄 PAPER";

    }


    if (choice === "SCISSORS") {

        return "✂️ SCISSORS";

    }


    return choice;

}



// ==========================================
// GAME RESULT POPUP
// ==========================================

function showGameResultPopup(
    icon,
    title,
    message,
    popupClass
) {

    // --------------------------------
    // REMOVE OLD POPUP
    // --------------------------------

    const oldPopup =
        document.getElementById(
            "gameResultPopup"
        );


    if (oldPopup) {

        oldPopup.remove();

    }


    // --------------------------------
    // CREATE POPUP
    // --------------------------------

    const popup =
        document.createElement(
            "div"
        );


    popup.id =
        "gameResultPopup";


    popup.className =
        "result-popup " + popupClass;


    // --------------------------------
    // POPUP CONTENT
    // --------------------------------

    popup.innerHTML = `

        <div class="popup-content">

            <div class="popup-icon">

                ${icon}

            </div>


            <h2>

                ${title}

            </h2>


            <p>

                ${message}

            </p>

        </div>

    `;


    // --------------------------------
    // ADD POPUP
    // --------------------------------

    document.body.appendChild(
        popup
    );


    // --------------------------------
    // SHOW POPUP
    // --------------------------------

    setTimeout(() => {

        popup.classList.add(
            "show"
        );

    }, 10);


    // --------------------------------
    // REMOVE POPUP
    // --------------------------------

    setTimeout(() => {

        popup.classList.add(
            "popup-hide"
        );


        setTimeout(() => {

            popup.remove();

        }, 400);

    }, 1800);

}



// ==========================================
// INVALID CHOICE POPUP
// ==========================================

function showInvalidChoicePopup(
    icon,
    title,
    message
) {

    // --------------------------------
    // REMOVE OLD POPUP
    // --------------------------------

    const oldPopup =
        document.getElementById(
            "gameResultPopup"
        );


    if (oldPopup) {

        oldPopup.remove();

    }


    // --------------------------------
    // CREATE POPUP
    // --------------------------------

    const popup =
        document.createElement(
            "div"
        );


    popup.id =
        "gameResultPopup";


    popup.className =
        "result-popup popup-loss";


    // --------------------------------
    // POPUP CONTENT
    // --------------------------------

    popup.innerHTML = `

        <div class="popup-content">

            <div class="popup-icon">

                ${icon}

            </div>


            <h2>

                ${title}

            </h2>


            <p>

                ${message}

            </p>

        </div>

    `;


    // --------------------------------
    // ADD POPUP
    // --------------------------------

    document.body.appendChild(
        popup
    );


    // --------------------------------
    // SHOW POPUP
    // --------------------------------

    setTimeout(() => {

        popup.classList.add(
            "show"
        );

    }, 10);


    // --------------------------------
    // REMOVE POPUP
    // --------------------------------

    setTimeout(() => {

        popup.classList.add(
            "popup-hide"
        );


        setTimeout(() => {

            popup.remove();

        }, 400);

    }, 2200);

}



// ==========================================
// GET SCORE
// ==========================================

function getScore() {

    fetch("/api/game/score")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Could not get score"
                );

            }

            return response.json();

        })


        .then(score => {

            document.getElementById(
                "score"
            ).textContent =

                "Score: " +
                score.userScore +
                " - " +
                score.computerScore;


            document.getElementById(
                "draws"
            ).textContent =

                "Draws: " +
                score.draws;

        })


        .catch(error => {

            console.error(error);

        });

}



// ==========================================
// SHOW / HIDE GAME HISTORY
// ==========================================

function showHistory() {

    const historySection =
        document.getElementById(
            "historySection"
        );


    if (
        historySection.style.display === "none" ||
        historySection.style.display === ""
    ) {

        historySection.style.display =
            "block";


        loadGameHistory();


        setTimeout(() => {

            historySection.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }, 100);

    }

    else {

        historySection.style.display =
            "none";

    }

}



// ==========================================
// LOAD GAME HISTORY
// ==========================================

function loadGameHistory() {

    fetch("/api/game/history")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Could not load game history"
                );

            }

            return response.json();

        })


        .then(games => {

            const history =
                document.getElementById(
                    "history"
                );


            if (
                !games ||
                games.length === 0
            ) {

                history.innerHTML = `

                    <div class="empty-message">

                        📜

                        <br><br>

                        No games played yet.

                    </div>

                `;

                return;

            }


            // --------------------------------
            // CREATE TABLE
            // --------------------------------

            let table = `

                <table>

                    <thead>

                        <tr>

                            <th>
                                ID
                            </th>

                            <th>
                                Your Choice
                            </th>

                            <th>
                                Computer Choice
                            </th>

                            <th>
                                Result
                            </th>

                        </tr>

                    </thead>

                    <tbody>

            `;


            // --------------------------------
            // ADD GAME ROWS
            // --------------------------------

            games.forEach(game => {

                table += `

                    <tr>

                        <td>

                            ${game.id}

                        </td>


                        <td>

                            ${getChoiceDisplay(
                                game.userChoice
                            )}

                        </td>


                        <td>

                            ${getChoiceDisplay(
                                game.computerChoice
                            )}

                        </td>


                        <td class="${getHistoryResultClass(
                            game.result
                        )}">

                            ${getHistoryResult(
                                game.result
                            )}

                        </td>

                    </tr>

                `;

            });


            table += `

                    </tbody>

                </table>

            `;


            history.innerHTML =
                table;

        })


        .catch(error => {

            console.error(error);


            document.getElementById(
                "history"
            ).innerHTML = `

                <div class="error-message">

                    ⚠️

                    <br><br>

                    Could not load game history.

                </div>

            `;

        });

}



// ==========================================
// HISTORY RESULT TEXT
// ==========================================

function getHistoryResult(result) {

    if (result === "USER_WON") {

        return "🏆 USER WON";

    }


    if (result === "COMPUTER_WON") {

        return "💻 COMPUTER WON";

    }


    if (result === "DRAW") {

        return "🤝 DRAW";

    }


    return result;

}



// ==========================================
// HISTORY RESULT CSS CLASS
// ==========================================

function getHistoryResultClass(result) {

    if (result === "USER_WON") {

        return "history-user-win";

    }


    if (result === "COMPUTER_WON") {

        return "history-computer-win";

    }


    if (result === "DRAW") {

        return "history-draw";

    }


    return "";

}



// ==========================================
// OPEN RESET CONFIRMATION
// ==========================================

function resetGame() {

    const modal =
        document.getElementById(
            "resetModal"
        );


    modal.classList.add(
        "show"
    );

}



// ==========================================
// CLOSE RESET CONFIRMATION
// ==========================================

function closeResetModal() {

    const modal =
        document.getElementById(
            "resetModal"
        );


    modal.classList.remove(
        "show"
    );

}



// ==========================================
// CONFIRM RESET
// ==========================================

function confirmReset() {

    const modal =
        document.getElementById(
            "resetModal"
        );


    // --------------------------------
    // CLOSE CONFIRMATION
    // --------------------------------

    modal.classList.remove(
        "show"
    );


    // --------------------------------
    // SEND DELETE REQUEST
    // --------------------------------

    fetch("/api/game/reset", {

        method: "DELETE"

    })


    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Reset failed"
            );

        }

        return response.text();

    })


    .then(message => {

        // --------------------------------
        // CLEAR USER CHOICE
        // --------------------------------

        document.getElementById(
            "userChoice"
        ).textContent =

            "Your Choice: -";


        // --------------------------------
        // CLEAR COMPUTER CHOICE
        // --------------------------------

        document.getElementById(
            "computerChoice"
        ).textContent =

            "Computer Choice: -";


        // --------------------------------
        // CLEAR RESULT
        // --------------------------------

        const resultElement =
            document.getElementById(
                "result"
            );


        resultElement.textContent =
            "Result: -";


        resultElement.className =
            "";


        // --------------------------------
        // CLEAR SCORE
        // --------------------------------

        document.getElementById(
            "score"
        ).textContent =

            "Score: 0 - 0";


        // --------------------------------
        // CLEAR DRAWS
        // --------------------------------

        document.getElementById(
            "draws"
        ).textContent =

            "Draws: 0";


        // --------------------------------
        // CLEAR CURRENT HISTORY
        // --------------------------------

        const history =
            document.getElementById(
                "history"
            );


        if (history) {

            history.innerHTML = `

                <div class="empty-message">

                    📜

                    <br><br>

                    No games played yet.

                </div>

            `;

        }


        // --------------------------------
        // SHOW RESET POPUP
        // --------------------------------

        showResetPopup();

    })


    .catch(error => {

        console.error(error);

        showErrorPopup();

    });

}



// ==========================================
// RESET SUCCESS POPUP
// ==========================================

function showResetPopup() {

    const popup =
        document.createElement(
            "div"
        );


    popup.className =
        "result-popup popup-reset";


    popup.innerHTML = `

        <div class="popup-content">

            <div class="popup-icon">

                🔄

            </div>


            <h2>

                GAME RESET!

            </h2>


            <p>

                Your current score and
                history have been cleared.

            </p>

        </div>

    `;


    document.body.appendChild(
        popup
    );


    // --------------------------------
    // CLOSE POPUP
    // --------------------------------

    setTimeout(() => {

        popup.classList.add(
            "popup-hide"
        );


        setTimeout(() => {

            popup.remove();

        }, 400);

    }, 1800);

}



// ==========================================
// ERROR POPUP
// ==========================================

function showErrorPopup() {

    const popup =
        document.createElement(
            "div"
        );


    popup.className =
        "result-popup popup-loss";


    popup.innerHTML = `

        <div class="popup-content">

            <div class="popup-icon">

                ⚠️

            </div>


            <h2>

                RESET FAILED

            </h2>


            <p>

                Something went wrong.
                Please try again.

            </p>

        </div>

    `;


    document.body.appendChild(
        popup
    );


    setTimeout(() => {

        popup.classList.add(
            "popup-hide"
        );


        setTimeout(() => {

            popup.remove();

        }, 400);

    }, 2000);

}



// ==========================================
// OPEN PREVIOUS GAMES PAGE
// ==========================================

function openPreviousGames() {

    window.location.href =
        "/previous.html";

}



// ==========================================
// PAGE LOAD
// ==========================================

window.onload = function () {

    getScore();

};