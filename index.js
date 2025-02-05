async function playGame() {
  const keyword = await getRandomWord();
  console.log("Keyword:", keyword);

  const userGuess = getUserGuess();
  console.log("User guess:", userGuess);

  const result = checkUserGuess(userGuess, keyword);
  printResult(result);
}

// TODO: GET USER GUESS WORD
function getUserGuess() {
  // Lay input tu ban phim
  let input = "";
  while (input.length != 5) {
    input = prompt("Enter 5 letter word:");
  }
  return input;
}

// TODO: PRINT GUESS RESULT
function printResult(res) {
  console.log(res);
}

function checkUserGuess(userGuess, keyword) {
  let res = "";
  for (let i = 0; i < 5; i++) {
    if (userGuess.charAt(i) === keyword.charAt(i)) {
      res += "🟢";
    } else if (keyword.includes(userGuess.charAt(i))) {
      res += "🟡";
    } else {
      res += "🔴";
    }
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

playGame();
