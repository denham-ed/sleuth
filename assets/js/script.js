document.addEventListener("DOMContentLoaded", () => {
    let startButtons = document.getElementsByClassName('difficulty-button')
    for (let startButton of startButtons){
        startButton.addEventListener('click', prepareGame)
    }
    
})



/** 
 * Recursive function to display mock loading text to user 
 * */
const addLoadingItem = (loadingArray, i) => {
    if (i < loadingArray.length) {
        setTimeout(() => {
            document.getElementById('middle-area-text').innerHTML =
                `<div>
            ${loadingArray[i]}...
            </div>`
            i++
            addLoadingItem(loadingArray, i)
        }, 1000)
    } else {
        document.getElementById('middle-area-logo').innerHTML = ``
        document.getElementById('middle-area-text').innerHTML = ``
        const middleArea = document.getElementById('middle-area')
        middleArea.classList.remove('start-message')
        middleArea.classList.add('middle-area-main')
        document.getElementById('main-logo').parentElement.removeChild(document.getElementById('main-logo'))

        // 
    }
}



const prepareGame = (event) => {
    document.getElementById('difficulty').textContent = event.target.dataset.difficulty
    document.getElementsByClassName('difficulty-container')[0].style.display = 'block'
    // Add Loading Text to Screen in Sequence
    document.getElementById('middle-area-text').innerHTML = `<div>The game is afoot...</div>`
    document.getElementById('middle-area-logo').innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`
    const loadingArray = ['Gathering Clues', 'Polishing Magnifying Glass', 'Sharpening Pencil', 'Interviewing Witnesses']
    addLoadingItem(loadingArray, 0)
        // New Detective fro Draw Testing
 detectives.forEach((detective) => {
    detective.facts.push({
        stat: "Draw",
        result: 1,
        relStrength: 2
    })
        })


    let playerDecks = assignCards(detectives)
    setTimeout(() => {
        populatePlayerCard(playerDecks, true)
        document.getElementById('card').style.display = 'flex'
        document.getElementById('player-deck').style.display = 'flex'
        document.getElementById('opponent-card').style.display = 'flex'
        document.getElementById('middle-area-text').innerHTML = `<span>It's your turn - choose an attribute to get started!`
    }, 8000)
}

const populatePlayerCard = (playerDecks, playerTurn) => {
    const detective = playerDecks.userDeck[0]
    document.getElementById('card-count-container').innerHTML = `<span>You have ${playerDecks.userDeck.length} cards in your deck.</span>`
    document.getElementById('card-header').textContent = detective.name
    document.getElementById('card-image').style.backgroundImage = `url(${detective.image})`
    // Stats
    let statsHTML = ''
    detective.facts.forEach((fact, index) => {
        statsHTML +=
            `    
            <tr 
            data-stat = ${index} 
            class="stat-row">
                <td>${fact.stat}</td>
                <td>${fact.result}</td>
            </tr>
        `
    })
    document.getElementById('card-stats').innerHTML =
        `
            <table id="stat-table">
            ${statsHTML}
            </table>
        `
    // Add Event Listener to Player Card
    if (playerTurn) {
        const statRows = document.getElementsByClassName('stat-row')
        for (let row of statRows) {
            row.classList.add('active-row')
            row.addEventListener('click', () => {
                compareCards(playerDecks, row.dataset.stat, playerTurn)
            })
        }
    }
}



/**
 * Randomises order of detective cards
 * 
 */
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffleCards = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Shuffles 16 cards and assigns them evenly to the player and opponent.
 * Return an object with userDeck and opponentDeck. 
 *
 */
const assignCards = (detectives) => {
    shuffleCards(detectives)
    let opponentDeck = detectives.slice(0, detectives.length / 2)
    let userDeck = detectives.slice(detectives.length / 2)
    let drawPile = []
    return {
        userDeck,
        opponentDeck,
        drawPile
    }
}

const lockUserInput = () => {
    let activeRows = document.getElementsByClassName('active-row')
    for (var i = activeRows.length - 1; i >= 0; i--) {
        activeRows[i].classList.add('locked')
        activeRows[i].classList.remove('active-row')

    }
}

/**
 * Compares player and opponent cards and renders message to screen.
 */

