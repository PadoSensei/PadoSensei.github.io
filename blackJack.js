// Global declaration of suits and card values
let suits = ["spades", "diamonds", "clubs", "hearts"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let ranks = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
let display = [];
display[0] = "SVGs/Spades_1_A.svg";
display[1] = "SVGs/Spades_2.svg";
display[2] = "SVGs/Spades_3.svg";
display[3] = "SVGs/Spades_4.svg";
display[4] = "SVGs/Spades_5.svg";
display[5] = "SVGs/Spades_6.svg";
display[6] = "SVGs/Spades_7.svg";
display[7] = "SVGs/Spades_8.svg";
display[8] = "SVGs/Spades_9.svg";
display[9] = "SVGs/Spades_10.svg";
display[10] = "SVGs/Spades_11.svg";
display[11] = "SVGs/Spades_12_Q.svg";
display[12] = "SVGs/Spades_13_K.svg";
display[13] = "SVGs/Diam_1_A.svg";
display[14] = "SVGs/Diam_2.svg";
display[15] = "SVGs/Diam_3.svg";
display[16] = "SVGs/Diam_4.svg";
display[17] = "SVGs/Diam_5.svg";
display[18] = "SVGs/Diam_6.svg";
display[19] = "SVGs/Diam_7.svg";
display[20] = "SVGs/Diam_8.svg";
display[21] = "SVGs/Diam_9.svg";
display[22] = "SVGs/Diam_10.svg";
display[23] = "SVGs/Diam_11_J.svg";
display[24] = "SVGs/Diam_12_Q.svg";
display[25] = "SVGs/Diam_13_K.svg";
display[26] = "SVGs/Clubs_1_A.svg";
display[27] = "SVGs/Clubs_2.svg";
display[28] = "SVGs/Clubs_3.svg";
display[29] = "SVGs/Clubs_4.svg";
display[30] = "SVGs/Clubs_5.svg";
display[31] = "SVGs/Clubs_6.svg";
display[32] = "SVGs/Clubs_7.svg";
display[33] = "SVGs/Clubs_8.svg";
display[34] = "SVGs/Clubs_9.svg";
display[35] = "SVGs/Clubs_10.svg";
display[36] = "SVGs/Clubs_11_J.svg";
display[37] = "SVGs/Clubs_12_Q.svg";
display[38] = "SVGs/Clubs_13_K.svg";
display[39] = "SVGs/Hearts_1_A.svg";
display[40] = "SVGs/Hearts_2.svg";
display[41] = "SVGs/Hearts_3.svg";
display[42] = "SVGs/Hearts_4.svg";
display[43] = "SVGs/Hearts_5.svg";
display[44] = "SVGs/Hearts_6.svg";
display[45] = "SVGs/Hearts_7.svg";
display[46] = "SVGs/Hearts_8.svg";
display[47] = "SVGs/Hearts_9.svg";
display[48] = "SVGs/Hearts_10.svg";
display[49] = "SVGs/Hearts_11_J.svg";
display[50] = "SVGs/Hearts_12_Q.svg";
display[51] = "SVGs/Hearts_13_K.svg";
// global declaration of players; player & dealer
let player = {
  cards: [],
  handScore: 0,
  aceCount: 0,
};
let dealer = {
  cards: [],
  handScore: 0,
  aceCount: 0,
};

// Global deck array creation - App starts with deck loaded, cards dealt
var deck = [];
getDeck();
//deal()

// Control Functions
// Clears values
function resetGame() {
  deck = [];
  player.cards = [];
  dealer.cards = [];
  player.handScore = 0;
  dealer.handScore = 0;
  updateHandDisplay();
  getDeck();
}
function startGame() {
  shuffle();
  deal();
  updateScores();
}

function checkScore() {
  if (dealer.handScore > 21 || player.handScore > 21) {
    messageBox.innerText = "Oh oh! Bust!";
    whoWon();
  }
}

// Figure out who won, print message to screen.
function whoWon() {
  if (player.handScore > 21) {
    youLose();
  } else if (dealer.handScore > 21) {
    youWin();
  } else if (player.handScore === dealer.handScore) {
    console.log("Game tied");
    youTied();
  } else if (player.handScore > dealer.handScore && player.handScore <= 21) {
    youWin();
  } else if (player.handScore < dealer.handScore && dealer.handScore <= 21) {
    youLose();
  }
}

function youWin() {
  document.getElementById("stand-button").disabled = true;
  document.getElementById("new-game-button").disabled = true;
  messageBox.innerText = `You won!! Your ${player.handScore} beat the dealer's ${dealer.handScore}!`;
}

function youLose() {
  document.getElementById("stand-button").disabled = true;
  document.getElementById("new-game-button").disabled = true;
  messageBox.innerText = `You lose!! Your ${player.handScore} lost to the dealer's ${dealer.handScore}! `;

  document.getElementById("new-game-button").disabled = false;
}

function youTied() {
  document.getElementById("stand-button").disabled = true;
  document.getElementById("new-game-button").disabled = true;
  messageBox.innerText = `A Tie? You both had ${player.handScore}, you're both losers!!  `;

  document.getElementById("new-game-button").disabled = false;
}

// List of functions
//getDeck()
//hand(obj)
//shuffle()
//svgAdd()
//svgClear()
//scoretoboard()
//updateHandDisplay()
//hitDealer()
//dealAce()
//updateScores (hand + scoreToBoard)
// DOM button functions
//deal()

// getDeck fills the deck array with cards
function getDeck() {
  for (let s = 0; s < suits.length; s++) {
    for (let v = 0; v < values.length; v++) {
      var card = {
        Value: values[v],
        Suit: suits[s],
        Rank: ranks[v],
      };
      deck.push(card);
    }
  }
  for (let d = 0; d < deck.length; d++) {
    deck[d].Display = display[d];
  }
}

// evals cards in hand and sets score.

function hand(obj) {
  obj.handScore = 0;
  let total = [];
  let hand = obj.cards;
  for (let i = 0; i < hand.length; i++) {
    total.push(hand[i].Rank);
    if (hand[i].Rank === 11) {
      obj.aceCount++;
    }
    let sum = total.reduce((acc, val) => acc + val);
    obj.handScore = sum;
  }
  if (obj.score > 21 && obj.aceCount > 0) {
    obj.handScore -= 10;
    obj.aceCount--;
  }
  if (obj.score > 21 && obj.aceCount > 0) {
    obj.handScore -= 10;
    obj.aceCount--;
  }
  if (obj.score > 21 && obj.aceCount > 0) {
    obj.handScore -= 10;
    obj.aceCount--;
  }
}

// Shuffles deck
function shuffle() {
  var i = deck.length,
    k,
    temp; // k is to generate random index and temp is to swap the values
  while (--i > 0) {
    k = Math.floor(Math.random() * (i + 1));
    temp = deck[k];
    deck[k] = deck[i];
    deck[i] = temp;
  }
}

// Show images
function svgAdd() {
  //get elements
  var dealerDisplay = document.getElementById("deal-cards");
  var playerDisplay = document.getElementById("play-cards");
  // create loops
  var playHand = player.cards;
  var dealHand = dealer.cards;
  for (let x = 0; x < playHand.length; x++) {
    const element = playHand[x].Display;
    var pic = document.createElement("img"); // Create a <p> element
    pic.src = element; // Insert text
    playerDisplay.appendChild(pic); // Append <p> to <body>
  }
  for (let x = 0; x < dealHand.length; x++) {
    const element = dealHand[x].Display;
    var pic = document.createElement("img"); // Create a <p> element
    pic.src = element; // Insert text
    dealerDisplay.appendChild(pic); // Append <p> to <body>
  }
}

// Search DOM for all <img> and remove
function svgClear() {
  //get elements
  var dealerDisplay = document.getElementById("deal-cards");
  var playerDisplay = document.getElementById("play-cards");
  while (dealerDisplay.hasChildNodes()) {
    dealerDisplay.removeChild(dealerDisplay.firstChild);
  }
  while (playerDisplay.hasChildNodes()) {
    playerDisplay.removeChild(playerDisplay.firstChild);
  }
  dealScore.innerText = `Dealer's Hand Value:  `;
  playScore.innerText = `Player's Hand Value:  `;
}

function scoreToBoard() {
  dealScore.innerText = `Dealer's Hand Value: ${dealer.handScore}`;
  playScore.innerText = `Player's Hand Value: ${player.handScore}`;
}
// Two functions together will clear board and add Card pictures
function updateHandDisplay() {
  svgClear();
  svgAdd();
  scoreToBoard();
}

// Sends one card from deck to dealer
function hitDealer() {
  hit = deck.shift();
  dealer.cards.push(hit);
  updateHandDisplay();
  updateScores();
  checkScore();
}

function hitPlayer() {
  hit = deck.shift();
  player.cards.push(hit);
  updateHandDisplay;
  checkScore();
}

//Debugging Function - deal ace to player
function dealAce() {
  let card = { Value: "A", Suit: "Joker", Rank: 11 };
  player.cards.push(card);
}

function updateScores() {
  hand(player);
  hand(dealer);
  scoreToBoard();
  // needs to check
}

// DOM  Target Variables
var dealScore = document.getElementById("deal-score");
var playScore = document.getElementById("play-score");
var messageBox = document.getElementById("message-box");

// Buttons
var newGameButton = document.getElementById("new-game-button");
var hitButton = document.getElementById("hit-button");
var standButton = document.getElementById("stand-button");
var resetButton = document.getElementById("reset-button");

// Button Event Listener Functions
newGameButton.addEventListener("click", newGameButtonClick);
hitButton.addEventListener("click", hitButtonClick);
standButton.addEventListener("click", playerStand);
resetButton.addEventListener("click", resetButtonClick);

//OnClick
function resetButtonClick() {
  resetGame();
  messageBox.innerText = "";
  enableAllButtons();
}

function hitButtonClick() {
  hitPlayer();
  updateScores();
  updateHandDisplay();
  checkScore();
}

function newGameButtonClick() {
  shuffle();
  deal();
  //enableAllButtons();
  //document.getElementById("new-game-button").disabled = true;
}

function playerStand() {
  document.getElementById("hit-button").disabled = true;
  document.getElementById("stand-button").disabled = true;
  messageBox.innerText = `You stand with ${player.handScore}.`;
  while (dealer.handScore < player.handScore && dealer.handScore < 17) {
    hitDealer();
  }
  whoWon();
}
// disable button functions

function enableAllButtons() {
  document.getElementById("new-game-button").disabled = false;
  document.getElementById("hit-button").disabled = false;
  document.getElementById("stand-button").disabled = false;
}

// deal two cards to each, update Scores
function deal() {
  hitPlayer();
  hitDealer();
  hitPlayer();
  hitDealer();
  updateScores();
  updateHandDisplay();
}
