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

let score = 0;
let answered = {};

function checkAnswer(question, answer, button) {
  if (answered[question]) return;
  answered[question] = true;

  // Count score if correct
  if (answer === "B") score++;

  // Highlight selected
  button.classList.add("selected");

  // Disable all buttons for this question
  const buttons = document.querySelectorAll(
    `.quiz-question[data-question="${question}"] button`,
  );
  buttons.forEach((btn) => (btn.disabled = true));

  // Show next question if exists
  const nextQuestion = document.querySelector(
    `.quiz-question[data-question="${question + 1}"]`,
  );
  if (nextQuestion) {
    // Hide current question only if there is a next
    const currentQuestion = document.querySelector(
      `.quiz-question[data-question="${question}"]`,
    );
    currentQuestion.style.display = "none";
    nextQuestion.style.display = "block";
  } else {
    // Last question, keep it visible and show result below
    showResultBelow();
  }
}

function showResultBelow() {
  let resultText = "";
  if (score === 4)
    resultText = "You're very familiar with Canadian social practices!";
  else if (score >= 2)
    resultText =
      "You're getting there! A bit more learning and you'll fit right in.";
  else
    resultText =
      "Keep exploring Canadian culture — you're just getting started!";

  // Check if result already exists
  let resultEl = document.getElementById("result");
  if (!resultEl) {
    resultEl = document.createElement("h3");
    resultEl.id = "result";
    resultEl.className = "mt-4 text-center";
    const quizDiv = document.getElementById("quiz");
    quizDiv.appendChild(resultEl);
  }

  resultEl.innerText = resultText;
}

// ==================== IMPROVED QUIZ LOGIC ====================

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

  // Update score and give feedback
  if (isCorrect) {
    score++;
    button.classList.add('correct');                    // Green style
    feedbackDiv.innerHTML = `✅ Excellent! That's a classic Canadian polite gesture!`;
    feedbackDiv.style.color = '#28a745';
  } else {
    button.classList.add('incorrect');                  // Red style
    feedbackDiv.innerHTML = `❌ Not quite. In Canada, saying "Thank you" is very common when someone holds the door.`;
    feedbackDiv.style.color = '#dc3545';
  }

  // Show feedback
  feedbackDiv.style.display = 'block';

  // Update live score tracker
  document.getElementById('current-score').textContent = score;

  // Disable all buttons in this question
  const allButtons = questionDiv.querySelectorAll('button');
  allButtons.forEach(btn => btn.disabled = true);

  // Show next question or final result
  if (answered < totalQuestions) {
    const nextQuestion = document.querySelector(`.quiz-question[data-question="${questionNumber + 1}"]`);
    if (nextQuestion) {
      setTimeout(() => {
        questionDiv.style.display = 'none';
        nextQuestion.style.display = 'block';
      }, 1400);   // Small delay so user can see feedback
    }
  } else {
    // All questions answered → show final result
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

// Keep your existing showCountry function below (don't delete it)
function showCountry(country, element) {
  const canada = document.querySelector("#canada");
  const romania = document.querySelector("#romania");

  canada.style.display = "none";
  romania.style.display = "none";

  document.querySelector("#" + country).style.display = "block";

  const tabs = document.querySelectorAll("#countryTabs .nav-link");
  tabs.forEach((tab) => tab.classList.remove("active"));

  element.classList.add("active");
}
