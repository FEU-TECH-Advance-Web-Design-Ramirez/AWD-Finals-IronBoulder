const API_URL = "https://demo-api-skills.vercel.app/api/HealthTracker";

// Create Health Record
document.getElementById('createRecordForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const userId = document.getElementById('userId').value;
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    
    try {
        const response = await axios.post(`${API_URL}/records`, {
            userId,
            type,
            description,
            date
        });
        alert("Record created successfully!");
    } catch (error) {
        console.error("Error creating record:", error);
    }
});

// Get Health Records
async function getRecords() {
    const userId = document.getElementById('fetchUserId').value;
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/records`);
        const recordsList = document.getElementById('recordsList');
        recordsList.innerHTML = "";
        response.data.forEach(record => {
            const li = document.createElement('li');
            li.textContent = `${record.type}: ${record.description} on ${record.date}`;
            recordsList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching records:", error);
    }
}

// Update Health Record
document.getElementById('updateRecordForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const recordId = document.getElementById('recordId').value;
    const description = document.getElementById('updateDescription').value;

    try {
        const response = await axios.put(`${API_URL}/records/${recordId}`, { description });
        alert("Record updated successfully!");
    } catch (error) {
        console.error("Error updating record:", error);
    }
});

// Delete Health Record
async function deleteRecord() {
    const recordId = document.getElementById('deleteRecordId').value;

    try {
        const response = await axios.delete(`${API_URL}/records/${recordId}`);
        alert("Record deleted successfully!");
    } catch (error) {
        console.error("Error deleting record:", error);
    }
}
