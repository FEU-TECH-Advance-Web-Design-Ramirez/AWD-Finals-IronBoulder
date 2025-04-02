const API_BASE_URL = "https://demo-api-skills.vercel.app/api/HealthTracker";

        // Add Clinic
        document.getElementById("addClinicForm").addEventListener("submit", async function (e) {
            e.preventDefault();

            const clinicData = {
                name: document.getElementById("name").value,
                location: document.getElementById("location").value,
                availableSlots: parseInt(document.getElementById("availableSlots").value),
                contact: document.getElementById("contact").value
            };

            try {
                const response = await fetch(`${API_BASE_URL}/clinics`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(clinicData)
                });

                if (!response.ok) {
                    throw new Error("Failed to add clinic.");
                }

                alert("Clinic added successfully!");
                fetchClinics();
            } catch (error) {
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
            const location = document.getElementById("searchLocation").value;
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