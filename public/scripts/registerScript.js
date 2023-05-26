const form = document.getElementById('registerForm');
const result = document.getElementById('result');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission

    // Get input elements by their IDs
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const email = document.getElementById('email');

    try {
        // Send a POST request to the server
        const response = await fetch(`/register?username=${username.value}&password=${password.value}&email=${email.value}`, {
            method: 'POST'
        });

        const data = await response;

        result.textContent = data.message;

        form.reset();

    } catch (error) {
        console.error('Error:', error);

        result.textContent = "An error occurred";
    }
});