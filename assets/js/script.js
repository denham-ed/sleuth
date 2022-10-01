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
        }, 3000)
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