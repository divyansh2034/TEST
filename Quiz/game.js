const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: "What does the term laser stand for?",
        choice1: "Light Amplification by Stimulated Emission of Radiation",
        choice2: "Light Absorption and Scattering of Electromagnetic Radiation",
        choice3: "Low-energy Amplification of Solar Energy Radiation",
        choice4: "None of the above",
        answer: 1
    },
    {
        question: "Which of the following is NOT a class of laser according to ANSI standards?",
        choice1: "Class 1",
        choice2: "Class 2",
        choice3: "Class 5",
        choice4: "Class 7",
        answer: 4
    },
    {
        question: "Which type of laser poses the highest risk of eye injury?",
        choice1: "Class 1",
        choice2: "Class 2",
        choice3: "Class 3B",
        choice4: "Class 4",
        answer: 1
    },
    {
        question: "What is the recommended eyewear protection for working with lasers?",
choice1: "Ordinary sunglasses",
choice2: "Safety goggles specifically designed for the laser's wavelength",
choice3: "Prescription glasses",
choice4: "None needed",
        answer: 2
    },
    {
        question: "What does the term 'Nominal Hazard Zone (NHZ)' refer to in laser safety?",
choice1: "The area where the laser beam is the least harmful",
choice2: "The area where the laser beam poses a hazard to the eyes or skin",
choice3: "The area where the laser beam is most intense",
choice4: "The area where the laser's power output is at its peak",
        answer: 2
    },
    {
        question: "Which of the following is a safe practice when working with lasers?",
choice1: "Directly looking into the laser beam",
choice2: "Pointing the laser at reflective surfaces",
choice3: "Using laser safety interlocks properly",
choice4: "Increasing the power output without proper authorization",
        answer: 3
    },
    {
        question: "What should you do if you experience an accidental exposure to a laser beam?",
choice1: "Panic and run out of the room",
choice2: "Rub your eyes vigorously",
choice3: "Seek medical attention immediately and report the incident",
choice4: "Ignore it unless symptoms persist",
        answer: 3
    },
    {
        question: "Which of the following materials is commonly used as a laser safety barrier?",
choice1: "Paper",
choice2: "Glass",
choice3: "Aluminum foil",
choice4: "Laser safety curtains",
        answer: 4
    },
    {
        question: "Which organization sets standards for laser safety in the United States?",
choice1: "OSHA (Occupational Safety and Health Administration)",
choice2: "ANSI (American National Standards Institute)",
choice3: "FDA (Food and Drug Administration)",
choice4: "EPA (Environmental Protection Agency)",
        answer: 2
    },
    {
        question: "What does the acronym 'LSO' stand for in the context of laser safety?",
choice1: "Laser Safety Officer",
choice2: "Laser Standardization Organization",
choice3: "Light Source Operator",
choice4: "Laser Shielding Oversight",
        answer: 1
    },
    
];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('./end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice, index) => {
        choice.innerText = currentQuestion['choice' + (index + 1)];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

startGame();
