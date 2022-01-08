const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let chips = 0;
const cardType = ['Spade', 'Heart', 'Clover', 'Diamond'];
const cardNumber = {
  'A': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'Jack': 0,
  'Queen': 0,
  'King': 0,
}
const cardNumberKey = Object.keys(cardNumber);


function randomCard() {
  const randomCardType = cardType[Math.floor(Math.random() * 4)]
  const randomCardNumber = cardNumberKey[Math.floor(Math.random() * 12)];
  const card = {
    name: randomCardType + '-' + randomCardNumber,
    value: cardNumber[randomCardNumber]
  }
  return card;
}

function pokDeng() {
  rl.question('\nPlease put your bet\n', bet => {
    const cards = []

    while (cards.length < 4) {
      const card = randomCard();
      if (!cards.some(i => i.name === card.name)) {
        cards.push(card);
      }
    }

    console.log(`You got ${cards[0].name}, ${cards[1].name}`);
    console.log(`The dealer got ${cards[2].name}, ${cards[3].name}`);

    const yourScore = (cards[0].value + cards[1].value) % 10;
    const dealerScore = (cards[2].value + cards[3].value) % 10;

    if (yourScore > dealerScore) {
      chips += +bet;
      console.log(`Your won!!!, received ${bet} chips`);
    } else if (yourScore < dealerScore) {
      chips -= +bet;
      console.log(`You lose!!!, lost ${bet} chips`);
    } else {
      console.log('Withdraw!!!');
    }

    // pokDeng();
    rl.question('Wanna play more (Yes/No)?\n', option => {
      (option === 'Yes') ? pokDeng() : rl.close();
    });
  });
};

pokDeng();

rl.on('close', () => {
  console.log(`\nYou got total ${chips} chips\n`);
  process.exit(0);
});