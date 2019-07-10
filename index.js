function card(suit, weight) {
  this.suit = suit || '';
  this.weight = weight || 0;
}

let myDeck = {
  cards: [],
};

let player = {
  currentCards: [],
};

let banker = {
  currentCards: [],
};

function populateDeck(deck) {
  // Create cards for each suit
  let suits = ['♠', '♣', '♥', '♦'];
  suits.forEach(suit => {
    for (i = 2; i <= 11; i++) {
      let myCard = new card(suit, i);
      if (i === 10) {
        myDeck.cards.push(myCard);
        myDeck.cards.push(myCard);
        myDeck.cards.push(myCard);
      }
      myDeck.cards.push(myCard);
    }
  });
  // Insert cards into deck
}

function dealCards(player, banker) {
  let tempNum = [];
  // get the random number
  // check if exists
  // push into array
  for (i = 0; i < 4; i++) {
    let rand = Math.floor(Math.random() * 52);
    if (tempNum.includes(rand)) {
      i--;
    } else {
      tempNum.push(rand);
    }
  }
  player.currentCards.push(myDeck.cards[tempNum[0]]);
  banker.currentCards.push(myDeck.cards[tempNum[1]]);
  player.currentCards.push(myDeck.cards[tempNum[2]]);
  banker.currentCards.push(myDeck.cards[tempNum[3]]);
}

function checkWin(player, banker) {
  let playerScore = 0;
  let bankerScore = 0;
  player.currentCards.forEach(card => {
    playerScore += card.weight;
  });
  banker.currentCards.forEach(card => {
    bankerScore += card.weight;
  });
  if (playerScore > bankerScore) {
    console.log('Player Wins!');
  } else if (playerScore < bankerScore) {
    console.log('Banker Wins!');
  } else console.log("It's a tie!");

  console.log(`Player Score: ${playerScore}`);
  console.log(`Banker Score: ${bankerScore}`);
}

function printGame(player, banker) {
  console.log('======================');
  console.log('  Welcome to 二十一点');
  console.log('======================\n');
  console.log(`Dealer's Hand:`);
  banker.currentCards.forEach(card => {
    console.log(`{Suit: ${card.suit}, Weight: ${card.weight}}`);
  });
  console.log(`\nPlayer's Hand:`);
  player.currentCards.forEach(card => {
    console.log(`{Suit: ${card.suit}, Weight: ${card.weight}}`);
  });
  console.log('');
}

function playGame() {
  populateDeck(myDeck);
  dealCards(player, banker);
  printGame(player, banker);
  checkWin(player, banker);
}

playGame();
