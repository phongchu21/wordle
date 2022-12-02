// -------------------------------------------------------------

// guesses là một mảng có 6 phần từ
// tương ứng với 6 lần mà người dùng nhập
// lưu lại tiến trình chơi của người dùng

// Mỗi phần từ lớn là một mảng có 5 phần từ con
// Mỗi phần tử con chứa một chữ cái mà người dùng chọn
let guesses = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];



// gọi hàm getUserGuess lấy từ mà người dùng đoán dưới dạng chuỗi
function getUserGuess(row = currentRow) {
  return guesses[row].join("");
}

// currentRow cho biết lượt thử hiện tại của người dùng
// currentRow là một số nguyên có giá trị từ 0 đến 5
let currentRow = 0;

// currentRow cho biết con trỏ mà người dùng nhập ở lượt hiện tại
// currentRow là một số nguyên có giá trị từ 0 đến 4
let currentTile = 0;

// keyword là từ mà người dùng cần phải tìm
// keyword sẽ được tạo ngẫu nhiên
let keyword = "";

let isWinning = false;

// -------------------------------------------------------------
// KEYBOARD EVENT

const keys = document.querySelectorAll(".key");
keys.forEach((key) => {
  key.addEventListener("click", () => {
    // Người dùng chỉ có thể ấn khi trò chơi chưa kết thúc
    if (gameIsOver()) return;

    // Tuỳ vào loại phím mà người dùng có thể thêm, xoá ký tự
    // hoặc gửi lên để hệ thống kiểm tra kết quả
    switch (key.id) {
      case "key-enter":
        submitGuess();
        break;

      case "key-delete":
        deleteLetter();
        break;

      default:
        const letter = getLetterFromKey(key);
        addLetter(letter);
        break;
    }
  });
});

function getLetterFromKey(key) {
  // Trả về chữ cái tương ứng với phím key
  // Dữ liệu trả về là chuỗi có 1 ký tự
  return key.id.charAt(key.id.length - 1);
}

// -------------------------------------------------------------
// UPDATE LETTER

function addLetter(letter) {
  if (canAddLetter()) {
    updateGuess(letter);
    currentTile++;
    console.log(
      `Guess is '${getUserGuess()}'`,
      `Cursor is at row ${currentRow}, tile ${currentTile}`
    );
  }
}

function deleteLetter() {
  if (canDeleteLetter()) {
    currentTile--;
    updateGuess("");
    console.log(
      `Guess is '${getUserGuess()}'`,
      `Cursor is at row ${currentRow}, tile ${currentTile}`
    );
  }
}

function updateGuess(letter, tile = currentTile, row = currentRow) {
  guesses[row][tile] = letter;
  updateTileLetter();
}

function updateTileLetter(
  letter = guesses[currentRow][currentTile],
  row = currentRow,
  tile = currentTile
) {
  // TODO: Cập nhập ký tự letter lên Board
  // dựa vào row và tile để xác định vị trí cần thêm vào
  row++;
  const nextRow = document.getElementById('row-' + row);
  const nextTile = nextRow.querySelectorAll('span.tile');
  nextTile[tile].textContent=letter

}

function canAddLetter(tile = currentTile) {
  return tile < 5;
}
function canDeleteLetter(tile = currentTile) {
  return tile > 0;
}

// -------------------------------------------------------------
// SUMMIT & CHECK GUESS

function submitGuess() {
  if (guessIsValid()) {
    const result = checkUserGuess();
    console.log(result);

    // result sẽ trả về một mảng 5 phần tử
    // chứa 1 trong 3 giá trị correct, present hoặc absent

    addTilesColor(result);
    addTilesAnimation;

    if (guessIsCorrect(result)) {
      isWinning = true;
      console.log("Guess is correct");
    } else {
      console.log("Guess is NOT correct");

      addKeysColor(result);
      currentRow++;
      currentTile = 0;

      if (gameIsOver()) {
        console.log(`You lose! Keyword is ${keyword}`);
      }
    }
  } else {
    console.log(`Guess '${getUserGuess()}' is not valid`);
  }
}

function guessIsValid(userGuess = getUserGuess()) {
  if (userGuess.length !== 5) return false;
  if (!dictionary.includes(userGuess)) return false;
  return true;
}

function guessIsCorrect(result) {
  return result.every((letter) => isCorrect(letter));
}

function gameIsOver() {
  return isWinning || currentRow > 5;
}

// -------------------------------------------------------------
// VALIDATION

const correct = "🟢";
const present = "🟡";
const absent = "🔴";

function isCorrect(letter) {
  return letter == correct;
}

function isPresent(letter) {
  return letter == present;
}

function isAbsent(letter) {
  return letter == absent;
}

