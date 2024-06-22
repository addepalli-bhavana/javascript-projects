const buttonElement = document.getElementById("tell-btn");
const audioElement = document.getElementById("audio");
function tellMe(joke) {
  VoiceRSS.speech({
    key: "cfbe2bbccef745a7aa975075277ce978",
    src: joke,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}


async function getJokes() {
  try {
    let response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
    );
    let joke = "";
    let data = await response.json();
    if (data.setup) {
      joke = data.setup + "..." + data.delivery;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
  } catch (error) {
    console.log("oops", error);
  }
}
buttonElement.addEventListener("click",getJokes);
