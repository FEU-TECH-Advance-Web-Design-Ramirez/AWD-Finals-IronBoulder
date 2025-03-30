// Function to log a symptom
function logSymptom() {
    const symptomName = document.getElementById('symptomName').value;
    const severity = document.getElementById('severity').value;
    const notes = document.getElementById('notes').value;
    const timestamp = new Date().toLocaleString();

    if (!symptomName || !severity) {
        alert("Please enter both symptom and severity.");
        return;
    }

    const symptom = { symptomName, severity, notes, timestamp };
    symptoms.push(symptom);

    saveSymptomsToJSON(); // Save to JSON storage
    displaySymptoms();

    // Clear input fields
    document.getElementById('symptomName').value = '';
    document.getElementById('severity').value = '';
    document.getElementById('notes').value = '';
}

// Function to display symptoms
function displaySymptoms() {
    const symptomsList = document.getElementById('symptomsList');
    symptomsList.innerHTML = ""; // Clear existing list

    symptoms.forEach((symptom, index) => {
        const symptomItem = document.createElement('li');
        symptomItem.classList.add('symptom-item');

        symptomItem.innerHTML = `
            <div><strong>${symptom.symptomName}</strong> (${symptom.severity})</div>
            <div>${symptom.notes ? `Notes: ${symptom.notes}` : ''}</div>
            <div><small>Logged: ${symptom.timestamp}</small></div>
            <button class="delete-button" onclick="deleteSymptom(${index})">Delete</button>
        `;

        symptomsList.appendChild(symptomItem);
    });
}

// Function to delete a symptom
function deleteSymptom(index) {
    symptoms.splice(index, 1);
    saveSymptomsToJSON(); // Save updated symptoms
    displaySymptoms();
}

// Function to export symptoms to a JSON file
function exportSymptomsToJSON() {
    let symptomsJSON = JSON.stringify(symptoms, null, 2);
    let blob = new Blob([symptomsJSON], { type: "application/json" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "symptom_log.json";
    a.click();
}

// Function to import symptoms from a JSON file
function importSymptomsFromJSON(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
        try {
            symptoms = JSON.parse(e.target.result);
            saveSymptomsToJSON(); // Save imported symptoms
            displaySymptoms();
        } catch (error) {
            alert("Invalid JSON file");
        }
    };

    reader.readAsText(file);
}

// Update the current time every second
setInterval(updateCurrentTime, 1000);
updateCurrentTime(); // Update the current time immediately on page load
loadSymptomsFromJSON(); // Load symptoms on page load



