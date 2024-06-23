const questions = [
    {
        question: "What is the capital of Bangladesh?",
        options: ["Chittagong", "Khulna", "Dhaka", "Rajshahi"],
        answer: 2
    },
    {
        question: "Which river is the longest in Bangladesh?",
        options: ["Meghna", "Jamuna", "Padma", "Brahmaputra"],
        answer: 3
    },
    {
        question: "What is the national flower of Bangladesh?",
        options: ["Rose", "Tulip", "Water Lily", "Sunflower"],
        answer: 2
    },
    {
        question: "In which year did Bangladesh gain independence?",
        options: ["1947", "1952", "1971", "1990"],
        answer: 2
    },
    {
        question: "What is the official language of Bangladesh?",
        options: ["Hindi", "Urdu", "Bengali", "English"],
        answer: 2
    },
    {
        question: "Which city is known as the 'Commercial Capital' of Bangladesh?",
        options: ["Khulna", "Barisal", "Chittagong", "Sylhet"],
        answer: 2
    },
    {
        question: "What is the name of the largest mangrove forest in Bangladesh?",
        options: ["Sundarbans", "Lawachara", "Rema-Kalenga", "Tengragiri"],
        answer: 0
    },
    {
        question: "Who is considered the founding leader of Bangladesh?",
        options: ["Ziaur Rahman", "Sheikh Mujibur Rahman", "Hussain Muhammad Ershad", "Khaleda Zia"],
        answer: 1
    },
    {
        question: "What is the national animal of Bangladesh?",
        options: ["Royal Bengal Tiger", "Asian Elephant", "Leopard", "Ganges Dolphin"],
        answer: 0
    },
    {
        question: "Which is the most popular sport in Bangladesh?",
        options: ["Football", "Cricket", "Hockey", "Kabaddi"],
        answer: 1
    }
];

const quizContainer = document.getElementById("quiz-container");
const questionText = document.getElementById("question");
const optionsList = document.getElementById("options-list");
const answerForm = document.getElementById("answer-form");
const submitBtn = document.getElementById("submit-btn");
const nextQuestionBtn = document.getElementById("next-question-btn");
const feedbackMessage = document.getElementById("feedback-message");
const answerDisplay = document.getElementById("answer-display");
const answerList = document.getElementById("answer-list");
const scoreDisplay = document.getElementById("score");

let currentQuestionIndex = 0;
let userAnswers = [];

function displayQuestion(questionIndex) {
    const question = questions[questionIndex];
    questionText.textContent = question.question;
    optionsList.innerHTML = ""; // Clear previous options
    feedbackMessage.textContent = ""; // Clear previous feedback

    question.options.forEach((option, index) => {
        const optionElement = document.createElement("li");
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "answer"; // Name for radio group
        radioInput.value = index; // Value to store selected option index
        radioInput.addEventListener("change", function() {
            submitBtn.disabled = false; // Enable submit button on radio selection
        });
        optionElement.textContent = option;
        optionElement.insertBefore(radioInput, optionElement.firstChild);
        optionsList.appendChild(optionElement);
    });
}

function checkNextQuestion() {
    if (currentQuestionIndex === questions.length - 1) {
        nextQuestionBtn.disabled = true;
        showAnswers(); // Show answers after the last question
    } else {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex); // Display the next question
        submitBtn.disabled = true; // Disable submit button until an answer is selected
    }
}

function showAnswers() {
    answerDisplay.style.display = "block";
    answerList.innerHTML = "";
    let correctAnswers = 0;
    questions.forEach((question, index) => {
        const answerElement = document.createElement("li");
        const userOption = userAnswers[index] !== undefined ? userAnswers[index] : -1; // Access user answer or set to -1 if not selected

        let answerText;
        if (userOption === -1) {
            answerText = "Not Answered";
        } else if (userOption === question.answer) {
            answerText = "Correct";
            correctAnswers++;
        } else {
            answerText = `Incorrect: the correct answer is ${question.options[question.answer]}`;
        }
        answerElement.textContent = `Question ${index + 1}: ${answerText}`;
        answerList.appendChild(answerElement);
    });
    scoreDisplay.textContent = `Score: ${correctAnswers} out of ${questions.length}`;
}

function submitAnswer(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const selectedRadio = document.querySelector('input[name="answer"]:checked');
    if (selectedRadio) {
        const userAnswerIndex = parseInt(selectedRadio.value);
        const question = questions[currentQuestionIndex];
        userAnswers[currentQuestionIndex] = userAnswerIndex; // Store selected option index

        let feedbackText = `You guessed ${question.options[userAnswerIndex]} `;
        if (userAnswerIndex === question.answer) {
            feedbackText += "CORRECT";
        } else {
            feedbackText += `INCORRECT: the correct answer is ${question.options[question.answer]}`;
        }
        feedbackMessage.textContent = feedbackText;

        submitBtn.disabled = true; // Disable submit button after selection
        nextQuestionBtn.disabled = false; // Enable next question button
    }
}

// Display the first question on page load
displayQuestion(currentQuestionIndex);

answerForm.addEventListener("submit", submitAnswer);

nextQuestionBtn.addEventListener("click", function() {
    checkNextQuestion();
    nextQuestionBtn.disabled = true; // Disable next question button until answer is submitted
});
