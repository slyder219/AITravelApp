// element variables
const toSearch = document.getElementById("toSearch");
const loginButton = document.getElementById("login");
const registerButton = document.getElementById("register");
const testDatabase = document.getElementById("testDatabase");

// event listeners
toSearch.addEventListener("click", handleToSearch);
loginButton.addEventListener("click", handleLogin);
registerButton.addEventListener("click", handleRegister);
testDatabase.addEventListener("click", handleTestDatabase);

// functions
function handleToSearch() {
  window.location.href = "/search";
}

function handleTestDatabase() {
  window.location.href = "/databaseTest"
}

async function handleLogin() {
  window.location.href = "/loginPage";
}

function handleRegister() {
  window.location.href = "/register";
}
