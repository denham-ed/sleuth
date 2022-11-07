/**
 * Adds event listeners for game initiating buttons and instructions button when the DOM content has loaded
 */
document.addEventListener("DOMContentLoaded", () => {
  // Instruction Button
  const instructionsButton = document.getElementById("instructions-button");
  instructionsButton.addEventListener("click", showInstructions);
  // Difficulty Selection Buttons
  let startButtons = document.getElementsByClassName("difficulty-button");
  for (let startButton of startButtons) {
    startButton.addEventListener("click", prepareGame);
  }
});

/**
 * Recursive function render faux loading text to user on game initiation
 * @param {Array} loadingArray - Array of strings of loading text
 * @param {...number} i - Counter for for loop
 */
const addLoadingItem = (loadingArray, i) => {
  if (i < loadingArray.length) {
    // Render Loading Messages to User
    setTimeout(() => {
      document.getElementById("middle-area-text").innerHTML = `<div>
            ${loadingArray[i]}...
            </div>`;
      i++;
      addLoadingItem(loadingArray, i);
    }, 1000);
  } else {
    // Prepare Areas for Main Game Play
    document.getElementById("middle-area-logo").innerHTML = ``;
    document.getElementById("middle-area-text").innerHTML = ``;
    const middleArea = document.getElementById("middle-area");
    middleArea.classList.remove("start-message");
    middleArea.classList.add("middle-area-main");
    document
      .getElementById("main-logo")
      .parentElement.removeChild(document.getElementById("main-logo"));
  }
};

/**
 * Adds difficulty setting to DOM, calls addLoadingItem, calls assignDetectives and prepares game container space for start of game
 * @param {*} event - Mouse click on button
 */
const prepareGame = (event) => {
  //Add Difficulty Level to DOM
  document.getElementById("difficulty").textContent =
    event.target.dataset.difficulty;
  //Prepare Modal Event Listeners
  const modal = document.getElementById("game-stats-modal");
  document.getElementById("circle").addEventListener("click", () => {
    modal.style.display = "block";
  });
  window.onclick = function (e) {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  };
  // Add Loading Text to Screen in Sequence
  document.getElementById(
    "middle-area-text"
  ).innerHTML = `<div>The Game Is Afoot...</div>`;
  document.getElementById(
    "middle-area-logo"
  ).innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
  const loadingArray = [
    "Gathering Clues",
    "Polishing Magnifying Glass",
    "Sharpening Pencil",
    "Interviewing Witnesses",
  ];
  addLoadingItem(loadingArray, 0);
  //Calls assignCards and split sets hand for each player
  let playerDecks = assignCards(detectives);
  //Prepares Game Space
  setTimeout(() => {
    populatePlayerCard(playerDecks, true);
    document.getElementById("card").style.display = "flex";
    document.getElementById("player-deck").style.display = "flex";
    document.getElementById("opponent-card").style.display = "flex";
    document.getElementById("circle").style.display = "flex";
    document.getElementById(
      "middle-area-text"
    ).innerHTML = `<span>It's your turn - choose an attribute to get started!`;
  }, 8000);
};

/**
 * Prepares player's current card with image, attributes and event listeners
 * @param {Object} playerDecks - Object containing player deck, opponent deck, and draw pile
 * @param {boolean} playerTurn - Indicates if it is player or opponent turn
 */
const populatePlayerCard = (playerDecks, playerTurn) => {
  //Selects first card in the player deck as the current card
  const detective = playerDecks.userDeck[0];
  //Updates text on player deck
  document.getElementById(
    "card-count-container"
  ).innerHTML = `<span>You have ${playerDecks.userDeck.length} cards.</span>`;
  // Adds image and name to card
  document.getElementById("card-header").textContent = detective.name;
  document.getElementById(
    "card-image"
  ).style.backgroundImage = `url(${detective.image})`;
  document.getElementById("card-image").style.display = "block";
  //Adds infromation to Game Stats modal
  document.getElementById(
    "card-count"
  ).innerHTML = `${playerDecks.userDeck.length} cards`;
  document.getElementById(
    "draw-count"
  ).innerHTML = `${playerDecks.drawPile.length} cards`;
  // Compiles and renders dective attributes table
  let statsHTML = "";
  detective.facts.forEach((fact, index) => {
    statsHTML += `<tr 
            data-stat = ${index} 
            class="stat-row">
                <td>${fact.stat}</td>
                <td>${fact.result}</td>
            </tr>`;
  });
  document.getElementById(
    "card-stats"
  ).innerHTML = `<table id="stat-table">${statsHTML} </table>`;
  // Hides detective image on very small screen
  setTimeout(() => {
    document.getElementById("card-image").classList.add("image-fade-out");
  }, 2000);
  // If player's turn, adds click event listener to detective attributes
  if (playerTurn) {
    const statRows = document.getElementsByClassName("stat-row");
    for (let row of statRows) {
      row.classList.add("active-row");
      row.addEventListener("click", (e) => {
        e.target.parentElement.classList.add("selected-row");
        compareCards(playerDecks, row.dataset.stat, playerTurn);
      });
    }
  }
};

