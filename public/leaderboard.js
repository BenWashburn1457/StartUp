userName = localStorage.getItem("userName");

if (userName) {
    const user = document.querySelector(".name");

    if(user) {
        user.textContent = userName;
    }
}