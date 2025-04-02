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
        document.getElementById('createRecordForm').reset();
        getRecords(); // Refresh records list
    } catch (error) {
        console.error("Error creating record:", error.response?.data || error.message);
    }
});

// Get Health Records
async function getRecords() {
    const userId = document.getElementById('fetchUserId').value;
    if (!userId) {
        alert("Please enter a User ID.");
        return;
    }
    
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/records`);
        const recordsList = document.getElementById('recordsList');
        recordsList.innerHTML = "";
        response.data.forEach(record => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>ID:</strong> ${record.id} | 
                <strong>Type:</strong> ${record.type} | 
                <strong>Description:</strong> ${record.description} | 
                <strong>Date:</strong> ${record.date}
                <button onclick="deleteRecord('${record.id}')">Delete</button>
            `;
            recordsList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching records:", error.response?.data || error.message);
    }
}


// Delete Health Record
async function deleteRecord(recordId) {
    if (!recordId) {
        recordId = document.getElementById('deleteRecordId').value;
        if (!recordId) {
            alert("Please enter a Record ID.");
            return;
        }
    }

    try {
        await axios.delete(`${API_URL}/records/${recordId}`);
        alert("Record deleted successfully!");
        getRecords(); // Refresh records list
    } catch (error) {
        console.error("Error deleting record:", error.response?.data || error.message);
    }
}
