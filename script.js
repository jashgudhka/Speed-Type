const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");
let startTime;

// This function will generate and return a random quote from the API.
function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

// This will call the getRandomQuote() method and get the quote from it and display it on the page.
async function renderNewQuote() {
  const quote = await getRandomQuote();

  // By default the text will be set to an empty string because unless the quote is recieved it will be blank or if there already is some text then we don't want it to clash with the new quote.
  quoteDisplayElement.innerText = "";

  //Here we split the newly recieved quote into individual characters.
  // This foreach loop will split the quote into individual characters, wrap the characters into a span, add then span one by one to the quoteDisplayElement
  quote.split("").forEach((character) => {
    // After splitting them we give the each character it's own span element.
    // This is done to give the color changing effect for each character, it will take place in the event handler below.
    const characterSpan = document.createElement("span");

    // Now after the span element is created the inner text of that span is set to the character.
    characterSpan.textContent = character;

    // Now the span element with a character inside it is appended to the 'quoteDisplayElement'.
    quoteDisplayElement.appendChild(characterSpan);
  });

  // We set the value of the input element as null, because as a new quote is received we don't want it to contain the same old text. We want it to be empty to retype.
  quoteInputElement.value = null;
  startTimer();
}

renderNewQuote();

// This event listener will go through the typed characters and change the color of the displayed quote green for success and red for incorrect.
quoteInputElement.addEventListener("input", () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  console.log(arrayQuote);

  const arrayValue = quoteInputElement.value.split("");
  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    // This if condition removes both the classes to keep it default, for any character has not been typed in input yet.
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    }
    // This else if condition sets if the character that has been typed in input is correct or not. If it is correct it will change the color of the same character in display quote to green.
    else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    }
    // This will change the color of the character in display quote to red, for the wrongly typed characters in input.
    else {
      {
        characterSpan.classList.remove("correct");
        characterSpan.classList.add("incorrect");
        correct = false;
      }
    }
  });
  // If everything checks out and the typed quote matches perfectly to the display quote, then it will render and display a new quote.
  if (correct) {
    renderNewQuote();
  }
});

function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timerElement.innerText = Math.floor((new Date() - startTime) / 1000);
  }, 1000);
}
