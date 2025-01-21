#!/usr/bin/env node

const process = require('node:process');
const args = process.argv.slice(2);


/**
 * Generates a random character
 * 
 * @returns string of random lower case letters
 */

function getRandomCharacter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  }


/**
 * Generates a random password
 * 
 * @param {number} paswordLength length of the password
 * @returns string of random lower case letters
 */


function generatePassword(passwordLength = 8) {
    // Ensure passwordLength is an integer and set default if not
    passwordLength = Number.isInteger(passwordLength) ? passwordLength : 8;

    let password = "";
    let character;

    for (let i = 1; i <= passwordLength; i++) {
        character = getRandomCharacter()
        password = password + character
      };
    
    return password;
}



/**
 * Prints the help message
 */
function printHelpMessage() {
    let helpMessage = `Usage: [option]

    Options:
      --length [integer]    Generate a password of specified length. Default is 8.
                            Example: --length 5
                            Result: abcde
    
      --help                Display this help message and exit.
    
    Description:
      This tool generates a random password consisting of lowercase letters. 
      You can specify the length of the password using the '--length' option. 
      If no length is provided, the default password length is 8 characters.
      
    Examples:
      node passwordGen.js --length 12
      Result: Random 12 character password.
    
      node passwordGen.js --help
      Displays help information.
    
    Notes:
      - If an invalid length is provided after '--length', the application will revert to the default length.
      - The password is purely alphabetical and does not include numbers or special characters.
        `;
    
        console.log(helpMessage);
}


/**
 * Handles the arguments provided to the application by the user.
 * 
 * @param {string[]} args The arguments provided by the user
 */


function handleArguments(args) {
    // const options = {
    //     length: 8, // default length
    // };

    if (args.length === 0) {
      printHelpMessage();
      return;
  }

    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '--length':
                let length = 8;
                if (i + 1 < args.length && !isNaN(parseInt(args[i + 1], 10))) {
                    length = parseInt(args[i + 1], 10);
                    const result = generatePassword(length);
                    console.log(`Password: ${result}`);
                    i++;
                }else{
                    console.log('error: Expected an integer after --length. A default length of 8 was used.')
                } 
                break;

            case '--h':
            case '--help':
                printHelpMessage();
                break;

            default : 
                console.log('argument not understood. Type --help for help.')
                return;
        }
    }
}


handleArguments(args);