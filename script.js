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
    .quiz-question[data-question="${question}"] button,
  );
  buttons.forEach((btn) => (btn.disabled = true));
  // Show next question if exists
  const nextQuestion = document.querySelector(
    .quiz-question[data-question="${question + 1}"],
  );
  if (nextQuestion) {
    // Hide current question only if there is a next
    const currentQuestion = document.querySelector(
      .quiz-question[data-question="${question}"],
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
