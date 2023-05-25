const form = document.getElementById('testForm');


form.addEventListener('submit', async (e) => {
e.preventDefault(); // Prevent form submission

// Get input elements by their IDs
const abrEl = document.getElementById('abr');
const countryEl = document.getElementById('country');
const stateEl = document.getElementById('state');

// Get the values from the input elements
const abr = abrEl.value;
const country = countryEl.value;
const state = stateEl.value;



try {
    // Send a POST request to the server
    const response = await fetch(`/testSave?abr=${abr}&country=${country}&state=${state}`, {
    method: 'POST'
    });

    // Parse the response data as JSON
    const data = await response.json();
    console.log(data);

    // Update the result element with a success message
    result.textContent = data.message;
    abrEl.value = '';
    countryEl.value = '';
    stateEl.value = ''
} catch (error) {
    console.error('Error:', error);

    // Update the result element with an error message
    result.textContent = "An error occurred";
}
});

