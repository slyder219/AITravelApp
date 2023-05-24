

// form submisison
function handleFormSubmit(event){
    console.log("Form submitted");
    event.preventDefault(); // Prevent default form submission

    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;
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
        // create div for each flight option
        const flightDiv = document.createElement("div");    
        // add class to div
        flightDiv.classList.add("flight-option");

        // create paragraph element to display duration
        const duration = document.createElement("p");
        // grab duration from json and add to paragraph
        duration.textContent = `Duration: ${option.itineraries[0].duration}`;

        // create paragraph element to display price
        const price = document.createElement("p");
        // grab price from json and add to paragraph
        price.textContent = `Price: ${option.price.grandTotal}`;

        // create paragraph element to display departure time
        const departureTime = document.createElement("p");
        // grab departure time from json and add to paragraph
        departureTime.textContent = `Departure Time: ${option.itineraries[0].segments[0].departure.at}`;

        // create paragraph element to display arrival time
        const arrivalTime = document.createElement("p");
        // grab arrival time from json and add to paragraph
        arrivalTime.textContent = `Arrival Time: ${option.itineraries[0].segments[0].arrival.at}`;

        // create paragraph element to display airline
        const airline = document.createElement("p");
        // grab airline from json and add to paragraph
        airline.textContent = `Airline: ${option.itineraries[0].segments[0].carrierCode}`;

        // create paragraph element to display flight number
        const flightNumber = document.createElement("p");
        // grab flight number from json and add to paragraph
        flightNumber.textContent = `Flight Number: ${option.itineraries[0].segments[0].number}`;

        // create paragraph element to display is one way is true or false
        const oneWay = document.createElement("p");
        // grab one way from json and add to paragraph
        oneWay.textContent = `One Way: ${option.oneWay}`;

        // create a divider between flight options
        const divider = document.createElement("hr");
        divider.textContent = "";

        // add all elements to flight div
        flightDiv.appendChild(duration);
        flightDiv.appendChild(price);
        flightDiv.appendChild(departureTime);
        flightDiv.appendChild(arrivalTime);
        flightDiv.appendChild(divider);
        flightDiv.appendChild(airline);
        flightDiv.appendChild(flightNumber);
        flightDiv.appendChild(oneWay);

        // add that div to the flight container
        flightContainer.appendChild(flightDiv);
    });
}

// event listener for form submission

document.getElementById("flightForm").addEventListener("submit", handleFormSubmit);