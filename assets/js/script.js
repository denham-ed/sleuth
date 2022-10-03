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
        document.getElementById('middle-area-logo').innerHTML=``
        document.getElementById('middle-area-text').innerHTML = ``
        document.getElementById('main-logo').parentElement.removeChild(document.getElementById('main-logo'))
        const middleArea = document.getElementById('middle-area')
        middleArea.classList.remove('start-message')
        middleArea.classList.add('middle-area-main')
        // 
        setTimeout(()=>{
            populatePlayerCard(detectives[Math.floor(Math.random() * 16)])
            // populatePlayerCard(detectives[2])
            document.getElementById('card').style.display='flex'
        },3000)
    }
}


/**
 * Prepares game for user by randomising order of Detectives array, 
 * randomly assigning cards to each player and displaying a "Loading" screen
 */
const prepareGame = () => {
    // Add Loading Text to Screen in Sequence
    document.getElementById('middle-area-text').innerHTML = `<div>The game is afoot...</div>`
    document.getElementById('middle-area-logo').innerHTML =    `<i class="fa-solid fa-magnifying-glass"></i>`
    
    const loadingArray = ['Gathering Clues', 'Polishing Magnifying Glass', 'Sharpening Pencil', 'Interviewing Witnesses']
    let loadingText = ''
    addLoadingItem(loadingArray, 0)

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