document.addEventListener('DOMContentLoaded', () => {
const selectedAnswers = JSON.parse(localStorage.getItem('selectedAnswers'));
const questions = JSON.parse(localStorage.getItem('questions'));
console.log('selectedAnswers:', localStorage.getItem('selectedAnswers'));
console.log('questions:', localStorage.getItem('questions'));


  if (!selectedAnswers || !questions) {
    document.getElementById('scoreDisplay').textContent = 'No quiz data found.';
    return;
  }

  let score = 0;
  const correctQuestions = [];

  selectedAnswers.forEach((answerIndex, i) => {
    if (answerIndex === questions[i].correctIndex) {
      score++;
      correctQuestions.push({
        question: questions[i].question,
        correctAnswer: questions[i].options[questions[i].correctIndex],
      });
    }
  });

  document.getElementById('scoreDisplay').textContent = `Your score: ${score} / ${questions.length}`;

  if (correctQuestions.length > 0) {
    const listContainer = document.createElement('div');
    listContainer.classList.add('correct-list');

    const title = document.createElement('h2');
    title.textContent = "Questions you got right:";
    listContainer.appendChild(title);

    const ul = document.createElement('ul');
    correctQuestions.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.question} — Correct answer: ${item.correctAnswer}`;
      ul.appendChild(li);
    });

    listContainer.appendChild(ul);
    document.body.appendChild(listContainer);
  }
});

function restartQuiz() {
  localStorage.removeItem('selectedAnswers');
  localStorage.removeItem('questions');
  localStorage.removeItem('quizScore');
  localStorage.removeItem('quizTotal');

  window.location.href = '2Gamemode.html'; 
}

document.addEventListener('click', () => {
  const music = document.getElementById('background-music');
  if (music.muted) {
    music.muted = false;
    music.play();
  }
}, { once: true });
