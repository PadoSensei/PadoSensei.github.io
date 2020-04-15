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
display[11] = "SVGs/Spades_12.svg";
display[12] = "SVGs/Spades_13.svg";
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
display[23] = "SVGs/Diam_11.svg";
display[24] = "SVGs/Diam_12.svg";
display[25] = "SVGs/Diam_13.svg";
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
display[36] = "SVGs/Clubs_11.svg";
display[37] = "SVGs/Clubs_12.svg";
display[38] = "SVGs/Clubs_13.svg";
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
display[49] = "SVGs/Hearts_11.svg";
display[50] = "SVGs/Hearts_12.svg";
display[51] = "SVGs/Hearts_13.svg";
// global declaration of players; player & dealer

let player = {
  cards: [],
  displayHand: [],
  score: 0,
  aceCount: 0,
};

let dealer = {
  cards: [],
  displayHand: [],
  score: 0,
  aceCount: 0,
};

// Global deck array creation
var deck = [];
getDeck();
shuffle();

// DOM  Target Variables
var dealScore = document.getElementsByClassName("deal-score");
var playScore = document.getElementsByClassName("play-score");

// Buttons
var newGameButton = document.getElementById("new-game-button"),
  hitButton = document.getElementById("hit-button"),
  standButton = document.getElementById("stand-button");

// Button Event Listener Functions
newGameButton.addEventListener("click", newGameButtonClick);
hitButton.addEventListener("click", hitPlayer);
standButton.addEventListener("click", playerStand);

//OnClick Functions
function hitPlayer() {
  hit = deck.shift();
  player.cards.push(hit);
  hand(player);
  updateUI();
  checkScore();
}

function newGameButtonClick() {
  startGame();
  enableAllButtons();
  document.getElementById("new-game-button").disabled = true;
}

function playerStand() {
  document.getElementById("hit-button").disabled = true;
  document.getElementById("stand-button").disabled = true;
  hand(player);
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

// Dealer gets card
function hitDealer() {
  hit = deck.shift();
  dealer.cards.push(hit);
  hand(dealer);
  updateUI();
  checkScore();
}

// Game Functions - Create, shuffle and deal deck
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
// counts remaining cards in the deck
function cardCounter() {
  let counter = 0;
  for (const card of deck) {
    counter++;
  }
  return counter;
}
// Shuffle function using Fisher-Yates Algo
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
//  Deals 4 first cards off top to both players - Only done once at start of game.
function deal() {
  // player.cards.push(deck.shift());
  // dealer.cards.push(deck.shift());
  // player.cards.push(deck.shift());
  // dealer.cards.push(deck.shift());
  hitPlayer();
  hitDealer();
  hitPlayer();
  hitDealer();
  svgAdd();
}

// Will add both Dealer and Player cards to the DOM
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
}
// Two functions together will clear board and add Card pictures
function updateHandDisplay() {
  svgClear();
  svgAdd();
}

// Eval the hand
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
  if (obj.handScore > 21 && obj.aceCount > 0) {
    obj.handScore -= 10;
    obj.aceCount--;
  }
  if (obj.handScore > 21 && obj.aceCount > 0) {
    obj.handScore -= 10;
    obj.aceCount--;
  }
  if (obj.handScore > 21 && obj.aceCount > 0) {
    obj.handScore -= 10;
    obj.aceCount--;
  }
}
// Creates, shuffles, deals, sets scores
function startGame() {
  getDeck();
  shuffle();
  deal();
  hand(player);
  hand(dealer);
  svgAdd();
}

// Control Functions
// Clears values
function resetGame() {
  deck = [];
  player.cards = [];
  dealer.cards = [];
  player.handScore = 0;
  dealer.handScore = 0;
  player.displayHand = [];
  dealer.displayHand = [];
  updateDisplay();
}

//Flow Statements

//Display Functions
// Redundant
function clearUI() {
  document.querySelectorAll(".display-score").forEach(function (a) {
    a.remove();
    document.querySelectorAll(".display-cards").forEach(function (a) {
      a.remove();
    });
  });
}

