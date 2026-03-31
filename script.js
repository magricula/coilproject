function showCountry(country, element) {
  const canada = document.querySelector("#canada");
  const romania = document.querySelector("#romania");

  // Hide both
  canada.style.display = "none";
  romania.style.display = "none";

  // Show selected
  document.querySelector("#" + country).style.display = "block";

  // Remove active class
  const tabs = document.querySelectorAll("#countryTabs .nav-link");
  tabs.forEach((tab) => tab.classList.remove("active"));

  // Activate clicked tab
  element.classList.add("active");
}

// ==================== QUIZ LOGIC (Improved Version) ====================

let score = 0;
let answered = 0;
const totalQuestions = 4;

function checkAnswer(button) {
  const questionDiv = button.closest('.quiz-question');
  const questionNumber = parseInt(questionDiv.dataset.question);
  const isCorrect = button.getAttribute('data-correct') === 'true';
  const feedbackDiv = questionDiv.querySelector('.feedback');

  // Prevent answering twice
  if (questionDiv.classList.contains('answered')) return;
  questionDiv.classList.add('answered');

  answered++;

  // Give feedback and update score
  if (isCorrect) {
    score++;
    button.classList.add('correct');
    feedbackDiv.innerHTML = `✅ Excellent! That's a classic Canadian polite gesture!`;
    feedbackDiv.style.color = '#28a745';
  } else {
    button.classList.add('incorrect');
    feedbackDiv.innerHTML = `❌ Not quite. In Canada, saying "Thank you" is very common when someone holds the door.`;
    feedbackDiv.style.color = '#dc3545';
  }

  feedbackDiv.style.display = 'block';

  // Update live score
  document.getElementById('current-score').textContent = score;

  // Disable buttons
  const allButtons = questionDiv.querySelectorAll('button');
  allButtons.forEach(btn => btn.disabled = true);

  // Show next question or final result
  if (answered < totalQuestions) {
    const nextQuestion = document.querySelector(`.quiz-question[data-question="${questionNumber + 1}"]`);
    if (nextQuestion) {
      setTimeout(() => {
        questionDiv.style.display = 'none';
        nextQuestion.style.display = 'block';
      }, 1400);
    }
  } else {
    setTimeout(showFinalResult, 1600);
  }
}

function showFinalResult() {
  const percentage = Math.round((score / totalQuestions) * 100);
  const resultText = document.getElementById('result-text');
  const resultBadge = document.getElementById('result-badge');
  const resultDiv = document.getElementById('quiz-result');

  let badgeText = '';
  if (percentage === 100) {
    badgeText = '🎉 Polite Canadian Explorer';
  } else if (percentage >= 75) {
    badgeText = '👍 Almost Canadian!';
  } else if (percentage >= 50) {
    badgeText = '🌟 Getting There!';
  } else {
    badgeText = '🤝 Keep Exploring Canadian Culture!';
  }

  resultText.textContent = `You got ${score} out of ${totalQuestions} correct (${percentage}%)`;
  resultBadge.textContent = badgeText;
  resultDiv.style.display = 'block';
}