/**
 * Sorts array into a random order
 * @param {Array} array - Any array
 *
 * Credit: https://tinyurl.com/mr5vhup5
 */
const shuffleCards = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

/**
 * Shuffles 16 cards and assigns the evenly to the player and opponent
 * @param {Array} detectives - Array of all 16 detectives
 * @returns {Object} - Object containing player deck array, opponent deck array and empty array for the starting draw pile
 */
const assignCards = (detectives) => {
  //Shuffle cards into random order
  shuffleCards(detectives);
  // Divide cards into two piles and initiate empty array for draw pile
  let opponentDeck = detectives.slice(0, detectives.length / 2);
  let userDeck = detectives.slice(detectives.length / 2);
  let drawPile = [];
  return {
    userDeck,
    opponentDeck,
    drawPile,
  };
};

/**
 * Prevents further clicks from user after selection of attribute
 */
const lockUserInput = () => {
  // Prevent clicks and remove formatting
  let activeRows = document.getElementsByClassName("active-row");
  for (var i = activeRows.length - 1; i >= 0; i--) {
    activeRows[i].classList.add("locked");
    activeRows[i].classList.remove("active-row");
  }
  // Resets image on very small device
  setTimeout(() => {
    document.getElementById("card-image").classList.remove("image-fade-out");
  }, 4000);
};

/**
 * Compares player and opponent cards and renders messages to screen.
 * @param {Object} playerDecks - Object containing player deck, opponent deck, and draw pile
 * @param {number} statIndex - Number representing index of chosen attribute
 * @param {boolean} playerTurn - Indicated if it is player or opponent turn
 */
const compareCards = (playerDecks, statIndex, playerTurn) => {
  //Prevent User Clicks on Options
  lockUserInput();
  // Select top cards of each deck
  const playerDetective = playerDecks.userDeck[0];
  const opponentDetective = playerDecks.opponentDeck[0];
  //Define messages
  const playerDetectiveMessage = `<p>${playerDetective.name} has ${
    playerDetective.facts[statIndex].result
  } ${playerDetective.facts[statIndex].stat.toLowerCase()}.</p>`;
  const opponentCallMessage = `<p>Your opponent calls ${opponentDetective.facts[statIndex].stat}!</p>`;
  const opponentMessage = `<p>Your opponent has ${opponentDetective.name}.</p>`;
  const opponentStatMessage = `<p>${opponentDetective.name} has ${
    opponentDetective.facts[statIndex].result
  } ${opponentDetective.facts[statIndex].stat.toLowerCase()}.</p>`;
  // Define order of messages
  const messageArray = playerTurn? [playerDetectiveMessage, opponentMessage, opponentStatMessage]: [opponentCallMessage, opponentMessage + opponentStatMessage,playerDetectiveMessage];
  // Evaluate winner and define outcome message
  let playerWinner, draw, winnerMessage;
  if (
    playerDetective.facts[statIndex].result >
    opponentDetective.facts[statIndex].result
  ) {
    playerWinner = true;
    winnerMessage = `<p class="confirmation">You win this hand!</p>`;
  } else if (
    playerDetective.facts[statIndex].result <
    opponentDetective.facts[statIndex].result
  ) {
    playerWinner = false;
    winnerMessage = `<p class="confirmation">You lose this hand...</p>`;
  } else {
    draw = true;
    winnerMessage = `<p class="confirmation">It's a draw - the cards are put to one side for now...</p>`;
  }
  // Set delay based on player turn
  const delay = playerTurn ? 0 : 2000;
  // Display comparison messages
  const messageArea = document.getElementById("middle-area-text");
  setTimeout(() => {
    messageArea.innerHTML = messageArray[0];
  }, delay);
  setTimeout(() => {
    messageArea.innerHTML = messageArray[1];
    revealOpponentCard(opponentDetective);
  }, delay + 2000);
  setTimeout(() => {
    messageArea.innerHTML = messageArray[2];
  }, delay + 4000);
  setTimeout(() => {
    document.getElementById("middle-area").classList.add("highlight-message");
    messageArea.innerHTML = winnerMessage;
  }, delay + 6000);
  // Check for draw and call appropriate function
  if (!draw) {
    setTimeout(() => {
      clearDrawPile();
      resetCards(playerWinner);
      passCards(playerWinner, playerDecks);
    }, delay + 8000);
  } else {
    setTimeout(() => {
      handleDraw(playerTurn, playerDecks);
    }, delay + 8000);
  }
};

