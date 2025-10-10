const chips = document.querySelectorAll(".chip");

chips.forEach((chip) => {
  chip.addEventListener("click", function () {
    chips.forEach((c) => {
      c.setAttribute("aria-pressed", "false");
      c.style.transition =
        "background-color var(--transition-standard), transform var(--transition-fast)";
    });
    this.setAttribute("aria-pressed", "true");
  });
});

const form = document.getElementById("survey-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const selectedChip = document.querySelector('.chip[aria-pressed="true"]');
  if (selectedChip) {
    data.gender = selectedChip.dataset.value;
  }

  const coffeeOptions = document.querySelectorAll('input[name="menu"]:checked');
  data.coffeePreferences = Array.from(coffeeOptions).map((cb) => cb.value);

  console.log("Form submitted:", data);

  showFeedback();

  setTimeout(() => {
    form.reset();
    chips.forEach((c) => c.setAttribute("aria-pressed", "false"));
  }, 2500);
});

function showFeedback() {
  const feedback = document.createElement("div");
  feedback.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) translateY(20px);
    background-color: #f9e8d4;
    color: #4c3837;
    padding: 45px 0px;
    font-family: "Noto Sans", sans-serif;
    font-size: 100%;
    font-weight: 550;
    width: 60%;
    max-width: 400px;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.2s ease, transform 0.2s ease;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
    text-align: center;
    letter-spacing: 0.45px;
    border: 1px solid #bb816b;
    border-radius: 8px;
  `;
  feedback.textContent = "Thank you for your feedback!";

  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(76, 56, 55, 0.75);
    z-index: 999;
    opacity: 0;
    transition: opacity 0.2s ease;
  `;

  const responsiveQuery = window.matchMedia("(max-width: 400px)");
  if (responsiveQuery.matches) {
    feedback.style.padding = "35px 0px";
    feedback.style.fontSize = "80%";
  }

  document.body.appendChild(overlay);
  document.body.appendChild(feedback);

  setTimeout(() => {
    overlay.style.opacity = "1";
    feedback.style.opacity = "1";
    feedback.style.transform = "translate(-50%, -50%) translateY(0)";
  }, 10);

  setTimeout(() => {
    overlay.style.opacity = "0";
    feedback.style.opacity = "0";
    feedback.style.transform = "translate(-50%, -50%) translateY(-20px)";

    setTimeout(() => {
      document.body.removeChild(overlay);
      document.body.removeChild(feedback);
    }, 200);
  }, 2100);
}
