document.getElementById("checkBtn").addEventListener("click", function () {
  const newEntry = {
    name: document.getElementById("subjectName").value.toLowerCase(),
    dob: document.getElementById("dob").value,
    location: document.getElementById("location").value.toLowerCase(),
    summary: document.getElementById("summary").value.toLowerCase()
  };

  const records = [
    {
      name: "jordan lee",
      dob: "2012-03-15",
      location: "125 n street",
      summary: "initial report involving the same household"
    },
    {
      name: "j lee",
      dob: "2012-03-15",
      location: "440 south ave",
      summary: "separate report"
    },
    {
      name: "taylor green",
      dob: "2011-09-02",
      location: "125 north street",
      summary: "related location"
    }
  ];

  let bestScore = 0;
  let bestMatchSignals = [];

  records.forEach(record => {
    let score = 0;
    let signals = [];

    // Name similarity (basic)
    if (newEntry.name === record.name) {
      score += 30;
      signals.push("Exact name match");
    } else if (
      newEntry.name.includes(record.name.split(" ")[0]) ||
      record.name.includes(newEntry.name.split(" ")[0])
    ) {
      score += 15;
      signals.push("Partial name match");
    }

    // DOB match
    if (newEntry.dob === record.dob) {
      score += 25;
      signals.push("Date of birth matched");
    }

    // Location match (loose)
    if (
      newEntry.location.includes("125") &&
      record.location.includes("125")
    ) {
      score += 20;
      signals.push("Location similarity matched");
    }

    // Summary context
    if (
      newEntry.summary.includes("prior") ||
      newEntry.summary.includes("follow")
    ) {
      score += 10;
      signals.push("Context suggests continuation");
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatchSignals = signals;
    }
  });

  // Classification logic
  let classification = "Likely New Record";
  let recommendation = "Proceed with creating a new record.";

  if (bestScore >= 60) {
    classification = "Possible Related / Supplemental";
    recommendation = "Review existing record before creating a new one.";
  }

  if (bestScore >= 80) {
    classification = "Possible Duplicate";
    recommendation = "Strong match found. Likely duplicate entry.";
  }

  // Update UI
  document.getElementById("resultState").classList.add("hidden");
  document.getElementById("resultDetails").classList.remove("hidden");

  document.getElementById("classificationBadge").innerText = classification;
  document.getElementById("matchScore").innerText = bestScore + "%";

  const list = document.getElementById("matchedFieldsList");
  list.innerHTML = "";

  bestMatchSignals.forEach(signal => {
    const li = document.createElement("li");
    li.textContent = signal;
    list.appendChild(li);
  });

  document.getElementById("recommendationText").innerText = recommendation;
});
