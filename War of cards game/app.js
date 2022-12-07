const btn = document.querySelector(".btn");
const btn2 = document.querySelector(".btn2");
const container = document.querySelector(".img-container");
const computer = document.querySelector(".computer");
const me = document.querySelector(".me");
const remaining = document.querySelector(".heading");
const boss = document.querySelector(".heading-2");

let deckId,
  compWinner = 0,
  meWinner = 0;

const myFunc = btn.addEventListener("click", function () {
  fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?  ")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
    });
});

btn2.addEventListener("click", function () {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      if (deckId == null) {
        alert("please get a new deck first !");
        return;
      }

      console.log(data);

      container.children[0].innerHTML = `<img id="cds" src='${data.cards[0].image} ' /> `;
      container.children[1].innerHTML = `<img id="cds" src='${data.cards[1].image} ' /> `;

      let fVal = data.cards[0];
      let fVal2 = data.cards[1];
      let ans = winner(fVal, fVal2);

      remaining.textContent = `Remaining cards : ${data.remaining}`;
      computer.textContent = ans;

      if (data.remaining == 0) {
        btn2.disabled = true;
        if (compWinner > meWinner) {
          boss.textContent = "Computer wins , you damn human !";
        } else if (compWinner < meWinner) {
          boss.textContent = "Nice ! you win";
        } else {
          boss.textContent = "It's a tie. The war shall continue !";
        }
      }

      computer.textContent = `Won ${compWinner} times`;
      me.textContent = `Won ${meWinner} times`;
    });
});

function winner(c1, c2) {
  const indexValues = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];

  const v1 = indexValues.indexOf(c1.value);
  const v2 = indexValues.indexOf(c2.value);

  if (v1 > v2) {
    compWinner++;
    return "card 1 is the winner";
  } else if (v1 < v2) {
    meWinner++;
    return "card 2 is the winner";
  } else {
    return "tie !";
  }
}
