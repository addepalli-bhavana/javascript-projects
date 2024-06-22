const inputTextElement = document.getElementById("input-text");
const qrCodeImgElement = document.getElementById("qr-code-img");
const generateButtonElement = document.getElementById("generate-btn");



generateButtonElement.addEventListener("click", () => {
  const inputText = inputTextElement.value.trim();
  if (!inputText) {
    alert("Please enter text or URL.");
    return;
  } else {
    
   setTimeout(()=>{
    qrCodeImgElement.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputText}`;
    
    qrCodeImgElement.classList.remove("hide");
   },1000)
  }
});

inputTextElement.addEventListener("keyup", () => {
  if (!inputTextElement.value.trim()) {
    qrCodeImgElement.src = "";
    qrCodeImgElement.classList.add("hide");
  }
});
