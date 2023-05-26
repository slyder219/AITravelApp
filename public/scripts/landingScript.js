// element variables
const toSearch = document.getElementById("toSearch");
const loginButton = document.getElementById("login");
const registerButton = document.getElementById("register");
const testDBButton = document.getElementById("testDatabase");

// event listeners
toSearch.addEventListener("click", handleToSearch);
testDBButton.addEventListener("click", dbHandler);
loginButton.addEventListener("click", handleLogin);
registerButton.addEventListener("click", handleRegister);

// functions

function dbHandler() {
  window.location.href = "/databaseTest";
}

function handleToSearch() {
  window.location.href = "/search";
}



async function handleLogin() {
  window.location.href = "/loginPage";
}

function handleRegister() {
  window.location.href = "/register";
}
