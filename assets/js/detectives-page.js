/**
 * Displays home button to user
 */
const showButtons = () => {
    const button = document.getElementsByClassName('home-button')[0]
    button.style.display = 'block'
}

/**
 * Renders a listing for each detective to the screen
 */
const renderDetectives = () => {
    let detectiveListing = ""
    detectives.forEach((detective) => {
        detectiveListing +=
            `<div class='detective-listing'>
            <div class="listing-left">
                <div class=listing-image style="background-image: url(${detective.image});"></div>
            </div>
            <div class="listing-middle">
                <h2>${detective.name}</h2>
                <div><span class="red">Created by:</span> ${detective.creator}</div>
            </div>
            <div class="listing-right">${detective.biography}</div>
        </div>`
    })
    document.getElementById('detectives-listing').innerHTML = detectiveListing
}

showButtons()
renderDetectives()