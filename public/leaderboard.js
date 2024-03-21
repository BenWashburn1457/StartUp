async function loadLeaderboard() {
    let leaderboard =[];
    try {
        const response = await fetch('/api/leaderboard', {
            method: 'GET'
        });
        leaderboard = await response.json();
        
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    } catch {

        const leaderboardText = localStorage.getItem('scores');
        if (leaderboardText) {
            leaderboard = JSON.parse(leaderboardText);
        }
    }
    displayLeaderboard(leaderboard);
}

function displayLeaderboard(leaderboard) {
    let table = document.querySelector("#leaderboard")
    for(const[i, score] of leaderboard.entries()) {
        const row = document.createElement('tr');

        Object.values(score).slice(1).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });

        table.appendChild(row)
    }
}

async function getQuote() {
    try {
        
        const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=success', {
            headers: {
                'X-Api-Key' : '5eUfhqL4ee9xih8bKX96MuNBkps0cJG74Xt6b4vC'
            }
        });
        quote = await response.json();
        quote = quote[0];

    } catch {
        // quote = "After all that has been said, there is no avoiding the poop corn"
    }
    displayQuote(quote)
}

function displayQuote(quoteText) {
    let quote = document.querySelector('#quote');
    let author = document.querySelector('#author');
    quote.textContent = quoteText.quote;
    author.textContent = quoteText.author;
}

userName = localStorage.getItem("userName");

if (userName) {
    const user = document.querySelector(".name");
    if(user) {user.textContent = userName;}
}

loadLeaderboard();
getQuote();