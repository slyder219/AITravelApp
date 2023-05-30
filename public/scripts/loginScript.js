const form = document.getElementById('loginForm');

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

        const data = await response.json();

        if ( data.success == true ){
            window.location.href = '/welcome';
            return
        } else { return } 
    } catch (error) {
        console.error('Error:', error);
        console.log(error)
        result.textContent = "An error occurred";
    }
    


};