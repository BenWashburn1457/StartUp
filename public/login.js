async function login() {
    try {
        const response = await fetch('/auth/', {
            method: 'POST'
        });
        leaderboard = await response.json();
        
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    const nameEl = document.querySelector("#name");
    localStorage.setItem("userName", nameEl.value);

    window.location.href = "play.html"
}