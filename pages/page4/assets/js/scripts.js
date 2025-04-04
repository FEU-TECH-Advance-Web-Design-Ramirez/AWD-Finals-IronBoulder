const API_URL = "https://demo-api-skills.vercel.app/api/HealthTracker";



//Auto-fill user details on page load
document.addEventListener("DOMContentLoaded", async function () {
    const storedUserId = localStorage.getItem("loggedInUserId");
    if (storedUserId) {
        try {
            const response = await axios.get(`${API_URL}/users`);
            const users = response.data;
            const matchingUser = users.find(user => user.id == storedUserId);

            if (matchingUser) {
                document.getElementById("userId").value = matchingUser.name;  // Display Name
                document.getElementById("fetchUserId").value = matchingUser.name; // Display Name
                document.getElementById("hiddenUserId").value = matchingUser.id; // Store User ID
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
});

//Create Health Record & Fetch Records Automatically
document.getElementById('createRecordForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const userId = document.getElementById('hiddenUserId').value; //Use Correct ID
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;

    if (!userId) {
        alert("Error: Missing User ID. Please log in again.");
        return;
    }

    try {
        await axios.post(`${API_URL}/records`, {
            userId,
            type,
            description,
            date: new Date(date).toISOString().split('T')[0] // Convert to YYYY-MM-DD
        });

        alert("Record created successfully!");
        document.getElementById('createRecordForm').reset();
        getRecords(); //Auto-fetch records after creation
    } catch (error) {
        console.error("Error creating record:", error.response?.data || error.message);
    }
});

//Fetch & Display Records
async function getRecords() {
    const userId = document.getElementById('hiddenUserId').value; //Use hiddenUserId
    if (!userId) {
        alert("Error: Missing User ID. Please log in again.");
        return;
    }

    try {
        console.log("Fetching records for user ID:", userId);

        //Fetch records for the user
        const recordsResponse = await axios.get(`${API_URL}/records?userId=${userId}`);
        const recordsList = document.getElementById('recordsList');
        
        //Clear previous records
        recordsList.innerHTML = `<h3>Health Records</h3>`;

        //Handle case where no records are found
        if (!recordsResponse.data || recordsResponse.data.length === 0) {
            recordsList.innerHTML += `<p>No records found.</p>`;
            return;
        }

        // Loop through records and display them
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
        console.error("Error fetching records:", error.response?.data || error.message);
        alert("Failed to fetch records. Please try again.");
    }
}

//Delete Health Record
async function deleteRecord(recordId) {
    try {
        console.log("Deleting record:", recordId);
        await axios.delete(`${API_URL}/records/${recordId}`);
        alert("Record deleted successfully!");
        getRecords(); //Refresh list after deletion
    } catch (error) {
        console.error("Error deleting record:", error.response?.data || error.message);
        alert("Failed to delete record.");
    }
}

// Add event listener to "Get Records" button
document.getElementById("getRecords").addEventListener("click", getRecords);