

// form submisison
function handleFormSubmit(event){
    console.log("Form submitted");
    event.preventDefault(); // Prevent default form submission

    const origin = document.getElementById("origin").ariaValueMax;
    const destination = document.getElementById("destination").ariaValueMax;
    const date = document.getElementById("date").value;

    // make the api call
    fetch(`/flights?origin=${origin}&destination=${destination}&date=${date}`)
    .then(response => response.json())
    .then(data => {
        // Process response and update UI
        displayFlightOptions(data);
    })
    .catch(error => {
        console.error(error);
        console.log("Error2");
    });
}

// display flight options on webpage
function displayFlightOptions(flightOptions){
    const flightContainer = document.getElementById("flightContainer");
    flightContainer.innerHTML = ""; // clear any previous

    flightOptions.forEach(option => {
        const flightDiv = document.createElement("div");
        flightDiv.classList.add("flight-option");

        const duration = document.createElement("p");
        duration.textContent = `Duration: ${option.itineraries[0].duration}`;

        const price = document.createElement("p");
        price.textContent = `Price: ${option.price.grandTotal}`;

        // add more elements to display other flight details 

        flightDiv.appendChild(duration);
        flightDiv.appendChild(price);

        flightContainer.appendChild(flightDiv);
    });
}

// event listener for form submission

document.getElementById("flightForm").addEventListener("submit", handleFormSubmit);