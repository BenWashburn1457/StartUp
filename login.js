function login() {
    const nameEl = document.querySelector("#name");
    localStorage.setItem("userName", nameEl.value);
    console.log(nameEl.value)
    window.location.href = "play.html"
    console.log(nameEl.value)
}