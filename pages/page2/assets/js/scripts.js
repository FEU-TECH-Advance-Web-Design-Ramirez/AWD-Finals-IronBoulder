const API_URL = "https://demo-api-skills.vercel.app/api/HealthTracker";

// Create Schedule
document.addEventListener("DOMContentLoaded", async function () {
    const storedUserId = localStorage.getItem("loggedInUserId");
    if (storedUserId) {
        try {
            const response = await axios.get(`${API_URL}/users`);
            const users = response.data;
            const matchingUser = users.find(user => user.id == storedUserId);

            if (matchingUser) {
                document.getElementById("userId").value = matchingUser.name; // Show Name
                document.getElementById("fetchUserId").value = matchingUser.name; // Display Name
                document.getElementById("hiddenUserId").value = matchingUser.id; // Store User ID
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
});

// Get Schedules
async function getSchedules() {
    const userId = document.getElementById('fetchUserId').value;
    
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/schedules`);
        const scheduleList = document.getElementById('scheduleList');
        scheduleList.innerHTML = ""; // Clear previous data

        response.data.forEach(schedule => {
            const li = document.createElement('li');
            li.textContent = `${schedule.type}: ${schedule.title} on ${schedule.dateTime} `;

            // Create Delete Button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = "Delete";
            deleteBtn.style.marginLeft = "100px";
            deleteBtn.style.backgroundColor = "red";
            deleteBtn.style.padding = "8px";
            deleteBtn.style.width = "80px";
            deleteBtn.onclick = async function() {
                await deleteSchedule(schedule.id || schedule._id, li);
            };

            li.appendChild(deleteBtn);
            scheduleList.appendChild(li);
        });
    } catch (error) {
        console.error("❌ Error fetching schedules:", error);
    }
}

async function deleteSchedule(scheduleId, listItem) {
    if (!scheduleId) {
        alert("❌ Error: Invalid Schedule ID");
        return;
    }

    try {
        await axios.delete(`${API_URL}/schedules/${scheduleId}`);
        alert("✅ Schedule deleted successfully!");
        listItem.remove();
    } catch (error) {
        console.error("❌ Error deleting schedule:", error);
    }
}
