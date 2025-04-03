const API_URL = "https://demo-api-skills.vercel.app/api/HealthTracker";

// Auto-fill userId on page load
document.addEventListener("DOMContentLoaded", function () {
    const storedUserId = localStorage.getItem("loggedInUserId");
    if (storedUserId) {
        document.getElementById("userId").value = storedUserId;
        document.getElementById("fetchUserId").value = storedUserId;
    }
});

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
        getRecords();
    } catch (error) {
        console.error("Error creating record:", error.response?.data || error.message);
    }
});

// Get Health Records with User Name
async function getRecords() {
    const userId = document.getElementById('fetchUserId').value;
    if (!userId) {
        alert("Please enter a User ID.");
        return;
    }
    
    try {
        // First fetch the user's name
        const userResponse = await axios.get(`${API_URL}/users/${userId}`);
        const userName = userResponse.data.name;
        
        // Then fetch the records
        const recordsResponse = await axios.get(`${API_URL}/users/${userId}/records`);
        const recordsList = document.getElementById('recordsList');
        
        // Create a header with the user's name
        recordsList.innerHTML = `<h3>Health Records for ${userName}</h3>`;
        
        // Display each record
        recordsResponse.data.forEach(record => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Type:</strong> ${record.type} | 
                <strong>Description:</strong> ${record.description} | 
                <strong>Date:</strong> ${record.date}
                <button onclick="deleteRecord('${record.id}')">Delete</button>
            `;
            recordsList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
    }
}

// Delete Health Record
async function deleteRecord(recordId) {
    try {
        await axios.delete(`${API_URL}/records/${recordId}`);
        alert("Record deleted successfully!");
        getRecords();
    } catch (error) {
        console.error("Error deleting record:", error.response?.data || error.message);
    }
}