const compareCards = (playerDecks, statIndex, playerTurn) => {
    //Prevent User Clicks on Options
    lockUserInput()

    const playerDetective = playerDecks.userDeck[0]
    const opponentDetective = playerDecks.opponentDeck[0]
    //Messages - Separated in order to change order of array
    const playerDetectiveMessage = `<p>${playerDetective.name} has ${playerDetective.facts[statIndex].result} ${playerDetective.facts[statIndex].stat.toLowerCase()}.</p>`
    const opponentCallMessage = `<p>Your opponent calls ${opponentDetective.facts[statIndex].stat}!</p>`
    const opponentMessage = `<p>Your opponent has ${opponentDetective.name}.</p>`
    const opponentStatMessage = `<p>${opponentDetective.name} has ${opponentDetective.facts[statIndex].result} ${opponentDetective.facts[statIndex].stat.toLowerCase()}.</p>`
    // Define order of messages
    const messageArray = playerTurn ? [playerDetectiveMessage, opponentMessage, opponentStatMessage] : [opponentCallMessage, opponentMessage + opponentStatMessage, playerDetectiveMessage]
    // Evaluate winner
    let playerWinner, draw, winnerMessage
    if (playerDetective.facts[statIndex].result > opponentDetective.facts[statIndex].result){
        playerWinner = true
        winnerMessage = `<p class='confirmation'>You win this hand!</p>`
    } else if (playerDetective.facts[statIndex].result < opponentDetective.facts[statIndex].result){
        playerWinner = false
        winnerMessage = `<p class='confirmation'>You lose this hand...</p>`
    } else {
        draw = true
        winnerMessage = `<p class='confirmation'>It's a draw - noone knows what happens now...</p>`
    }
    const delay = playerTurn ? 0 : 2000
    // Display comparison messages
    const messageArea = document.getElementById('middle-area-text')
    setTimeout(() => {
        messageArea.innerHTML = messageArray[0]
    }, delay)
    setTimeout(() => {
        messageArea.innerHTML = messageArray[1]
        revealOpponentCard(opponentDetective)
    }, delay + 2000)
    setTimeout(() => {
        messageArea.innerHTML = messageArray[2]
    }, delay + 4000)
    setTimeout(() => {
        document.getElementById('middle-area').classList.add('highlight-message')
        messageArea.innerHTML = winnerMessage
    }, delay + 6000)
    // Check for draw - finish this comment!!
    if (!draw){
        setTimeout(() => {
            resetCards(playerWinner)
            passCards(playerWinner, playerDecks)
        }, delay + 8000)
    } else {
        setTimeout(()=>{
            handleDraw(playerTurn,playerDecks)
        },8000)
    }

}

/**
 * Shift player and opponent arrays and push them to the end of the winner's deck (array)
 * 
 */

const passCards = (playerWin, playerDecks) => {
    const {
        userDeck,
        opponentDeck
    } = playerDecks
    if (playerWin) {
        userDeck.push(userDeck.shift())
        userDeck.push(opponentDeck.shift())
        lastCardWarning(playerDecks)
        if (checkEndGame(playerDecks)) return
        populatePlayerCard(playerDecks, true)
    } else {
        opponentDeck.push(opponentDeck.shift())
        opponentDeck.push(userDeck.shift())
        lastCardWarning(playerDecks)
        if (checkEndGame(playerDecks)) return
        populatePlayerCard(playerDecks, false)
        opponentTurn(playerDecks)
    }
}

/**
 * Reveal image and title of opponent's card.
 */

const revealOpponentCard = (opponentDetective) => {
    const dividers = document.getElementsByClassName('divider')
    for (let divider of dividers) {
        divider.style.display = 'block'
    }
    const stripes = document.getElementsByClassName('small-stripe')
    for (let stripe of stripes) {
        stripe.style.display = 'block'
    }
    document.getElementById('opponent-card').style.backgroundImage = 'none'
    document.getElementById('opponent-card').style.backgroundColor = 'white'
    document.getElementById('opponent-header').textContent = `${opponentDetective.name}`
    document.getElementById('opponent-image').style.backgroundImage = `url(${opponentDetective.image})`
    document.getElementById('opponent-image').style.display = 'block'
}

/**
 * Resets Opponent Card to Reverse Card Image and clears message box
 */
