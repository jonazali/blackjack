function Card(suit = '', weight = 0) {
  this.suit = suit;
  this.weight = weight;
  // TODO: Function to getScore()
}

const myDeck = [];

// TODO: Player and dealer should be classes
const player = {
  currentCards: [],
};

const dealer = {
  currentCards: [],
};

function populateDeck(deck) {
  // Create cards for each suit
  const suits = ['♠', '♣', '♥', '♦'];
  suits.forEach(suit => {
    for (i = 2; i <= 11; i++) {
      const myCard = new Card(suit, i);
      if (i === 10) {
        myDeck.cards.push(myCard);
        myDeck.cards.push(myCard);
        myDeck.cards.push(myCard);
      }
      // Insert cards into deck
      myDeck.cards.push(myCard);
    }
  });
}

function dealCards(player, dealer) {
  const tempNum = [];
  // get the random number
  // check if exists
  // push into array
  for (i = 0; i < 4; i++) {
    const rand = Math.floor(Math.random() * 52);
    if (tempNum.includes(rand)) {
      // If number repeats go through loop again
      i--;
    } else {
      tempNum.push(rand);
    }
  }
  player.currentCards.push(myDeck.cards[tempNum[0]]);
  dealer.currentCards.push(myDeck.cards[tempNum[1]]);
  player.currentCards.push(myDeck.cards[tempNum[2]]);
  dealer.currentCards.push(myDeck.cards[tempNum[3]]);
}

function checkWin(player, dealer) {
  let playerScore = 0;
  let dealerScore = 0;
  // TODO: Add bust if there is two aces
  // Will be replaced with reduce function
  player.currentCards.forEach(card => {
    playerScore += card.weight;
  });
  dealer.currentCards.forEach(card => {
    dealerScore += card.weight;
  });
  if (playerScore > dealerScore) {
    console.log('Player Wins!');
  } else if (playerScore < dealerScore) {
    console.log('dealer Wins!');
  } else console.log("It's a tie!");

  console.log(`Player Score: ${playerScore}`);
  console.log(`dealer Score: ${dealerScore}`);
}

function printGame(player, dealer) {
  console.log('======================');
  console.log('  Welcome to 二十一点');
  console.log('======================\n');
  console.log(`Dealer's Hand:`);
  dealer.currentCards.forEach(card => {
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
  dealCards(player, dealer);
  printGame(player, dealer);
  checkWin(player, dealer);
}

playGame();
