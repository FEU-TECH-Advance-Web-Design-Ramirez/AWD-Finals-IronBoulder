const API_URL = "https://demo-api-skills.vercel.app/api/HealthTracker/users";

let submitBtn = document.getElementById("submitBtn");
let title = document.getElementById("title");
let nameField = document.getElementById("nameField");
let errorMsg = document.getElementById("error-msg");
let toggleText = document.getElementById("toggleText");

let mode = "signup";

function updateToggleText() {
    toggleText.innerHTML = mode === "signup"
        ? 'Already have an account? <a href="#" id="toggleForm">Sign In</a>'
        : 'Don\'t have an account? <a href="#" id="toggleForm">Sign Up</a>';
}

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

function handleSignUp(name, email, password) {
    axios.get(API_URL)
        .then(response => {
            const users = response.data;
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                errorMsg.textContent = "Email already in use.";
                return;
            }

            axios.post(API_URL, { name, email, password })
                .then(response => {
                    const newUser = response.data;
                    alert(`User registered successfully! ID: ${newUser.id}, Email: ${newUser.email}`);
                    document.getElementById("userForm").reset();
                    handleSignIn(email, password);
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

function handleSignIn(email, password) {
    axios.get(API_URL)
        .then(response => {
            const users = response.data;
            const user = users.find(user => user.email === email);

            if (!user) {
                errorMsg.textContent = "Email not found.";
                return;
            }

            if (user.password !== password) {  
                errorMsg.textContent = "Incorrect password.";
                return;
            }

            // Store the logged-in user info in localStorage
            localStorage.setItem("loggedInUserId", user.id);
            localStorage.setItem("loggedInUserEmail", user.email);

            alert(`Welcome back, ${user.name}! ID: ${user.id}, Email: ${user.email}`);
            document.getElementById("userForm").reset();
            errorMsg.textContent = "";

            fetchUser();
        })
        .catch(error => {
            errorMsg.textContent = "Error logging in. Try again.";
            console.error("Error:", error);
        });
}

function fetchUser() {
    const userId = localStorage.getItem("loggedInUserId");
    if (!userId) return;

    axios.get(`${API_URL}/${userId}`)
        .then(response => {
            const user = response.data;
            let outputHTML = `
                <div>
                    <h3>Signed In User</h3>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>ID:</strong> ${user.id}</p>
                    <button onclick="deleteUser('${user.id}')">Delete Account</button>
                </div>
            `;
            document.getElementById("output").innerHTML = outputHTML;
            document.getElementById("output").style.display = "block";
        })
        .catch(error => {
            console.error("Error fetching user:", error);
        });
}

function deleteUser(userId) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    axios.delete(`${API_URL}/${userId}`)
        .then(() => {
            alert("User deleted successfully!");
            localStorage.removeItem("loggedInUserId");
            localStorage.removeItem("loggedInUserEmail");
            document.getElementById("output").style.display = "none";
        })
        .catch(error => {
            console.error("Error deleting user:", error);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    fetchUser();
});
