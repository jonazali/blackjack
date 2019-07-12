class Card {
  constructor(suit = '', weight = 0) {
    this.suit = suit;
    this.weight = weight;
  }

  getCard() {
    return this;
  }
}

class Deck {
  constructor(cards = []) {
    this.cards = cards;
  }

  populateDeck() {
    const suits = ['♠', '♣', '♥', '♦'];
    const weights = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
    suits.forEach(suit => {
      weights.forEach(weight => {
        const card = new Card(suit, weight);
        this.cards.push(card);
      });
    });
  }

  shuffleDeck() {
    this.cards.sort(() => Math.random() - 0.5);
  }

  printDeck() {
    console.log(this.cards);
  }
}

class CardHolder {
  constructor(name, cards) {
    this.name = name;
    this.cards = cards;
  }
}

const ace = new Card('♥', 2);
console.log(ace.getCard());
const deck = new Deck();
deck.populateDeck();
deck.printDeck();
deck.shuffleDeck();
deck.printDeck();
