#!/usr/bin/env node

const process = require('node:process');
const args = process.argv.slice(2);


function getRandomCharacter(charList) {
    let randomIndex = Math.floor(Math.random() * charList.length);
    return charList[randomIndex];
  }

function shuffleString(str) {
    let array = str.split(''); // Convert the string to an array of characters
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array.join(''); // Convert the array back into a string
}

function printHelpMessage() {
  let helpMessage = `Usage: [option]

  Options:
    --length [integer]    Generate a password of specified length. Default is 8.
                          Example: --length 5
                          Result: abcde
  
    --num                 Include numbers (0-9) in the password.
                          Example: --num
                          Result: a8bc7de6

    --upper               Include uppercase characters.
                          Example: --upper
                          Result: abcDeFgh

    --symbol              Include ASCII symbols.
                          Example: --symbols
                          Result: abcDe$!h
                                          
    --help                Display this help message and exit.

    
  Description:
    This tool generates a random password. By default, the password contains 
    8 lowercase characters. You can customize the length of the password using 
    the '--length' option. You can also add upper case, numbers, or symbols to 
    the password using the flags above.
    
  Examples:
    node passwordGen.js --length 12 --num
    Result: Random 12 character password that includes lowercase characters and numbers.
  
    node passwordGen.js --help
    Displays help information.
  
  Notes:
    - If an invalid length is provided after '--length', the application will revert to the default length.
      `;
  
      console.log(helpMessage);
}


/**
 * Generates a random password
 * 
 * @param {number} paswordLength length of the password
 * @param {string[]} options is a list of options (upper, nums, symbols) 
 * @returns {string} generated password
 */

function generatePass(passwordLength = 8, options = []) {

  const lowerAlpha = "abcdefghijklmnopqrstuvwxyz";
  const upper = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
  const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>?/";
  const nums = "0123456789";

  let password = "";
  let charList = lowerAlpha;
  password += getRandomCharacter(lowerAlpha)

    for (let i = 0; i < options.length; i++) {
      switch (options[i]) {
          case 'upper':
            charList = charList + upper;
            password += getRandomCharacter(upper)
            break;
          case 'nums':
            charList = charList + nums;
            password += getRandomCharacter(nums)
            break;
          case 'symbols':
            charList = charList + symbols;
            password += getRandomCharacter(symbols)
            break;
      }
    }
  
  for (let i = (1 + options.length); i <= passwordLength; i++) {
      password += getRandomCharacter(charList)
    };
  
  password = shuffleString(password);
  return password;
}


/**
 * Handles the arguments provided to the application by the user.
 * 
 * @param {string[]} args The arguments provided by the user.
 */

function handleArguments(args) {
  const options = []
  let length = 8;

  if (args.length === 0) {
    printHelpMessage();
    return;
}

  for (let i = 0; i < args.length; i++) {
      switch (args[i]) {
          case '--length':
              if (i + 1 < args.length && !isNaN(parseInt(args[i + 1], 10))) {
                  length = parseInt(args[i + 1], 10);
                  i++;
              } else {
                  console.log('Note: Expected an integer after --length. A default length of 8 was used.');
              } 
              break;
          case '--num':
          case '--nums':
              options.push('nums')
              break
          case '--symbols':
          case '--symbol':
              options.push('symbols')
              break
          case '--upper':
              options.push('upper')
              break
          case '--h':
          case '--help':
              printHelpMessage();
              break;

          default : 
              console.log('Argument not understood. Type --help for help.\n')
              return;
      }
  }

result = generatePass(length, options);
console.log('password: ' + result + '\n');
}


// Main program execution starts here

handleArguments(args);