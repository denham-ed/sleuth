const renderDetectives = ()=>{
    let detectiveListing = ''
    detectives.forEach((detective) => {
        detectiveListing += `<div class='detective-listing'>
        <div class="listing-left">
            <div class=listing-image style="background-image: url(${detective.image});"></div>
        </div>
        <div class="listing-middle">
            <div>${detective.name}</div>
            <div>Created by: Some Author</div>
        </div>
        <div class="listing-right">A fake biography goes here. They have all these shows and have solved loads and loads of cases</div>
        </div>`
    })
    document.getElementById('detectives-listing').innerHTML = detectiveListing
}

renderDetectives()