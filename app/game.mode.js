const canvas = document.querySelector("#canvas");
let words,
    music = new Audio('./game music.mp3'),
    fx = new Audio('./typing-fx-2.mp3');

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.status === 200 && xhr.readyState === 4) {
        canvas.innerHTML = "";
        words = xhr.responseText.split("\r\n");
        if (settings['punctuation']) {
            const punctuationEnd = '.?,!:;';
            //add punctuation
            words = words.map((word) => {
                let decider = Math.floor(Math.random() * 10) + 1
                if (decider % 3 == 0) {
                    return word + punctuationEnd.split('')[Math.floor(Math.random() * punctuationEnd.length)]
                } else {
                    return word;
                }
            })
        }
        if (settings['capital-letters']) {
            words = words.map((word) => {
                let decider = Math.floor(Math.random() * 10) + 1
                if (decider % 3 == 0) {
                    let splitWord = word.split('');
                    const uppercaseLetter = splitWord[0].toUpperCase();
                    splitWord[0] = uppercaseLetter;
                    const joinedWord = splitWord.join('');
                    return joinedWord;
                } else {
                    return word;
                }
            })
        }
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
    }
};

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

let currentLetter = 1;

let i = 0;

function setListener() {
    window.onkeyup = function() {
        fx = new Audio('./typing-fx-2.mp3');
    }
    window.onkeydown = (e) => {
        if (settings['fx']) {
            fx.volume = 0.4
            fx.play();
        }
        if (settings['music']) {
            music.volume = 0.4;
            music.play();
        }
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

let a = {};

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
    if (!isRunning) {
        if (time >= 0) {
            let int = setInterval(() => {
                time--;
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
                }
            }, 1000);
            isRunning = true;
        }
    }
}