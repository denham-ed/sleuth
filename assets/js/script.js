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
        }, 500)
    } else {
        document.getElementById('middle-area-logo').innerHTML = ``
        document.getElementById('middle-area-text').innerHTML = ``
        document.getElementById('main-logo').parentElement.removeChild(document.getElementById('main-logo'))
        const middleArea = document.getElementById('middle-area')
        middleArea.classList.remove('start-message')
        middleArea.classList.add('middle-area-main')
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
        // populatePlayerCard(detectives[Math.floor(Math.random() * 16)])
        console.log(playerDecks)
        populatePlayerCard(playerDecks.userDeck[0])
        document.getElementById('card').style.display = 'flex'
    }, 3000)
}

const populatePlayerCard = (detective) => {
    document.getElementById('card-header').textContent = detective.name
    document.getElementById('card-image').style.backgroundImage = `url(${detective.image})`
    // Stats
    let statsHTML = ''
    detective.facts.forEach((fact) => {
        statsHTML +=
            `    
            <tr class="stat-row">
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