/**
 * Move top cards of player and opponent decks and add them to the end of the winner's deck
 * @param {boolean} playerWin - Indicates if player or opponent won the previous hand
 * @param {Object} playerDecks - Object containing player deck, opponent deck, and draw pile
 * @returns
 */
const passCards = (playerWin, playerDecks) => {
  // Destructure decks
  let { userDeck, opponentDeck, drawPile } = playerDecks;
  // Check winner and take cards from top of deck and place them at end of winner's deck
  if (playerWin) {
    userDeck.push(userDeck.shift());
    userDeck.push(opponentDeck.shift());
    userDeck = userDeck.concat(drawPile);
    drawPile = [];
    //Redefine playerDecks
    playerDecks = {
      userDeck,
      opponentDeck,
      drawPile,
    };
    // Check if either player is on their last card
    lastCardWarning(playerDecks);
    // Check if game is over
    if (checkEndGame(playerDecks)) return;
    // Update cards for next turn
    populatePlayerCard(playerDecks, true);
  } else {
    opponentDeck.push(opponentDeck.shift());
    opponentDeck.push(userDeck.shift());
    opponentDeck = opponentDeck.concat(drawPile);
    drawPile = [];
    //Redefine playerDecks
    playerDecks = {
      userDeck,
      opponentDeck,
      drawPile,
    };
    // Check if either player is on their last card
    lastCardWarning(playerDecks);
    // Check if game is over
    if (checkEndGame(playerDecks)) return;
    // Update cards for next turn
    populatePlayerCard(playerDecks, false);
    opponentTurn(playerDecks);
  }
};

/**
 * Reveals image and title of opponent's cards
 * @param {Object} opponentDetective - The opponent's detective ie. the top card of their deck
 */
const revealOpponentCard = (opponentDetective) => {
  const dividers = document.getElementsByClassName("divider");
  for (let divider of dividers) {
    divider.style.display = "block";
  }
  // Reveal image and name of opponent detective
  document.getElementById("opponent-card").style.backgroundImage = "none";
  document.getElementById("opponent-card").style.backgroundColor = "white";
  document.getElementById(
    "opponent-header"
  ).textContent = `${opponentDetective.name}`;
  document.getElementById(
    "opponent-image"
  ).style.backgroundImage = `url(${opponentDetective.image})`;
  document.getElementById("opponent-image").style.display = "block";
};

/**
 * Displays opponent card as the reverse card image and resets the central message box
 * @param {boolean} playerTurn - Indicates if it is player or opponent turn
 */
const resetCards = (playerTurn) => {
  //Resets opponent card
  const dividers = document.getElementsByClassName("divider");
  for (let divider of dividers) {
    divider.style.display = "none";
  }
  document.getElementById("opponent-card").style.backgroundImage =
    "url('assets/media/logos/logo2.svg')";
  document.getElementById("opponent-card").style.backgroundColor = "#8C2F39";
  document.getElementById("opponent-header").textContent = "";
  document.getElementById("opponent-image").style.display = "none";
  // Resets message area
  document.getElementById("middle-area").classList.remove("highlight-message");
  const turnMessage = playerTurn ? `<p>It's your turn...</p>` : `<p>It's your opponent's turn...</p>`;
  document.getElementById("middle-area-text").innerHTML = turnMessage;
};

