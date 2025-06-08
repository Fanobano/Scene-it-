const questions = [
  {
    question: "Which movie is this poster from?",
    options: ["Interstellar", "Inception", "Tenet", "The Prestige"],
    correctIndex: 1,
    imageUrl: "/Assets/inception.jpg"
  },
  {
    question: "Which movie is this poster from?",  
    options: ["La La Land", "Whiplash", "The Notebook", "A Star Is Born"],
    correctIndex: 0,
    imageUrl: "/Assets/lalaland.jpg"
  },
  {
    question: "Which movie is this poster from?",
    options: ["The Dark Knight", "Joker", "Fight Club", "American Psycho"],
    correctIndex: 1,
    imageUrl: "/Assets/joker.jpg"
  },
  {
    question: "Which movie is this poster from?",
    options: ["Avengers: Endgame", "Avatar", "Guardians of the Galaxy", "The Martian"],
    correctIndex: 1,
    imageUrl: "/Assets/avatar.jpg"
  },
  {
    question: "Which movie is this poster from?",
    options: ["Frozen", "Tangled", "Brave", "Moana"],
    correctIndex: 0,
    imageUrl: "/Assets/frozen.jpg"
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

  if (question.imageUrl) {
        questionContentArea.innerHTML = `<img src="${question.imageUrl}" alt="Movie Poster" class="poster-image">`;
    } else if (question.quote) {
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
  music.volume = 0.3;
  if (music.muted) {
    music.muted = false;
    music.play();
  }
}, { once: true });

