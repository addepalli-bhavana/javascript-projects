// reference to html elements
const inputTextElement = document.getElementById("input-text");
const inputvoiceElement = document.getElementById("input-voice");
const convertBtnElement = document.getElementById("convert-btn");

// function to populate voice options in select element
const voices = () => {
  for (const voice of speechSynthesis.getVoices()) {
    const selected = voice.name === "Google US English" ? "selected" : "";
    const option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    inputvoiceElement.insertAdjacentHTML("beforeend", option);
  }
};

// event listener to populate voice options in select element when the list of voices are initially loaded (also populates voice options in select element when new voices list become available, or existing voices are changed, updated, or deleted)
speechSynthesis.addEventListener("voiceschanged", voices);

// function to convert text into speech
const convertTextToSpeech = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  for (const voice of speechSynthesis.getVoices()) {
    if (voice.name === inputvoiceElement.value) {
      utterance.voice = voice;
    }
  }
  speechSynthesis.speak(utterance);
};

// event listener for convert button
convertBtnElement.addEventListener("click", () => {
  const inputText = inputTextElement.value.trim();
  if (!inputText) {
    alert("Please enter some text to convert to speech.");
  } else {
    if (!speechSynthesis.speaking) {
      convertTextToSpeech(inputText);
    }
  }
});