// Converts hand info to displayHand string -- Redundant
function handConvert(obj) {
  obj.displayHand = [];
  let converted = "";
  let hand = obj.cards;

  for (let i = 0; i < hand.length; i++) {
    let converted = "";
    converted += hand[i].Value;
    if (hand[i].Suit === "hearts") {
      converted += "&hearts;   ";
    } else if (hand[i].Suit === "spades") {
      converted += "&spades;   ";
    } else if (hand[i].Suit === "diamonds") {
      converted += "&diams;   ";
    } else if (hand[i].Suit === "clubs") {
      converted += "&clubs;   ";
    }
    obj.displayHand.push(converted);
  }
}
//Redundant DisplayFunction
function displayPlayerCards() {
  for (let i = 0; i < player.displayHand.length; i++) {
    var newCard = document.createElement("p");
    newCard.setAttribute("class", "display-cards");
    newCard.innerHTML = player.displayHand[i];

    if (
      player.displayHand[i].includes("&spades;") ||
      player.displayHand[i].includes("&clubs;")
    ) {
      newCard.setAttribute("style", "color: black;");
    } else if (
      player.displayHand[i].includes("&diams;") ||
      player.displayHand[i].includes("&hearts;")
    ) {
      newCard.setAttribute("style", "color: #940404;");
    }
    $("#play-cards").prepend(newCard);
  }
  let scoreMessage = `Player has ${player.handScore}.`;
  var newScore = document.createElement("p");
  newScore.setAttribute("class", "display-score");
  newScore.innerHTML = scoreMessage;
  $("#play-cards").append(newScore);
}
//Redundant DisplayFunction
function displayDealerCards() {
  for (let i = 0; i < dealer.displayHand.length; i++) {
    var newCard = document.createElement("p");
    newCard.setAttribute("class", "display-cards");
    newCard.innerHTML = dealer.displayHand[i];

    if (
      dealer.displayHand[i].includes("&spades;") ||
      dealer.displayHand[i].includes("&clubs;")
    ) {
      newCard.setAttribute("style", "color: black;");
    } else if (
      dealer.displayHand[i].includes("&diams;") ||
      dealer.displayHand[i].includes("&hearts;")
    ) {
      newCard.setAttribute("style", "color: #940404;");
    }
    $("#deal-cards").prepend(newCard);
  }
  let scoreMessage = `The Dealer has ${dealer.handScore}.`;
  var newScore = document.createElement("p");
  newScore.setAttribute("class", "display-score");
  newScore.innerHTML = scoreMessage;
  $("#deal-cards").append(newScore);
}
// Redundant UI Function
function updateUI() {
  clearUI();
  hand(dealer);
  hand(player);
  handConvert(player);
  handConvert(dealer);
  displayDealerCards();
  displayPlayerCards();
}

//Debugging Function -
function dealAce() {
  let card = { Value: "A", Suit: "Joker", Rank: 11 };
  player.cards.push(card);
}

function checkScore() {
  player.handScore = [];
  dealer.handScore = [];
  hand(player);
  hand(dealer);
  if (dealer.handScore > 21 || player.handScore > 21) {
    console.log("Bust!");
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
  var message = `You won!! Your ${player.handScore} beat the dealer' ${dealer.handScore}! `;
  document.querySelectorAll(".display-score").forEach(function (a) {
    a.remove();
  });
  var newScore = document.createElement("p");
  newScore.setAttribute("class", "display-score");
  newScore.innerHTML = message;
  $("#play-cards").append(newScore);

  var playAgain = `Click the New Game button to start again!`;
  var again = document.createElement("p");
  again.setAttribute("class", "display-score");
  again.innerHTML = playAgain;
  $("#deal-cards").append(again);
  document.getElementById("new-game-button").disabled = false;
}

function youLose() {
  document.getElementById("stand-button").disabled = true;
  document.getElementById("new-game-button").disabled = true;
  let message = `You lose!! Your ${player.handScore} lost to the dealer' ${dealer.handScore}! `;
  document.querySelectorAll(".display-score").forEach(function (a) {
    a.remove();
  });
  let newScore = document.createElement("p");
  newScore.setAttribute("class", "display-score");
  newScore.innerHTML = message;
  $("#deal-cards").append(newScore);

  let playAgain = `Click the New Game button to start again!`;
  var again = document.createElement("p");
  again.setAttribute("class", "display-score");
  again.innerHTML = playAgain;
  $("#play-cards").append(again);
  document.getElementById("new-game-button").disabled = false;
}

function youTied() {
  document.getElementById("stand-button").disabled = true;
  document.getElementById("new-game-button").disabled = true;
  let message = `A Tie? You both had ${player.handScore}, you'e both losers!! `;
  document.querySelectorAll(".display-score").forEach(function (a) {
    a.remove();
  });
  let again = document.createElement("p");
  again.setAttribute("class", "display-score");
  again.innerHTML = message;
  $("#play-cards").append(again);
  document.getElementById("new-game-button").disabled = false;
}
