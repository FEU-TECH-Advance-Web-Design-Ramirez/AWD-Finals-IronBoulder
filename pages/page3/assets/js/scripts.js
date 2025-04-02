const API_BASE_URL = "https://demo-api-skills.vercel.app/api/HealthTracker";

// Add Clinic
document.getElementById("addClinicForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const clinicData = {
        name: document.getElementById("name").value,
        location: document.getElementById("location").value,
        availableSlots: document.getElementById("availableSlots").value,
        contact: document.getElementById("contact").value
    };

    const response = await fetch(`${API_BASE_URL}/clinics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clinicData)
    });

    if (response.ok) {
        alert("Clinic added successfully!");
        fetchClinics();
    } else {
        alert("Failed to add clinic.");
    }
});

// Fetch Clinics
async function fetchClinics() {
    const response = await fetch(`${API_BASE_URL}/clinics`);
    const clinics = await response.json();
    
    const clinicList = document.getElementById("clinicList");
    clinicList.innerHTML = "";

    clinics.forEach(clinic => {
        const li = document.createElement("li");
        li.textContent = `${clinic.name} - ${clinic.location}`;
        clinicList.appendChild(li);
    });
}

// Search Clinics
document.getElementById("searchClinicsBtn").addEventListener("click", async function () {
    const location = document.getElementById("searchLocation").value;
    const date = document.getElementById("searchDate").value;

    const queryParams = new URLSearchParams();
    if (location) queryParams.append("location", location);
    if (date) queryParams.append("date", date);

    const response = await fetch(`${API_BASE_URL}/clinics/search?${queryParams.toString()}`);
    const results = await response.json();
    
    const clinicList = document.getElementById("clinicList");
    clinicList.innerHTML = "";

    results.forEach(clinic => {
        const li = document.createElement("li");
        li.textContent = `${clinic.name} - ${clinic.location}`;
        clinicList.appendChild(li);
    });
});

// Load Clinics on Page Load
window.onload = fetchClinics;
