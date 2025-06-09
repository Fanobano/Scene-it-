const questions = [
  {
    question: "Which movie is this audio from?",
    options: ["Harry Potter", "Fanstastic Beast", "Wizard of Oz", "Doctor Who"],
    correctIndex: 0,
    audioUrl: "/Assets/harrypotter.mp3"
  },
  {
    question: "Which movie is this audio from?",
    options: ["Rush Hour 1", "Rush Hour 2", "Rush Hour 3", "Rush Hour 4"],
    correctIndex: 2,
    audioUrl: "/Assets/rushhour.mp3"
  },
  {
    question: "Which movie is this audio from?",
    options: ["The Conjuring", "The Shining", "Final Destination", "IT"],
    correctIndex: 1,
    audioUrl: "/Assets/shining.mp3"
  },
  {
    question: "Which movie is this audio from?",
    options: ["Star Wars", "Grown Ups", "Star Trek", "Space Balls"],
    correctIndex: 0,
    audioUrl: "/Assets/starwars.mp3"
  },
  {
    question: "Which movie is this audio from?",
    options: ["The Mask", "Puss in Boots", "Shrek", "The Truman Show"],
    correctIndex: 3,
    audioUrl: "/Assets/truman.mp3"
  },
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

  if (question.audioUrl) {
    questionContentArea.innerHTML = `
        <audio controls preload="auto">
        <source src="${question.audioUrl}" type="audio/mpeg">
         Your browser does not support the audio element.
        </audio>
        `;
    } else {
        questionContentArea.textContent = question.question;
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
  if (index === questions.length - 1) {
    nextBtn.textContent = 'Finish';
  } else {
    nextBtn.textContent = 'Next';
  }
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
  music.volume = 0.5;
  if (music.muted) {
    music.muted = false;
    music.play();
  }
}, { once: true });

