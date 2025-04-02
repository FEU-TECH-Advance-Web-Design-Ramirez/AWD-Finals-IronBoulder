const API_URL = "https://demo-api-skills.vercel.app/api/HealthTracker";

// Create Schedule
document.getElementById('createScheduleForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const userId = document.getElementById('userId').value;
    const type = document.getElementById('type').value;
    const title = document.getElementById('title').value;
    const dateTime = document.getElementById('dateTime').value;
    const notes = document.getElementById('notes').value;
    
    try {
        const response = await axios.post(`${API_URL}/schedules`, {
            userId,
            type,
            title,
            dateTime,
            notes
        });
        alert("✅ Schedule created successfully!");
    } catch (error) {
        console.error("❌ Error creating schedule:", error);
    }
});

// Get Schedules
async function getSchedules() {
    const userId = document.getElementById('fetchUserId').value;
    
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/schedules`);
        const scheduleList = document.getElementById('scheduleList');
        scheduleList.innerHTML = "";

        response.data.forEach(schedule => {
            const li = document.createElement('li');
            li.textContent = `${schedule.type}: ${schedule.title} on ${schedule.dateTime}`;
            scheduleList.appendChild(li);
        });
    } catch (error) {
        console.error("❌ Error fetching schedules:", error);
    }
}

// Update Schedule
document.getElementById('updateScheduleForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const scheduleId = document.getElementById('scheduleId').value;
    const type = document.getElementById('updateType').value;
    const title = document.getElementById('updateTitle').value;
    const dateTime = document.getElementById('updateDateTime').value;
    const notes = document.getElementById('updateNotes').value;

    if (!scheduleId) {
        alert("❌ Please enter a Schedule ID.");
        return;
    }

    try {
        const response = await axios.patch(`${API_URL}/schedules/${scheduleId}`, {  // 🔹 Changed to PATCH for partial updates
            type: type || undefined,  
            title: title || undefined,
            dateTime: dateTime || undefined,
            notes: notes || undefined
        });

        alert("✅ Schedule updated successfully!");
    } catch (error) {
        console.error("❌ Error updating schedule:", error.response?.data || error);
        alert("❌ Failed to update schedule.");
    }
});




// Delete Schedule
async function deleteSchedule() {
    const scheduleId = document.getElementById('deleteScheduleId').value;

    try {
        const response = await axios.delete(`${API_URL}/schedules/${scheduleId}`);
        alert("✅ Schedule deleted successfully!");
    } catch (error) {
        console.error("❌ Error deleting schedule:", error);
    }
}