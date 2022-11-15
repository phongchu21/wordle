async function playGame(keyword) {
  let guessIsCorrect = false;

  for (let currRow = 1; currRow <= 6 && !guessIsCorrect; currRow++) {
    const userGuess = getUserGuess();
    console.log("User guess:", userGuess);

    const result = checkUserGuess(userGuess, keyword);
    printResult(result);

    guessIsCorrect = result.every((res) => res == "🟢");
  }

  if (guessIsCorrect) {
    console.log("Win");
  } else {
    console.log("Lose");
    console.log(keyword);
  }
}

// TODO: GET USER GUESS WORD
let dictionary = [];
async function fetchDictionary() {
  const res = await fetch("./dictionary.json");
  dictionary = await res.json();
}

function getUserGuess() {
  // Lay input tu ban phim
  let input = "";
  while (inputNotValid(input)) {
    input = prompt("Enter 5 letter word:");
  }
  return input;
}

function inputNotValid(input) {
  return input.length != 5 || !dictionary.includes(input);
}

// TODO: PRINT GUESS RESULT
function printResult(res) {
  console.log(res);
}

function checkUserGuess(userGuess, keyword) {
  // Pass 2 strings and return a array
  // TODO: Pass 2 array instead

  let checkKeyword = keyword;
  let res = ["🔴", "🔴", "🔴", "🔴", "🔴"];

  for (let i = 0; i < 5; i++) {
    if (userGuess.charAt(i) === checkKeyword.charAt(i)) {
      res[i] = "🟢";
      const cutIndex = i;
      checkKeyword =
        checkKeyword.slice(0, cutIndex) +
        "-" +
        checkKeyword.slice(cutIndex + 1);
    }
    // console.log(userGuess.charAt(i), checkKeyword, res);
  }

  for (let i = 0; i < 5; i++) {
    if (checkKeyword.includes(userGuess.charAt(i)) && res[i] != "🟢") {
      res[i] = "🟡";
      const cutIndex = checkKeyword.indexOf(userGuess.charAt(i));
      checkKeyword =
        checkKeyword.slice(0, cutIndex) +
        "-" +
        checkKeyword.slice(cutIndex + 1);
    }
    // console.log(userGuess.charAt(i), checkKeyword, res);
  }

  return res;
}

async function getRandomWord() {
  const res = await fetch("./targetWords.json");
  const data = await res.json();
  const keyword = random_item(data);
  return Promise.resolve(keyword);
}

function random_item(items) {
  return items[Math.floor(Math.random() * items.length)];
}

async function testGuessChecker() {
  // https://github.com/yukosgiti/wordle-tests
  let errorCount = 0;

  const res = await fetch("./tests.json");
  const bigTestCase = await res.json();

  bigTestCase.forEach((testWord) => {
    const word = testWord.slice(0, 5);
    const guess = testWord.slice(6, 11);

    const output = checkUserGuess(guess, word).reduce(
      (outStr, char) =>
        outStr + (char == "🟢" ? "c" : char == "🟡" ? "m" : "w"),
      ""
    );

    if (output !== testWord.slice(12, 17)) {
      console.log(testWord, output);
      errorCount++;
    }
  });

  console.log(`Test Done! ${errorCount} error.`);
}

(async function () {
  await fetchDictionary();
  const keyword = await getRandomWord();
  playGame(keyword);
  // testGuessChecker();
})();
