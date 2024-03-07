async function loadLeaderboard() {
    let leaderboard =[];
    try {
        const response = await fetch('/api/leaderboard');
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

        Object.values(score).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });

        table.appendChild(row)
    }
}




userName = localStorage.getItem("userName");

if (userName) {
    const user = document.querySelector(".name");
    if(user) {user.textContent = userName;}
}

loadLeaderboard();
