const questions = [
  {
    quote: "May the Force be with you.",
    options: ["Star Wars", "Star Trek", "Guardians of the Galaxy", "Dune"],
    correctIndex: 0,
  },
  {
    quote: "I'll be back.",
    options: ["Die Hard", "Predator", "Rambo", "The Terminator"],
    correctIndex: 3,
  },
  {
    quote: "To infinity and beyond!",
    options: ["Finding Nemo", "Toy Story", "Up", "Monsters Inc."],
    correctIndex: 1,
  },
  {
    quote: "Why so serious?",
    options: ["The Dark Knight", "Joker", "Deadpool", "Batman Begins"],
    correctIndex: 0,
  },
  {
    quote: "I will find you, and I will kill you",
    options: ["Toy Story", "John Wick", "Taken", "Blade Runner"],
    correctIndex: 2,
  }
];

let currentQuestionIndex = 0;
let selectedAnswers = new Array(questions.length).fill(null);

const questionNumberElem = document.getElementById('questionNumber');
const questionContentArea = document.getElementById('questionContentArea');
const answerOptionsGrid = document.getElementById('answerOptionsGrid');
const progressBar = document.getElementById('progressBar');

function loadQuestion(index) {
  const question = questions[index];
  questionNumberElem.textContent = `${index + 1}.`;

  if (question.quote) {
    questionContentArea.textContent = `"${question.quote}"`;
  } else {
    questionContentArea.textContent = question.question || "";
  }

  for (let i = 0; i < 4; i++) {
    const btn = document.getElementById(`ansBtn${i}`);
    btn.textContent = question.options[i];
    btn.classList.remove('selected', 'correct', 'incorrect');
  }

  if (selectedAnswers[index] !== null) {
    const selectedBtn = document.getElementById(`ansBtn${selectedAnswers[index]}`);
    selectedBtn.classList.add('selected');
  }

  progressBar.style.width = `${(index / questions.length) * 100}%`;

  document.getElementById('quizBackBtn').disabled = index === 0;

  const nextBtn = document.getElementById('quizNextBtn');
  nextBtn.textContent = index === questions.length - 1 ? 'Finish' : 'Next';
}

function selectAnswer(optionIndex) {
  selectedAnswers[currentQuestionIndex] = optionIndex;

  for (let i = 0; i < 4; i++) {
    document.getElementById(`ansBtn${i}`).classList.remove('selected');
  }

  document.getElementById(`ansBtn${optionIndex}`).classList.add('selected');
}

function nextQuestion() {
  if (selectedAnswers[currentQuestionIndex] === null) {
    alert("Please select an answer before proceeding.");
    return;
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
  } else {
    let score = 0;
    selectedAnswers.forEach((ans, i) => {
      if (ans === questions[i].correctIndex) {
        score++;
      }
    });

    localStorage.setItem('quizScore', score);
    localStorage.setItem('quizTotal', questions.length);

    localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
    localStorage.setItem('questions', JSON.stringify(questions));
    window.location.href = '5Results.html';
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadQuestion(currentQuestionIndex);
});

document.addEventListener('click', () => {
  const music = document.getElementById('background-music');
  music.volume = 0.3;
  if (music.muted) {
    music.muted = false;
    music.play();
  }
}, { once: true });

