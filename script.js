// Declare Global Variables

var userInput = ""; // Generates the password based on user-input criteria
var endPassword = ""; // Temporarily stores a random passoword.
var displayPassword = ""; // Displays the finalized password on the html interface.

// Object to use later for criteria and random generating values.
var passwordCriteria = {
  lowercase: {indexNumber: 0 , criteria: "abcdefghijklmnopqrstuvwxyz"
  },
  uppercase: {indexNumber: 1, criteria: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  },
  numeric: {indexNumber: 2, criteria: "0123456789"
  },
  characters: {indexNumber: 3, criteria: " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
  }
}

// Call function to generate password.
var generatePassword = function() {
 
  // Take user input
    userInput = window.prompt("Select one or more criteria for password (separate with space): 1=lowercase characters 2=uppercase characters 3=numeric characters 4=special characters.");
    // If user enters cancel, they will be prompted restart the process.
  if (!userInput) {
    window.alert("Please select 'Generate Password'.")
        return;
  } else {
    userInput = userInput.split(" "); // If user entered "1 2 3", split method removes spaces, making userInput = [1,2,3];
  }

  // Notify the user with their selection. 
  window.alert("You have selected: " + userInput);

 // Determines if input criteria is valid.
 for (var i = 0; i < userInput.length; i++) {

  var inputCriteria = userInput[i];

  var inputCriteriaInteger = parseInt(inputCriteria); //If a user inadvertantly enters 1a, 1x, or 1% it will be interpreted as 1.
  //console.log(parseInt(inputCriteriaInteger));

  switch(inputCriteriaInteger) { //case executes based on valid inputCriteria by User.
    case 1:
    case 2:
    case 3:
    case 4:
      break; //leaves the switch block.
    default: // Values entered that are not 1, 2 ,3 or 4 is caught here and asks the user to reselect until valid criteria is selected.
      if (!inputCriteriaInteger) { 
        window.alert("Please only use values from 1-4 separated by a space. Restarting application...");
        generatePassword(); 
      }
      else { 
        window.alert(" Please select a criteria using numbers and only from 1-4 seprated by space." + " User input: " + inputCriteria + " is invalid");
        generatePassword(); 
      } 
    }
 }

    //Declare variables
  var pLength = passLength();
  displayPassword = pRandom(userInput,pLength);

  function pRandom(userInput, pLength) {
    var randomValue = 0;
    var counter = userInput.length //Counter is required to end the while-loop.
    var userCounter = userInput.length // Required for generating characters past the first 4 (assuming user selects 1 2 3 4) until the pLength is satisfied.
    var endPassword = "";  // Required for concatenating the strings together for the reported displayPassword.

    // For-loop required to start the password generation process. The simpler the requirements (i.e. user chooses 1 instead of 1 2 3), the less iterations for the for-loop and the more iterations for the following while-loop. 
    for (var i = 0; i < userInput.length; i++) {

      var properCriteria = userInput[i];
      // Generates lowercase letters.
      if (properCriteria === "1") {
        //Generates a random number between 0-25 which randomly selects a lowercase character.
        randomValue = Math.floor(Math.random() * 26);
        //Adds the selected lowercase character to endPassword.
        endPassword += passwordCriteria.lowercase.criteria[randomValue];

      } else if (properCriteria === "2") {
        //Generates uppercase letters.
        randomValue = Math.floor(Math.random() * 26);
        endPassword += passwordCriteria.uppercase.criteria[randomValue];

      } else if (properCriteria === "3") {

        //Generates a random number from 0-9.
        randomValue = Math.floor(Math.random() * 10);
        endPassword += passwordCriteria.numeric.criteria[randomValue];

      } else if (properCriteria === "4") {

        //Generates a random special character.
        randomValue = Math.floor(Math.random() * 31);
        endPassword += passwordCriteria.characters.criteria[randomValue];
      } 
      //console.log(randomValue);
      
    }

    //While loop adds the remaining characters to endPassword.
    while (counter < pLength)  {

        userCounter = Math.floor(((Math.random() * userInput.length) + 1)); //Generates a value from 0 to 4, assuming user selected [1 2 3 4] (range of value generated grows depending on pw complexity)
        counter += 1; //Required for ending the while-loop once the password's length has been satisfied.
      
      var inputCriteria = userInput[(userCounter - 1)];
      
      // Ensures the input is in integer form.  Removes follow-up typos by user (i.e. 1a 2d 3$).
      var inputCriteriaInteger = parseInt(inputCriteria);

      switch(inputCriteriaInteger) { // Switch case to assign characters to endPassword.  Random integer is generated based on user inputs that in turn generates another pw character.
        case 1:
          // If user only selected lowercase characters, then only case 1 would execute, generating only lowercase characters for the entirety of the endPassword.
          randomValue = Math.floor(Math.random() * 26);
          endPassword += passwordCriteria.lowercase.criteria[randomValue];
            break;
        case 2:
          randomValue = Math.floor(Math.random() * 26);
          endPassword += passwordCriteria.uppercase.criteria[randomValue];
          break;
        case 3:
          randomValue = Math.floor(Math.random() * 10);
          endPassword += passwordCriteria.numeric.criteria[randomValue];
          break;
        case 4:
          randomValue = Math.floor(Math.random() * 31);
          endPassword += passwordCriteria.characters.criteria[randomValue];
          break;
      }
    }
    //Final password is ready for display.
    console.log(endPassword);
    return endPassword;
  }

  function passLength () { // Asks the user's preferred pw length from 8-128 characters.
    
    window.alert("What is the length of your password from 8-128 characters?");
    var pLength = parseInt(window.prompt("Please enter your password length")); // The user's entry is converted to an integer to check valid input.
    //console.log(pLength); //logs 8 when user inputs 8 as pLength.
    if (pLength < 8 || pLength > 128) {
      
      window.alert("Please enter a valid number between 8-128");
      passLength();

    } else if (!pLength) { // If user input a null or Nan value, they will be prompted to select the pLength again.
      window.alert("Please enter a valid number between 8-128")
      passLength();
    } else {
      window.alert("You have entered a valid lenght of: " + pLength + "\n Password will now be generated");
      return pLength; // Informs the user that they selected a valid pLength.
    }
  }
}

// Function for ultimately writing the password to the #password input on html.
function writePassword() {
 
  var password = generatePassword(); // Call the generatePassword() function.
  var passwordText = document.querySelector("#password"); // Part of the placholder text querySelectors will be part of later modules.
  
  document.getElementById("password").readOnly = false; // Allows the code to insert password into the designated text area.
  document.getElementById("password").value = displayPassword; // Displays password in text area.
  document.getElementById("password").readOnly = true; // Prevents the user from modifying the password within the text area.
}

// Retrieves references for the #generate element
var generateBtn = document.querySelector("#generate"); //selects button from html to initiate code.
// Adds event listener to generate button
generateBtn.addEventListener("click", writePassword); //allows the Generate Password button to be clicked, thereby initiating the code.