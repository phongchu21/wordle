async function playGame() {
  const keyword = await getRandomWord();
  console.log("Keyword:", keyword);

  for (let currRow = 1; currRow <= 6; currRow++) {
    const userGuess = getUserGuess();
    console.log("User guess:", userGuess);

    const result = checkUserGuess(userGuess, keyword);
    printResult(result);

    const guessIsCorrect = result.every((res) => res == "🟢");
    if (guessIsCorrect) {
      console.log("Win!!");
      break;
    }
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
  let checkKeyword = keyword;
  let res = ["🔴", "🔴", "🔴", "🔴", "🔴"];

  for (let i = 0; i < 5; i++) {
    if (userGuess.charAt(i) === checkKeyword.charAt(i)) {
      res[i] = "🟢";
      checkKeyword = checkKeyword.slice(0, i) + "-" + checkKeyword.slice(i + 1);
    }
    // console.log(i, checkKeyword, res);
  }

  for (let i = 0; i < 5; i++) {
    if (checkKeyword.includes(userGuess.charAt(i)) && res[i] != "🟢") {
      res[i] = "🟡";
      checkKeyword = checkKeyword.slice(0, i) + "-" + checkKeyword.slice(i + 1);
    }
    // console.log(i, checkKeyword, res);
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

fetchDictionary().then(playGame());
