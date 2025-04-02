const API_URL = "https://demo-api-skills.vercel.app/api/UrbanExplorer/users";

let submitBtn = document.getElementById("submitBtn");
let title = document.getElementById("title");
let nameField = document.getElementById("nameField");
let errorMsg = document.getElementById("error-msg");
let toggleText = document.getElementById("toggleText");

// Track mode (signup or signin)
let mode = "signup";

// Function to update toggle text dynamically
function updateToggleText() {
    toggleText.innerHTML = mode === "signup"
        ? 'Already have an account? <a href="#" id="toggleForm">Sign In</a>'
        : 'Don\'t have an account? <a href="#" id="toggleForm">Sign Up</a>';
}

// Event listener for toggling signup/signin form
document.addEventListener("click", function (event) {
    if (event.target.id === "toggleForm") {
        event.preventDefault();
        mode = mode === "signup" ? "signin" : "signup";

        if (mode === "signin") {
            nameField.style.display = "none";
            title.innerHTML = "Sign In";
            submitBtn.innerHTML = "Sign In";
        } else {
            nameField.style.display = "block";
            title.innerHTML = "Sign Up";
            submitBtn.innerHTML = "Sign Up";
        }

        updateToggleText();
    }
});

// Handle form submission
document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name")?.value || "";
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password || (mode === "signup" && !name)) {
        errorMsg.textContent = "Please fill in all fields.";
        return;
    }

    if (mode === "signup") {
        handleSignUp(name, email, password);
    } else {
        handleSignIn(email, password);
    }
});

// Handle Sign Up - Save email & password in API
function handleSignUp(name, email, password) {
    axios.get(API_URL)
        .then(response => {
            const users = response.data;
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                errorMsg.textContent = "Email already in use.";
                return;
            }

            axios.post(API_URL, { name, email, password }) // 🔹 Now saves password
                .then(() => {
                    alert("User registered successfully!");
                    document.getElementById("userForm").reset();
                    fetchUsers();
                })
                .catch(error => {
                    errorMsg.textContent = "Error registering user.";
                    console.error("Error:", error);
                });
        })
        .catch(error => {
            errorMsg.textContent = "Error fetching users.";
            console.error("Error:", error);
        });
}

// Handle Sign In - Check password from API
function handleSignIn(email, password) {
    axios.get(API_URL)
        .then(response => {
            const users = response.data;
            const user = users.find(user => user.email === email);

            if (!user) {
                errorMsg.textContent = "Email not found.";
                return;
            }

            if (user.password !== password) {  // 🔹 Now correctly checks password
                errorMsg.textContent = "Incorrect password.";
                return;
            }

            alert(`Welcome back, ${user.name}!`);
            document.getElementById("userForm").reset();
            errorMsg.textContent = "";
        })
        .catch(error => {
            errorMsg.textContent = "Error logging in. Try again.";
            console.error("Error:", error);
        });
}

// DELETE user function
function deleteUser(userId) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    axios.delete(`${API_URL}/${userId}`)
        .then(() => {
            alert("User deleted successfully!");
            fetchUsers();
        })
        .catch(error => {
            console.error("Error deleting user:", error);
        });
}

// Fetch and display users (hide passwords)
function fetchUsers() {
    axios.get(API_URL)
        .then(response => {
            const users = response.data;
            let outputHTML = "<ul style='list-style-type: none; padding: 0;'>";
            users.forEach(user => {
                outputHTML += `
                    <li style='display: flex; justify-content: space-between; align-items: center; padding: 5px 0; font-size: 16px;'>
                        📧 ${user.email}
                        <button onclick="deleteUser('${user.id}')" style='background-color: red; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 5px;'>Delete</button>
                    </li>
                `;
            });
            outputHTML += "</ul>";
            document.getElementById("output").innerHTML = outputHTML;
        })
        .catch(error => {
            console.error("Error fetching users:", error);
        });
}

// Load users on page load
document.addEventListener("DOMContentLoaded", fetchUsers);
