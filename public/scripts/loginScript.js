const form = document.getElementById('loginForm');
const result = document.getElementById('result');

form.addEventListener('submit', handleSubmission); 


async function handleSubmission(e){
    e.preventDefault(); // Prevent form submission


    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`/login?username=${username}&password=${password}`, {
            method: 'GET'
        });

        form.reset()
        if (response.success === true){} else {
            result.textContent = "Account not found";
            return 
        }
    } catch (error) {
        console.error('Error:', error);
        console.log(error)
        result.textContent = "An error occurred";
    } finally {
        window.location.href = '/welcome';
    }
    


};