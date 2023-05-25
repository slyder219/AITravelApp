const toSearch = document.getElementById("toSearch");
const loginButton = document.getElementById("login");
const registerButton = document.getElementById("register");

toSearch.addEventListener("click", handleToSearch);
loginButton.addEventListener("click", handleLogin);
registerButton.addEventListener("click", handleRegister);

function handleToSearch() {
  window.location.href = "/pages/search.html";
}

function handleLogin() {

}

function handleRegister() {
  window.location.href = "/pages/register.html";
}
