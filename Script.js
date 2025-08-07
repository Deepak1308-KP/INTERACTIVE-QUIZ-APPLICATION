const questions = [
  {
    question: "What is the capital of Japan?",
    options: ["Beijing", "Tokyo", "Seoul", "Bangkok"],
    answer: "Tokyo"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["William Wordsworth", "Jane Austen", "William Shakespeare", "Charles Dickens"],
    answer: "William Shakespeare"
  },
  {
    question: "What is 5 × 6?",
    options: ["30", "56", "11", "25"],
    answer: "30"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "HTML stands for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  }
];

let currentQuestionIndex = 0;
let score = 0;

const totalEl = document.getElementById("total");
const currentEl = document.getElementById("current");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score");

totalEl.textContent = questions.length;

function loadQuestion() {
  const q = questions[currentQuestionIndex];
  questionEl.textContent = q.question;
  currentEl.textContent = currentQuestionIndex + 1;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.disabled = true;

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.classList.add("option");
    btn.textContent = option;
    btn.onclick = () => handleAnswer(btn, q.answer);
    optionsEl.appendChild(btn);
  });
}

function handleAnswer(button, correctAnswer) {
  const allButtons = document.querySelectorAll(".option");
  allButtons.forEach(btn => btn.disabled = true);

  if (button.textContent === correctAnswer) {
    button.classList.add("correct");
    feedbackEl.textContent = "✅ Correct!";
    score++;
  } else {
    button.classList.add("wrong");
    allButtons.forEach(btn => {
      if (btn.textContent === correctAnswer) btn.classList.add("correct");
    });
    feedbackEl.textContent = "❌ Wrong!";
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  document.getElementById("quiz-box").classList.add("hide");
  scoreContainer.classList.remove("hide");
  scoreText.textContent = `${score} / ${questions.length}`;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreContainer.classList.add("hide");
  document.getElementById("quiz-box").classList.remove("hide");
  loadQuestion();
}

// Start quiz
loadQuestion();
