#!/usr/bin/env node

const process = require('node:process');
const args = process.argv.slice(2);

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


function parseArguments(args) {
    // const options = {
    //     length: 8, // default length
    // };

    let length = 8;

    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '--length':
                if (i + 1 < args.length && !isNaN(parseInt(args[i + 1], 10))) {
                    length = parseInt(args[i + 1], 10);
                    i++;
                }else{
                    console.log('error: expecting an integer after --length. A default length of 8 will be used.')
                } 
                break;

            case '--help':
                printHelpMessage();
                break;

            default : 
                console.log('argument not understood. Type --help for help.')
        }
    }

    return length;
}


function handleArguments(userArguments) {
    length = parseArguments(args);

    // if (userArguments.includes('--length')) {
    //     console.log(arguments);
    //     length = userArguments[0].split(" ");
    // }
    // // if (userArguments.length === 1) {
    // //     userArguments = userArguments[0].split(" ");
    // // }

    try {
        const result = generatePassword(userArguments);
        console.log(`Result: ${result}`);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        printHelpMessage();
    }

}

handleArguments(args);