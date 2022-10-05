const psdGenerated = document.querySelector(".psd__generated"),
    copyIcon = psdGenerated.querySelector(".copy__icon"),
    psdGeneratedSpan = psdGenerated.querySelector("span"),
    psdGeneratBtn = document.querySelector(".psd__generat-btn"),
    psdStrengthBars = document.querySelectorAll(".psd__generat-strength > div > span"),
    psdCountNbr = document.querySelector(".psd__generat-nbr"),
    inputRange = document.querySelector(".inputNbrChar");

//   GENERATE PASSWORD STRING 

function generatePassword(inputRangeNbr, characters) {
    let generatedString = "";

    for (let i = 0; i < inputRangeNbr; i++) {
        let index = Math.floor(Math.random() * characters.length);
        generatedString += characters.charAt(index);
    }

    return generatedString;
}

psdGeneratBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let characters = "";
    let inputRangeValue = inputRange.value;
    const checkboxList = document.querySelectorAll(
        "input[type=checkbox]:checked"
    );

    psdStrengthBars.forEach((bar) => bar.classList.remove("active"));

    if (checkboxList.length === 0) {
        psdGenerated.classList.add("error");
        copyIcon.classList.add("hide");

        // when animation end remove error class
        psdGenerated.addEventListener("webkitAnimationEnd", (e) => {
            e.currentTarget.classList.remove("error");
        });

        psdGeneratedSpan.innerHTML = "Add charchters you want to  include ";

    } else {
        checkboxList.forEach((el, index) => {
            characters += el.dataset.include;
            psdStrengthBars[index].classList.add("active");
        });

        copyIcon.classList.remove("hide");
        psdGeneratedSpan.innerHTML = generatePassword(inputRangeValue, characters);
    }
});

// ******************** WHEN INPUT CHANGED CHANGE NBR VALUE ********************

inputRange.addEventListener("input", e => psdCountNbr.innerHTML = e.target.value);

// ******************** COPY TEXT TO CLIPBOARD ********************

function copyToClipBoard(e) {

    this.classList.add('clicked');
    navigator.clipboard.writeText(psdGeneratedSpan.textContent);
    setTimeout(() => this.classList.remove('clicked'), 2000);

}

copyIcon.addEventListener("click", copyToClipBoard);
