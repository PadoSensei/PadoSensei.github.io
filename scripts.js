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
  obj.score = 0;
  let total = [];
  let hand = obj.cards;
  for (let i = 0; i < hand.length; i++) {
    total.push(hand[i].Rank);
    if (hand[i].Rank === 11) {
      obj.aceCount++;
    }
    let sum = total.reduce((acc, val) => acc + val);
    obj.score = sum;
  }
  if (obj.score > 21 && obj.aceCount > 0) {
    obj.score -= 10;
    obj.aceCount--;
  }
  if (obj.score > 21 && obj.aceCount > 0) {
    obj.score -= 10;
    obj.aceCount--;
  }
  if (obj.score > 21 && obj.aceCount > 0) {
    obj.score -= 10;
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
  // needs to check conditionswin
}

// DOM
// DOM  Target Variables
var dealScore = document.getElementById("deal-score");
var playScore = document.getElementById("play-score");

// Buttons
var newGameButton = document.getElementById("new-game-button");
var hitButton = document.getElementById("hit-button");
var standButton = document.getElementById("stand-button");

// Button Event Listener Functions
newGameButton.addEventListener("click", newGameButtonClick);
hitButton.addEventListener("click", hitButtonClick);
standButton.addEventListener("click", playerStand);

//OnClick Functions
function hitButtonClick() {
  hitPlayer();
  updateScores();
  updateHandDisplay();
}

function newGameButtonClick() {
  resetGame();
  startGame();
  //enableAllButtons();
  //document.getElementById("new-game-button").disabled = true;
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

// deal two cards to each
function deal() {
  hitPlayer();
  hitDealer();
  hitPlayer();
  hitDealer();
}
