document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById('start-button')
    startButton.addEventListener('click', prepareGame)
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



const prepareGame = () => {
    // Add Loading Text to Screen in Sequence
    document.getElementById('middle-area-text').innerHTML = `<div>The game is afoot...</div>`
    document.getElementById('middle-area-logo').innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`
    const loadingArray = ['Gathering Clues', 'Polishing Magnifying Glass', 'Sharpening Pencil', 'Interviewing Witnesses']
    addLoadingItem(loadingArray, 0)
    let playerDecks = assignCards(detectives)
    setTimeout(() => {
        populatePlayerCard(playerDecks, true)
        document.getElementById('card').style.display = 'flex'
        document.getElementById('player-deck').style.display = 'flex'
        document.getElementById('opponent-card').style.display = 'flex'
        document.getElementById('game-container').classList.add('zoom-out');
        document.getElementById('middle-area-text').innerHTML = `<span>It's your turn - choose an attribute!`
        window.scrollTo(0, document.body.scrollHeight);
    }, 5000)
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

    if (playerTurn){
        const statRows = document.getElementsByClassName('stat-row')
        for (let row of statRows){
            row.addEventListener('click', ()=>{
                compareCards(playerDecks, row.dataset.stat)
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
    return {
        userDeck,
        opponentDeck
    }
}

/**
 * Compares player and opponent cards and renders message to screen.
 */

const compareCards = (playerDecks, statIndex) => {
    const playerDetective = playerDecks.userDeck[0]
    const opponentDetective = playerDecks.opponentDeck[0]


    if (playerDetective.facts[statIndex].result > opponentDetective.facts[statIndex].result) {
        let message = `<p>${playerDetective.name} has ${playerDetective.facts[statIndex].result} ${playerDetective.facts[statIndex].stat.toLowerCase()}.</p>`
        const messageArea = document.getElementById('middle-area-text')
        messageArea.innerHTML = message
        setTimeout(()=>{
            message += `<p>Your opponent has ${opponentDetective.name}.</p>`
            messageArea.innerHTML = message
            revealOpponentCard(opponentDetective)
        },2000)
        setTimeout(()=>{
            message += `<p>${opponentDetective.name} has ${opponentDetective.facts[statIndex].result} ${opponentDetective.facts[statIndex].stat.toLowerCase()}.</p>`
            messageArea.innerHTML = message
        },4000)
        setTimeout(()=>{
            message += `<br><p class='confirmation'>You win!</p>`
            messageArea.innerHTML = message
        },6000)
        setTimeout(()=>{
            resetCards()
            passCards(true, playerDecks)

        },8000)


    
    } else {
        alert('Opponent Win - You Lose')
    }
}

const passCards = (playerWin, playerDecks) => {
    const {userDeck, opponentDeck} = playerDecks
    if (playerWin){
        userDeck.push(userDeck.shift())
        userDeck.push(opponentDeck.shift())
        populatePlayerCard(playerDecks, true)
    }
}

const revealOpponentCard = (opponentDetective)=>{
    const dividers = document.getElementsByClassName('divider')
    for (let divider of dividers){
        divider.style.display = 'block'
    }
    document.getElementById('opponent-card').style.backgroundImage = 'none'
    document.getElementById('opponent-card').style.backgroundColor = 'white'
    document.getElementById('opponent-header').textContent = `${opponentDetective.name}`
    document.getElementById('opponent-image').style.backgroundImage = `url(${opponentDetective.image})`
    document.getElementById('opponent-image').style.display='block'

}

/**
 * Resets Opponent Card to Reverse Card Image and clears message box
 */

const resetCards = () => {
    const dividers = document.getElementsByClassName('divider')
    for (let divider of dividers){
        divider.style.display = 'none'
    }
    document.getElementById('opponent-card').style.backgroundImage = 'url("../images/logo2.svg")'
    document.getElementById('opponent-card').style.backgroundColor = '#8C2F39'
    document.getElementById('opponent-header').textContent = ''
    document.getElementById('opponent-image').style.display='none'

}