const resetCards = (playerTurn) => {
    //Reset Opponent Card
    const dividers = document.getElementsByClassName('divider')
    for (let divider of dividers) {
        divider.style.display = 'none'
    }
    const stripes = document.getElementsByClassName('small-stripe')
    for (let stripe of stripes) {
        stripe.style.display = 'none'
    }
    document.getElementById('opponent-card').style.backgroundImage = 'url("assets/images/logo2.svg")'
    document.getElementById('opponent-card').style.backgroundColor = '#8C2F39'
    document.getElementById('opponent-header').textContent = ''
    document.getElementById('opponent-image').style.display = 'none'
    // Reset Message Area
    document.getElementById('middle-area').classList.remove('highlight-message')
    const turnMessage = playerTurn ? `<p>It's your turn...</p>` : `<p>It's your opponent's turn...</p>`
    document.getElementById('middle-area-text').innerHTML = turnMessage
}

/**
 * 
 */

const opponentTurn = (playerDecks) => {
    const difficulty = document.getElementById('difficulty').textContent
    const {
        opponentDeck
    } = playerDecks
    const opponentCard = opponentDeck[0]
    //Sort Opponent Card Facts by Relative Strength
    const sortedOpponentCardFacts = opponentCard.facts.map((fact,index) => {
        return {
            ...fact,
            originalIndex:index
        }
    })
    sortedOpponentCardFacts.sort((a, b) => {
        return b.relStrength - a.relStrength
    })
    let difficultySpread = []
    //Set Spread of Probabilities Based on Difficulty
    switch (difficulty) {
        case 'Test':
            difficultySpread=[0,1,2,100]
            break;
        case 'Easy':
            difficultySpread=[10,30,60,100]
            break;

        case 'Medium':
            difficultySpread=[50,75,90,100]
            break;

        case 'Hard':
            difficultySpread=[80,95,99,100]
            break;

        case 'Wild Card':
            difficultySpread=[25,50,75,100]
            break;
    }
    //Select Stat Index
    let ranNum = Math.floor(Math.random() * 100)
    let index = difficultySpread.findIndex((i) => {return i > ranNum})
    //Compare Cards
    compareCards(playerDecks, sortedOpponentCardFacts[index].originalIndex, false)
}

/**
 * 
 */

const lastCardWarning = (playerDecks) => {
    const {
        userDeck,
        opponentDeck
    } = playerDecks
    if (opponentDeck.length === 1) {
        document.getElementById('opponent-last-card-warning').style.display = 'block'
    } else {
        document.getElementById('opponent-last-card-warning').style.display = 'none'
    }
    if (userDeck.length < 2) {
        document.getElementById('player-last-card-warning').style.display = 'block'
        document.getElementById('player-deck').classList.add('deckFadeOut')

    } else {
        document.getElementById('player-last-card-warning').style.display = 'none'
        document.getElementById('player-deck').classList.remove('deckFadeOut')
        document.getElementById('player-deck').style.opacity = '1'

    }
}

const checkEndGame = (playerDecks) => {
    let gameOver = false
    const {
        userDeck,
        opponentDeck
    } = playerDecks
    if (userDeck.length === 0) {
        document.getElementById('opponent-card').classList.add('deckFadeOut')
        document.getElementById('card').classList.add('deckFadeOut')
        document.getElementById('player-last-card-warning').style.display = 'none'
        document.getElementById('opponent-last-card-warning').style.display = 'none'
        document.getElementById('player-deck').style.display = 'none'
        document.getElementById('middle-area-text').innerHTML =
            `
        <p>Bad luck! Moriarty has bested you this time!</p>
        <p>Try again!</p>
        `
        document.getElementById('middle-area').classList.add('end-message')
        gameOver = true
    }
    if (opponentDeck.length === 0) {
        document.getElementById('opponent-card').classList.add('deckFadeOut')
        document.getElementById('card').classList.add('deckFadeOut')
        document.getElementById('opponent-last-card-warning').style.display = 'none'
        document.getElementById('player-deck').style.display = 'none'
        document.getElementById('middle-area-text').innerHTML =
            `
        <p>You win!</p>
        `
        document.getElementById('middle-area').classList.add('end-message')
        gameOver = true
    }
    return gameOver
}

const handleDraw = (playerTurn,playerDecks) => {
    const {userDeck, opponentDeck} = playerDecks
    let {drawPile} = playerDecks
    drawPile.push(userDeck.shift(),opponentDeck.shift())
    console.log(playerDecks)
    resetCards(playerTurn)
    lastCardWarning(playerDecks)
    if (checkEndGame(playerDecks)) return
    populatePlayerCard(playerDecks, playerTurn)
}