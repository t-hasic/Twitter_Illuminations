let x1 = 0;
let x2 = 1200;

let g1 = 200;
let g2 = 200;
let g3 = 200;

let x = 0;

let prevS = "neutral";
let sentiment = "";

let prevMs = 0;
let data = "";

function setup() {
  createCanvas(1200, 100);
  let time = millis();
}

let positiveWords = [
  "happy",
  "excited,",
  "excellent",
  "great",
  "joy",
  "love",
  "sweet",
  "cool",
  "awesome",
  "smart",
  "relaxed",
  "support",
  "proud",
];

let negativeWords = [
  "angry",
  "sad",
  "mad",
  "frustrated",
  "upset",
  "bad",
  "terrible",
  "horrible",
  "dumb",
  "stressed",
  "disgusted",
  "jealous",
  "sorry",
];

function determineSentiment(sentence) {
  // Clean the sentence to remove unnecessary characters and make it all lowercase

  sentence = sentence.replace(/[^a-zA-Z ]/g, "").toLowerCase();

  // Splie the sentence into an array of words
  const words = sentence.split(" ");

  // Create an object to keep track of the sentiment score
  const sentiment = {
    positive: 0,
    negative: 0,
  };

  // Loop through each word in the sentence
  for (const word of words) {
    // Check if the word is in the list of positive words
    if (positiveWords.includes(word)) {
      sentiment.positive++;
    }
    // Check if the word is in the list of negative words
    else if (negativeWords.includes(word)) {
      sentiment.negative++;
    }
  }

  // Determine the overall esntiment of the sentence
  if (sentiment.positive > sentiment.negative) {
    return "positive";
  } else if (sentiment.positive < sentiment.negative) {
    return "negative";
  } else {
    return "neutral";
  }
}

function draw() {
  // Get the current number of milliseconds since the app started
  let ms = millis();

  // To prevent constantly hitting the API on every "draw", we only run the following once every 20000 ms (20 seconds)

  if (prevMs + 5000 < ms) {
    prevMs = ms;

    fetch("http://localhost:3000/")
      .then((reponse) => reponse.json())
      .then((people) => (data = people));
    console.log(data);
    sentiment = determineSentiment(data);
    console.log(sentiment);

    if (prevS != sentiment) {
      prevS = sentiment;
      if (sentiment == "neutral") {
        clear();
        g1 = 200;
        g2 = 200;
        g3 = 200;
        x1 = 0;
        x2 = 1200;
      } else if (sentiment == "positive") {
        clear();
        g1 = 34;
        g2 = 139;
        g3 = 34;
        x1 = 0;
        x2 = 1200;
      } else {
        clear();
        g1 = 178;
        g2 = 34;
        g3 = 34;
        x1 = 0;
        x2 = 1200;
      }
    }
  }

  fill(g1, g2, g3);
  stroke(g1, g2, g3);

  rect(x1, 0, 100, 100);
  rect(x2, 0, 100, 100);
  rect(x1 + 200, 0, 100, 100);
  rect(x2 - 200, 0, 100, 100);
  rect(x1 + 400, 0, 100, 100);
  rect(x2 - 400, 0, 100, 100);
  rect(x1 + 600, 0, 100, 100);
  rect(x2 - 600, 0, 100, 100);

  x1 += 5;
  x2 -= 5;

  if (x1 == 800) {
    x1 = 0;
    x2 = 1200;
  }
}
