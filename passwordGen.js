#!/usr/bin/env node

const process = require('node:process');

/**
 * Generates a random character
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


function generatePassword(passwordLength) {
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
    console.log(`
Usage: length [integer]


Example:
  length 5
  Result: abcde
    `);
}


/**
 * Handles the arguments provided to the application by the user.
 * 
 * @param {string[]} userArguments The arguments provided by the user
 */

function handleArguments(userArguments) {
    if (userArguments.length === 0) {
        printHelpMessage();
        return;
    }

    if (userArguments.length === 1) {
        userArguments = userArguments[0].split(" ");
    }

    try {
        const result = generatePassword(userArguments);
        console.log(`Result: ${result}`);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        printHelpMessage();
    }
}

handleArguments(process.argv.slice(2));
