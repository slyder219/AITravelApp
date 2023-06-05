const questions = {
    'How adventurous are you?': ['Very', 'Somewhat', 'Not Very', 'Not at all'],
    'How often do you like to try new things?': ['Whenever I can', 'Sometimes', 'Rarely', 'Never'],
    'How interested are you in learning about local cultures?': ['Very', 'Somewhat', 'Not Very', 'Not at all'],
    'How important is it to you to have a plan when you travel?': ['Very', 'Somewhat', 'Not Very', 'Not at all'],
    'Beachy or mountainous?': ['Beachy!', 'Mountainous!', 'I like both!']
  };
  
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