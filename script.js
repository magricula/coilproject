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

let score = 0;
let answered = {};

function checkAnswer(question, answer, button) {
  if (answered[question]) return;
  answered[question] = true;

  if (answer === "B") score++;

  button.classList.add("selected");

  const buttons = document.querySelectorAll(
    `.quiz-question[data-question="${question}"] button`
  );
  buttons.forEach((btn) => (btn.disabled = true));

  const nextQuestion = document.querySelector(
    `.quiz-question[data-question="${question + 1}"]`
  );

  if (nextQuestion) {
    document.querySelector(
      `.quiz-question[data-question="${question}"]`
    ).style.display = "none";

    nextQuestion.style.display = "block";
  } else {
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

  let resultEl = document.getElementById("result");

  if (!resultEl) {
    resultEl = document.createElement("h3");
    resultEl.id = "result";
    resultEl.className = "mt-4 text-center";
    document.getElementById("quiz").appendChild(resultEl);
  }

  resultEl.innerText = resultText;
}