/**
 * Discovers difficulty setting from DOM & selects an attribute for comparison
 * @param {Object} playerDecks - Object containing player deck, opponent deck, and draw pile
 */
const opponentTurn = (playerDecks) => {
  // Hides detective imade on very small devices
  setTimeout(() => {
    document.getElementById("card-image").classList.add("image-fade-out");
  }, 1000);
  // Discovers difficulty level from DOM
  const difficulty = document.getElementById("difficulty").textContent;
  const { opponentDeck } = playerDecks;
  const opponentCard = opponentDeck[0];
  // Sorts opponents attributes by relative strenght, whilst retaining original index
  const sortedOpponentCardFacts = opponentCard.facts.map((fact, index) => {
    return {
      ...fact,
      originalIndex: index,
    };
  });
  sortedOpponentCardFacts.sort((a, b) => {
    return b.relStrength - a.relStrength;
  });
  //Sets spread of probabilities based on difficulty setting
  let difficultySpread = [];
  switch (difficulty) {
    case "Test":
      difficultySpread = [0, 1, 2, 100];
      break;
    case "Easy":
      difficultySpread = [10, 30, 60, 100];
      break;
    case "Medium":
      difficultySpread = [50, 75, 90, 100];
      break;
    case "Hard":
      difficultySpread = [80, 95, 99, 100];
      break;
    case "Wild":
      difficultySpread = [25, 50, 75, 100];
      break;
  }
  //Selects attribute using random number and probabilities
  let ranNum = Math.floor(Math.random() * 100);
  let index = difficultySpread.findIndex((i) => {
    return i > ranNum;
  });
  //Compare cards using selected attribute
  compareCards(
    playerDecks,
    sortedOpponentCardFacts[index].originalIndex,
    false
  );
};

/**
 * Checks if either player is on their last card and displays or hides a warning message
 * @param {Object} playerDecks - Object containing player deck, opponent deck, and draw pile
 */
const lastCardWarning = (playerDecks) => {
  const { userDeck, opponentDeck } = playerDecks;
  // Check if opponent is on last card (or has no cards)
  if (opponentDeck.length < 2) {
    document.getElementById("opponent-last-card-warning").style.display =
      "block";
  } else {
    document.getElementById("opponent-last-card-warning").style.display =
      "none";
  }
  // Check if player is on last card (or has no cards)
  if (userDeck.length < 2) {
    document.getElementById("player-last-card-warning").style.display = "block";
    document.getElementById("player-deck").classList.add("deckFadeOut");
  } else {
    document.getElementById("player-last-card-warning").style.display = "none";
    document.getElementById("player-deck").classList.remove("deckFadeOut");
    document.getElementById("player-deck").style.opacity = "1";
  }
};

/**
 * Checks if either player has no remaining cards, clears remaining card images and displays a winning or losing message
 * @param {Object} playerDecks - Object containing player deck, opponent deck, and draw pile
 * @returns gameOver - a boolean indicating that the game is ending. If true, it stops the cycle of turns.
 */
const checkEndGame = (playerDecks) => {
  // Assumes the game will continue
  let gameOver = false;
  const { userDeck, opponentDeck } = playerDecks;
  // Checks if player has zero cards (and has lost)
  if (userDeck.length === 0) {
    // Hides game ephemera (decks, warning, draw pile etc)
    document.getElementById("opponent-card").classList.add("deckFadeOut");
    document.getElementById("card").classList.add("deckFadeOut");
    document.getElementById("player-last-card-warning").style.display = "none";
    document.getElementById("opponent-last-card-warning").style.display =
      "none";
    document.getElementById("draw-pile-container").style.display = "none";
    document.getElementById("player-deck").style.display = "none";
    // Displayes losing message with try again buttons
    document.getElementById(
      "middle-area-text"
    ).innerHTML = `<p>Bad luck - you've lost this time.</p><br><br>
            <p>Remember - it takes time to work out your strengths and your opponent's weaknesses.</p>
            <button type="button" class="refresh-button" onClick="window.location.reload();">Try Again</button>`;
    document.getElementById("middle-area").classList.add("end-message");
    // Sets gameOver
    gameOver = true;
  }
  if (opponentDeck.length === 0) {
    // Hides game ephemera (decks, warning, draw pile etc)
    document.getElementById("opponent-card").classList.add("deckFadeOut");
    document.getElementById("card").classList.add("deckFadeOut");
    document.getElementById("opponent-last-card-warning").style.display =
      "none";
    document.getElementById("opponent-last-card-warning").style.display =
      "none";
    document.getElementById("draw-pile-container").style.display = "none";
    document.getElementById("player-deck").style.display = "none";
    // Displayes winning message with try again buttons
    document.getElementById(
      "middle-area-text"
    ).innerHTML = `<p>Congratulations - You win!</p><br><br>
            <p>For a different challenge, try changing the difficulty level!</p>
            <button type="button" class="refresh-button" onClick="window.location.reload();">Play Again</button>`;
    document.getElementById("middle-area").classList.add("end-message");
    // Sets gameOver
    gameOver = true;
  }
  return gameOver;
};

