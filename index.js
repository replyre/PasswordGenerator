const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_+<>~{}[]:;.,|",
};

const generatePass = () => {
  let staticPass = "",
    randomPass = "",
    excludeDuplicate = false,
    passlength = lengthSlider.value;

  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exe-duplicate" && option.id !== "spaces")
        staticPass += characters[option.id];
      else if (option.id !== "spaces") staticPass += ` ${staticPass} `;
      else excludeDuplicate = true;
    }
  });
  for (let i = 0; i < passlength; i++) {
    let randomChar = staticPass[Math.floor(Math.random() * staticPass.length)];
    if (excludeDuplicate) {
      !randomPass.includes(randomChar) | (randomChar == " ")
        ? (randomPass += randomChar)
        : i--;
    } else {
      randomPass += randomChar;
    }
    passInput.value = randomPass;
  }
  updatePassIndicator();
};

const updatePassIndicator = () => {
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

const updateSlider = () => {
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePass();
  updatePassIndicator();
};
console.log(passInput.value);
const copyPass = () => {
  navigator.clipboard.writeText(passInput.value);
  copyIcon.innerText = "check";
  copyIcon.style.color = "#fa5685";
  setTimeout(() => {
    copyIcon.innerText = "copy_all";
    copyIcon.style.color = "#707070";
  }, 1500);
};

copyIcon.addEventListener("click", copyPass);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePass);
