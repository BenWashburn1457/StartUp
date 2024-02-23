userName = localStorage.getItem("userName")
console.log("wassup")
if (userName) {
    const user = document.querySelector(".name");

    if(user) {
        user.textContent = userName;
    }
}