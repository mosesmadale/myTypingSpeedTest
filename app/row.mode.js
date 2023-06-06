const canvas = document.querySelector("#canvas");
let currentLetter = 1;

let i = 0;
canvas.innerHTML = "";
while (i <= 5) {
    let rdn = Math.ceil(Math.random(words.length - 1) * words.length) - 1;
    let string = words[rdn];
    string += " ";
    string.split("").forEach((letter) => {
        let e = document.createElement("pre");
        e.textContent = letter;
        canvas.appendChild(e);
    });

    i++;
}
canvas.children[currentLetter - 1].classList.add("current-letter");
setListener();


let score = {
    value: 0,
    int: null,
};
let sentence = "";
let correctSentence = "";

let time = 60;
let isRunning = false;
let mistakes = 0;
let troubleRec = [];

const popupTitles = [
    'Divine',
    'Awesome',
    'Cool',
    'Great',
    'Fantastic',
    'Fabulous',
    'Outstanding',
    'Well done',
    'Congratulations'
]

const countWords = (string) => {
    let splitSentence = string.split(" ");
    splitSentence.pop();
    let cleanList = splitSentence.filter((word) => {
        return !word.includes("*");
    });
    return cleanList.length;
};



function setListener() {
    window.onkeyup = function() {
        fx = new Audio('./typing-fx-2.mp3');
    }
    window.onkeydown = (e) => {
        $('.inticer2').fadeOut();
        $('.inticer1').fadeOut();
        count();
        if (e.key == " ") {
            e.preventDefault();
        }
        correctSentence += canvas.children[currentLetter - 1].textContent;
        if (canvas.children[currentLetter - 1].textContent == e.key) {
            document;
            canvas.children[currentLetter - 1].classList.add("correct-letter");
            sentence += e.key;
            document
                .querySelector(".rubbish")
                .appendChild(canvas.children[currentLetter - 1]);
        } else {
            mistakes++;
            troubleRec.push(canvas.children[currentLetter - 1].textContent);
        }


        document
            .querySelector(".typing-area-cont")
            .querySelectorAll("pre")
            .forEach((element) => {
                element.classList.remove("current-letter");
                canvas.children[currentLetter - 1].classList.add("current-letter");
            });

        if (e.key == " ") {
            score.value = countWords(sentence);
        }


        document.querySelector("#speed").textContent = score.value;
        let rdn = Math.ceil(Math.random(words.length - 1) * words.length) - 1;
        let string = words[rdn];
        string += " ";
        string.split("").forEach((letter) => {
            let e = document.createElement("pre");
            e.textContent = letter;
            canvas.appendChild(e);
        });
    };
}

let a = { value: 0 };

function count() {
    //do accuracy here
    let accuracy;
    if (sentence.length > mistakes) {
        accuracy = 100 - Math.floor(
            mistakes / sentence.length * 100
        );
        a.value = accuracy;
    } else {
        accuracy = 0;
    }
    if (mistakes > 0) {
        document.querySelector("#accuracy").textContent = `${accuracy}`;
    } else {
        document.querySelector("#accuracy").textContent = `100`;

    }
    if (!isRunning) {
        if (time >= 0) {
            let int = setInterval(() => {
                time--;
                document.querySelector(
                    ".clock"
                ).style.backgroundImage = `conic-gradient( rgba(0, 211, 46, 0.63) 0% ${(time / 60) * 100
                }%, rgba(221, 221, 221, 0.315) ${(time / 60) * 100}% 100%)`;
                if (time <= 0) {
                    //time = 0;
                    window.onkeydown = null;
                    isRunning = false;
                    clearInterval(int);
                    //activate the results popup
                    let randomTitle = Math.ceil(Math.random(popupTitles.length - 1) * popupTitles.length) - 1
                    document.querySelector('.popup').querySelector('.popup-title').innerHTML = popupTitles[randomTitle] + '!';
                    document.querySelector('.popup').querySelector('.popup-content').innerHTML = `You managed to type at an average speed of <span>${score.value} WPM</span> with an accuracy of <span>${a.value == undefined ? 0 : a.value}%</span>!`;
                    $('.overlay').fadeIn(500, function() {
                        $('.popup-content').slideDown(100);
                    });
                    window.onkeypress = null;
                    music.volume = 0.4;
                }
                document.querySelector(".time").textContent = time;
            }, 1000);
            isRunning = true;
        }
    }
}