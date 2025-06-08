const questions = [
  {
    question: "Which movie is this from?",
    options: ["The Terminator", "Die Hard", "John Wick", "The Raid"],
    correctIndex: 2,
    videoUrl: "/Assets/johnwick.mp4"
  },
  {
    question: "Which movie is this from?",
    options: ["Despicable me", "Despicable me 2", "Despicable me 3", "Despicable me 4"],
    correctIndex: 3,
    videoUrl: "/Assets/gru4.mp4"
  },
  {
    question: "Which movie is this from?",
    options: ["Mission Impossible", "Top Gun: Maverick", "Jack Reacher", "War Thunder"],
    correctIndex: 1,
    videoUrl: "/Assets/maverick.mp4"
  },
  {
    question: "Which movie is this from?",
    options: ["Shrek", "Shrek 2", "Shrek 3", "Shrek 4"],
    correctIndex: 0,
    videoUrl: "/Assets/shrek.mp4"
  },
  {
    question: "Which movie is this from?",
    options: ["Lava Chicken", "The Hunger Games", "Minecraft Movie", "Five Nights at Freddy's"],
    correctIndex: 2,
    videoUrl: "/Assets/minecraft.mp4"
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

  if (question.videoUrl) {
    questionContentArea.innerHTML = `
      <video class="question-video" controls muted preload="metadata" width="100%" height="auto">
        <source src="${question.videoUrl}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
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
  music.volume = 0.3;
  if (music.muted) {
    music.muted = false;
    music.play();
  }
}, { once: true });
