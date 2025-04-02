const API_BASE_URL = "https://demo-api-skills.vercel.app/api/HealthTracker";

// Add Clinic
document.getElementById("addClinicForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const clinicData = {
        name: document.getElementById("name").value.trim(),
        location: document.getElementById("location").value.trim(),
        availableSlots: parseInt(document.getElementById("availableSlots").value),
        contact: document.getElementById("contact").value.trim()
    };

    console.log("Sending Data:", clinicData); // Debugging

    try {
        const response = await fetch(`${API_BASE_URL}/clinics`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(clinicData)
        });

        const responseData = await response.json(); // Get response data
        console.log("API Response:", responseData); // Debugging

        if (!response.ok) {
            throw new Error(responseData.message || "Failed to add clinic.");
        }

        alert("Clinic added successfully!");
        document.getElementById("addClinicForm").reset();
        fetchClinics();
    } catch (error) {
        console.error("Error:", error);
        alert(error.message);
    }
});

// Fetch Clinics
async function fetchClinics() {
    try {
        const response = await fetch(`${API_BASE_URL}/clinics`);
        if (!response.ok) {
            throw new Error("Failed to fetch clinics.");
        }
        const clinics = await response.json();
        console.log("Fetched Clinics:", clinics); // Debugging

        const clinicList = document.getElementById("clinicList");
        clinicList.innerHTML = "";

        clinics.forEach(clinic => {
            const li = document.createElement("li");
            li.textContent = `${clinic.name} - ${clinic.location}`;
            clinicList.appendChild(li);
        });
    } catch (error) {
        console.error(error);
    }
}

// Search Clinics
document.getElementById("searchClinicsBtn").addEventListener("click", async function () {
    const location = document.getElementById("searchLocation").value.trim();
    const date = document.getElementById("searchDate").value;

    const queryParams = new URLSearchParams();
    if (location) queryParams.append("location", location);
    if (date) queryParams.append("date", date);

    try {
        const response = await fetch(`${API_BASE_URL}/clinics/search?${queryParams.toString()}`);
        if (!response.ok) {
            throw new Error("Failed to search clinics.");
        }
        const results = await response.json();
        console.log("Search Results:", results); // Debugging

        const clinicList = document.getElementById("clinicList");
        clinicList.innerHTML = "";

        results.forEach(clinic => {
            const li = document.createElement("li");
            li.textContent = `${clinic.name} - ${clinic.location}`;
            clinicList.appendChild(li);
        });
    } catch (error) {
        console.error(error);
    }
});

// Load Clinics on Page Load
window.onload = fetchClinics;
