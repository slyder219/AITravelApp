const form = document.getElementById('loginForm');
const result = document.getElementById('result');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {

        const response = await fetch(`/login?username=${username}&password=${password}`, {
            method: 'GET'
        });

        const data = await response.json();
        result.textContent = data.message;
        form.reset()

    } catch (error) {
        console.error('Error:', error);
        result.textContent = "An error occurred";
    }
    


});