/**
 * Places player and opponent card into separate pile, renders pile to screen and triggers next turn
 * @param {boolean} playerTurn - Indicates if it is player or opponent turn
 * @param {Object} playerDecks - Object containing player deck, opponent deck, and draw pile
 * @returns Returns gameOver value to check for end of game
 */
const handleDraw = (playerTurn, playerDecks) => {
  const { userDeck, opponentDeck } = playerDecks;
  let { drawPile } = playerDecks;
  drawPile.push(userDeck.shift(), opponentDeck.shift());
  // Renders draw pile to screen in large devices
  renderDrawPile(drawPile);
  // Draws next cards
  resetCards(playerTurn);
  // Checks for last card and end of game
  lastCardWarning(playerDecks);
  if (checkEndGame(playerDecks)) return;
  populatePlayerCard(playerDecks, playerTurn);
  // Triggers opponents turn as necessary
  if (!playerTurn) {
    opponentTurn(playerDecks);
  }
};

/**
 * Renders cards in drawpile on large devices, showing detective image
 * @param {Array} drawPile
 */
const renderDrawPile = (drawPile) => {
  let drawPileHTML = "";
  // Loop through each card
  drawPile.forEach((card) => {
    drawPileHTML += `<div class="draw-pile-card"><div class="draw-pile-card-header blur">${card.name}</div>
        <div class="draw-pile-card-picture" style="background-image: url(${card.image})"></div>
        <div class="tiny-stat blur">Enemies</div>
        <div class="tiny-stat blur">Cases</div>
        <div class="tiny-stat blur">Style</div>
        <div class="tiny-stat blur">Assistants</div>
        </div>`;
  });
  // Display pile
  document.getElementById("draw-pile-container").innerHTML = drawPileHTML;
};

/**
 * Resets the rendered draw pile
 */
const clearDrawPile = () => {
  document.getElementById("draw-pile-container").innerHTML = "";
};

/**
 * Displays instruction to user in central message area
 */
const showInstructions = () => {
  const middleArea = document.getElementById("middle-area-text");
  const instructions = document.getElementById("instructions");
  middleArea.innerHTML = "";
  instructions.innerHTML = `<h2>How to Play</h2>
        <p>
        <ol>
            <li>Select a Difficulty Mode</li>
            <li>When prompted, select an attribute for your detective; this attribute will be compared to your opponent's card.</li>
                <ul>
                    <li>If you have the highest number, you win your opponent's card and get to select an attribute for the next card. Both cards are placed at the bottom of your deck</li>
                    <li>If you have a lower number, your opponent wins your card and keeps their own. They then get to choose the next attribute</li>
                    <li>If there is a draw, the cards are placed in a separate pile and the player who selected the attribute chooses again for the next hand. The winner of the subsequent hands wins all the cards in the draw pile.</li>
                </ul>
            <li>The game ends when one player has all 16 cards.</li>
        </ol>
        </p>

        <h2>
        Keep an eye out for...
        </h2>
        <ul>
            <li>Enemies make the detective... The more enemies the better! </li>
            <li>If either play is on their last card, they must win that hand; a draw will result in the loss of the game</li>
            <li>You can see how many cards you have at any time by clicking the ? button at the top of the screen.</li>
        </ul>
        <button type="button" class="refresh-button" onClick="window.location.reload();">Back</button>`;
};
