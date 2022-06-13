const logIn_link = document.querySelector(".log-in");
const logOut = document.querySelector(".log-out");
const register = document.querySelector(".register");
const userName = document.querySelector(".user-name");
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
if (userInfo) {
    logIn_link.style.display = "none";
    register.style.display = "none";
    userName.innerHTML = userInfo.username;
} else {
    logOut.style.display = "none";
}
logOut.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
});

