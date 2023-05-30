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

        const successBool = data.success;

        if ( successBool == true ){
            window.location.href = '/welcome';
            return
        } else {
            const resultDiv = document.getElementById('result');
            const output = data.message;
            resultDiv.innerHTML = `<p class="has-text-danger is-size-3">${output}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        console.log(error)
        username.placeholder = 'Account Not Found';
    };
    


};