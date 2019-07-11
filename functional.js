const Card = {
  suit: '',
  weight: 0,
};

const Player = {
  cards: [],
  score: 0,
};

const Dealer = {
  cards: [],
  score: 0,
};

const suits = ['♠', '♣', '♥', '♦'];

const weights = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];

createCard = (suit, weight) => ({ suit, weight });

createDeck = (funcSuits, funcWeights) => {
  const deck = [];
  funcSuits.forEach(suit => {
    funcWeights.forEach(weight => {
      const card = createCard(suit, weight);
      deck.push(card);
    });
  });
  return deck;
};

shuffleDeck = funcDeck => {
  const deck = funcDeck;
  return deck.sort(() => Math.random() - 0.5);
};

dealCards = funcDeck => {
  const deck = funcDeck;
  const hand = deck.shift();
  return { deck, hand };
};

getScores = hand => {
  let score = 0;
  hand.forEach(card => (score += card.weight));
  return score;
};

displayResults = (player, dealer) => {
  console.log('======================');
  console.log('  Welcome to 二十一点');
  console.log('======================\n');
  console.log(`Dealer's Hand:`);
  dealer.cards.forEach(card => {
    console.log(`{Suit: ${card.suit}, Weight: ${card.weight}}`);
  });
  console.log(`Score: ${dealer.score}`);
  console.log(`\nPlayer's Hand:`);
  player.cards.forEach(card => {
    console.log(`{Suit: ${card.suit}, Weight: ${card.weight}}`);
  });
  console.log(`Score: ${player.score}`);
  console.log('');
};

getWinner = (player, dealer) => {
  const dealerScore = dealer.score;
  const playerScore = player.score;

  if (dealerScore > 21) {
    console.log('\x1b[5m\x1b[32m%s\x1b[0m', '\tDEALER IS OVER 21, DEALER LOSES. YOU WIN!');
  } else if (playerScore > 21) {
    console.log('\x1b[5m\x1b[31m%s\x1b[0m', '\tYOU ARE OVER 21, YOU LOSE');
  } else if (playerScore > dealerScore) {
    console.log('\x1b[5m\x1b[32m%s\x1b[0m', '\tYOU WON');
  } else if (dealerScore === playerScore) {
    console.log('\x1b[5m\x1b[31m%s\x1b[0m', '\tITS A TIE...');
  } else {
    console.log('\x1b[5m\x1b[31m%s\x1b[0m', '\tDEALER WON, YOU LOSE');
  }
};

// ------------------Play Blackjack------------------------

// Create and shuffle deck
const deck = createDeck(suits, weights);
let shuffledDeck = shuffleDeck(deck);

// Deal Cards
let results = dealCards(shuffledDeck);
shuffledDeck = results.deck;
Player.cards = results.hand;
results = dealCards(shuffledDeck);
shuffledDeck = results.deck;
Dealer.cards = results.hand;
results = dealCards(shuffledDeck);
shuffledDeck = results.deck;
Player.cards = [Player.cards, results.hand];
results = dealCards(shuffledDeck);
shuffledDeck = results.deck;
Dealer.cards = [Dealer.cards, results.hand];

// Get Scores
Player.score = getScores(Player.cards);
Dealer.score = getScores(Dealer.cards);

// Display Results
displayResults(Player, Dealer);

// Get Winner
getWinner(Player, Dealer);