function checkUserGuess(userGuess = getUserGuess(), solutionWord = keyword) {
  // Hàm này nhận giá trị đầu vào là 2 chuỗi ký tự
  // và trả về một mảng kết quả so sánh của hai chuỗi đó

  let result = [absent, absent, absent, absent, absent];

  // Kiểm tra điều kiện đúng ký tự đúng vị trí
  for (let i = 0; i < 5; i++) {
    if (userGuess.charAt(i) === solutionWord.charAt(i)) {
      result[i] = correct;
      const cutIndex = i;
      solutionWord = cutLetter(solutionWord, cutIndex);
    }
  }

  // Kiểm tra điều kiện đúng ký tự SAI vị trí
  for (let i = 0; i < 5; i++) {
    if (solutionWord.includes(userGuess.charAt(i)) && !isCorrect(result[i])) {
      result[i] = present;
      const cutIndex = solutionWord.indexOf(userGuess.charAt(i));
      solutionWord = cutLetter(solutionWord, cutIndex);
    }
  }

  return result;
}

function cutLetter(word, index) {
  return word.slice(0, index) + "-" + word.slice(index + 1);
}

// -------------------------------------------------------------
// ADD COLOR & ANIMATION

function addTilesColor(result, row = currentRow) {
  // TODO: Cập nhập màu sắc của các tiles trên row hiện tại theo result
  // Chú ý tương thích với hiệu ứng

  // Gợi ý: Thêm các lớp tile--absent, tile--present, và tile--correct
  // vào các tile tương ứng
}

function addTilesAnimation(row = currentRow) {
  // TODO: Thêm hiệu ứng hiển thị tiles trên row hiện tại
  // Lưu ý có delay giữa các phím. Chú ý tương thích khi thêm màu

  // Gợi ý: Thêm lớp tile--flip vào tile
}

function addKeysColor(result, guessRow = guesses[currentRow]) {
  // TODO: Cập nhập màu sắc của các phím đã vừa ấn

  // Hàm này truyền vào một mảng 5 phần tử chính là 5 ký tự mà người dùng vừa nhập
  // Đổi màu các phím guessRow trên bàn phím dựa vào kết quả result

  // Gợi ý: Thêm các lớp key--absent, key--present, và key--correct
  // vào các phím tương ứng
}

// TODO: Thêm animation hiển thị tile khi nhập phím và error khi nhập không hợp lệ

// -------------------------------------------------------------
// REAL KEYBOARD

// TODO: Tạo sự kiện cho các phím trên bàn phím thực
// có thể xử lý được như dùng bàn phím trên trang web
for(i = 0; i < result.length; i++){
		let letter = result[i].toUpperCase();
		result.push(letter);
  let blockClass = 'tile--present';
}
addEventListener("keyup",function(event){

  if(event.keyCode >= 65 && event.keyCode <= 90)
    addLetter(event.key);
  else if (event.keyCode == 13)
    submitGuess();
  else if (event.keyCode == 8)
    deleteLetter();
})
// Chỉ yêu cầu các phím chữ cái, nút xoá (backspace) và enter

// -------------------------------------------------------------
// FETCHING DATA

// dictionary chứa danh sách các từ có 5 chữ cái có nghĩa
// dùng để kiểm tra từ mà người dùng nhập
let dictionary = [];

// targetWords chỉ chứa một phần các từ phổ biến
// dùng để sinh từ khoá cho người dùng tìm
let targetWords = [];

async function updateDictionary() {
  const response = await fetch("./data/dictionary.json");
  dictionary = await response.json();
}

async function updateTargetWords() {
  const response = await fetch("./data/targetWords.json");
  targetWords = await response.json();
}

// -------------------------------------------------------------
// TEST

async function testGuessChecker() {
  // https://github.com/yukosgiti/wordle-tests
  let errorCount = 0;

  const response = await fetch("./data/tests.json");
  const bigTestCase = await response.json();

  bigTestCase.forEach((testWord) => {
    const word = testWord.slice(0, 5);
    const guess = testWord.slice(6, 11);

    const output = checkUserGuess(guess, word).reduce(
      (outStr, char) =>
        outStr + (isCorrect(char) ? "c" : isPresent(char) ? "m" : "w"),
      ""
    );

    if (output !== testWord.slice(12, 17)) {
      console.log(testWord, output);
      errorCount++;
    }
  });

  console.log(`Test Done! ${errorCount} error.`);
}

// -------------------------------------------------------------
// UTILS

function newGame() {
  keyword = getRandomWord();
  guesses = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];
  currentRow = 0;
  currentTile = 0;
  isWinning = false;
}

function getRandomWord() {
  return randomItem(targetWords);
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

(async function () {
  await updateDictionary();
  await updateTargetWords();
  newGame();
})();
