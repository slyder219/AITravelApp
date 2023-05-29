const form = document.getElementById("personalityForm");
const submitButton = document.getElementById("submitPersonality");

submitButton.addEventListener("click", handleSubmission);

function handleSubmission(e) {
    e.adPreventDefault();

    const formData = new FormData(form);
    const jsonData = {};

    for (const pair of formData.entries()) {
        const question = pair[0];
        const rating = pair[1];

        jsonData[question] = rating;

    }

    // Sean leaving off here-- next step is to 
    //  send jsonData to the server and add it to the user's
    //  profile in the database. For that we should also update the schema. 

}