document.getElementById("checkBtn").addEventListener("click", function () {
  const name = document.getElementById("subjectName").value.toLowerCase();
  const dob = document.getElementById("dob").value;
  const location = document.getElementById("location").value.toLowerCase();
  const summary = document.getElementById("summary").value.toLowerCase();

  let score = 0;
  let matches = [];

  // Simple matching logic (V1 prototype)
  if (name.includes("jordan")) {
    score += 25;
    matches.push("Name similarity matched");
  }

  if (dob === "2012-03-15") {
    score += 25;
    matches.push("Date of birth matched");
  }

  if (location.includes("125")) {
    score += 20;
    matches.push("Location similarity matched");
  }

  if (summary.includes("prior") || summary.includes("follow-up")) {
    score += 16;
    matches.push("Summary contains related contextual terms");
  }

  // Determine classification
  let classification = "Likely New Record";
  let recommendation = "Proceed with creating a new record.";

  if (score >= 70) {
    classification = "Possible Related / Supplemental";
    recommendation = "Review existing record before creating a new one.";
  }

  if (score >= 85) {
    classification = "Possible Duplicate";
    recommendation = "Strong match found. Likely duplicate entry.";
  }

  // Update UI
  document.getElementById("resultState").classList.add("hidden");
  document.getElementById("resultDetails").classList.remove("hidden");

  document.getElementById("classificationBadge").innerText = classification;
  document.getElementById("matchScore").innerText = score + "%";

  const list = document.getElementById("matchedFieldsList");
  list.innerHTML = "";

  matches.forEach((m) => {
    const li = document.createElement("li");
    li.textContent = m;
    list.appendChild(li);
  });

  document.getElementById("recommendationText").innerText = recommendation;
});
