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

/**
 * Creates a card
 * @param {string} suit
 * @param {number} weight
 * @returns {Object} card - object
 */
createCard = (suit, weight) => ({ suit, weight });

/**
 * Creates a deck of cards
 * @param {string[]} funcSuits
 * @param {number[]} funcWeights
 * @returns {Object[]} deck - array of cards
 */
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

/**
 * Shuffles a deck of cards
 * @param {Object[]} funcDeck
 * @returns {Object[]} deck - array of cards
 */
shuffleDeck = funcDeck => {
  const deck = funcDeck;
  return deck.sort(() => Math.random() - 0.5);
};

/**
 * Takes card out of deck
 * @param {Object[]} funcDeck
 * @returns {Object[]} deck - array of cards
 * @returns {Object} card - object
 */
dealCard = funcDeck => {
  const deck = funcDeck;
  const card = deck.shift();
  return { deck, card };
};

/**
 * Deals cards to player and dealer
 * @param {Object[]} deck
 * @returns {Object[]} playerCards - array of cards
 * @returns {Object[]} dealerCards - array of cards
 */
dealCards = deck => {
  let funcDeck = deck;
  let results = dealCard(funcDeck);
  funcDeck = results.deck;
  let playerCards = results.card;
  results = dealCard(funcDeck);
  funcDeck = results.deck;
  let dealerCards = results.card;
  results = dealCard(funcDeck);
  funcDeck = results.deck;
  playerCards = [playerCards, results.card];
  results = dealCard(funcDeck);
  funcDeck = results.deck;
  dealerCards = [dealerCards, results.card];
  return { playerCards, dealerCards };
};

/**
 * Gets the score of a player or dealer
 * @param {Object[]} cards
 * @returns {number} card total weight - number
 */
getScores = cards => cards.reduce((acc, cur) => acc + cur.weight, 0);

/**
 * Displays the results of a player and dealer
 * @param {Object} player
 * @param {Object} dealer
 */
displayResults = (player, dealer) => {
  console.log('======================');
  console.log('  Welcome to 二十一点');
  console.log('======================\n');
  console.log(
    '.------..------..------..------..------.    .------..------..------..------.\n' +
      '|B.--. ||L.--. ||A.--. ||C.--. ||K.--. |    |J.--. ||A.--. ||C.--. ||K.--. |\n' +
      '| :(): || :/ : || (  ) || :/ : || :/ : |    | :(): || (  ) || :/ : || :/ : |\n' +
      '| ()() || (__) || :  : || :  : || :  : |    | ()() || :  : || :  : || :  : |\n' +
      "| '--'B|| '--'L|| '--'A|| '--'C|| '--'K|    | '--'J|| '--'A|| '--'C|| '--'K|\n" +
      "`------'`------'`------'`------'`------'    `------'`------'`------'`------'\n"
  );
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

/**
 * Displays the winner
 * @param {Object} player
 * @param {Object} dealer
 */
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
const dealtCards = dealCards(shuffledDeck);
Player.cards = dealtCards.playerCards;
Dealer.cards = dealtCards.dealerCards;

// Get Scores
Player.score = getScores(Player.cards);
Dealer.score = getScores(Dealer.cards);

// Display Results
displayResults(Player, Dealer);

// Get Winner
getWinner(Player, Dealer);
