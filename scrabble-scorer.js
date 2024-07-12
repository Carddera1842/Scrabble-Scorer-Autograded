// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");
let userWord = "";

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! ");
   userWord = input.question("\nEnter a word to score: ");
};

let newPointStructure = transform(oldPointStructure);
newPointStructure[" "] = 0;

let simpleScorer = function(word){
   word = word.toLowerCase();
   let letterPoints = "";
   for (let i = 0; i < word.length; i ++){
      letterPoints ++
   }
   return Number(letterPoints);
}

let vowelBonusScorer = function(wordWithVowels) {
   let vowelScoresStructure = {
      3:["A","E","I","O","U"],
      1:["B","C","D","F","G","H","J","K","L","M","N","P","R","S","T","V","W","X","Y","Z"],
      0:[" "]
      };
   wordWithVowels = wordWithVowels.toUpperCase().split("");;
   let letterPoints = 0;
   for (let i = 0; i < wordWithVowels.length; i++) {
      for (const pointValue in vowelScoresStructure) {
        if (vowelScoresStructure[pointValue].includes(wordWithVowels[i])) {
          letterPoints = letterPoints + Number(pointValue);
        }
      }
    }
    return letterPoints;
}


let scrabbleScorer = function (scrabbleWord) {
   scrabbleWord = scrabbleWord.toLowerCase().split('');
   let letterPoints = 0;
   for (let i = 0; i < scrabbleWord.length; i++) {
      for (const letter in newPointStructure) {
         if (letter === (scrabbleWord[i])) {
            letterPoints = letterPoints + Number(newPointStructure[letter]);
         }
      }
   }
   return letterPoints;
}


const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer,
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer,
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer,
   },
];


function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use? \n");
   for (let i = 0; i < 3; i++){
      console.log(`${[i]} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
   }

   let userChoice = input.question("Enter 0, 1, or 2: ");
   while (userChoice < 0 || userChoice > 2 || isNaN(userChoice)) {
      console.log("Oops! Invalid Input!");
      userChoice = input.question("Enter 0, 1, or 2: ");
   }
   if (userChoice == 0){
      console.log(`Score for '${userWord}': ${scoringAlgorithms[0].scorerFunction(userWord)}`);
      } else if (userChoice == 1) {
         console.log(`Score for '${userWord}': ${scoringAlgorithms[1].scorerFunction(userWord)}`)
         } else {
            console.log(`Score for '${userWord}': ${scoringAlgorithms[2].scorerFunction(userWord)}`)
            }
   return userChoice;
}


function transform(object) {
   let newStructure = {};
      for (number in oldPointStructure) {
         for (let i = 0; i < oldPointStructure[number].length; i++) {
         newStructure[oldPointStructure[number][i].toLowerCase()] = Number(number);
        }
      }
    return newStructure;
}

function runProgram() {
   initialPrompt();
   scorerPrompt();  
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
