document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from refreshing page
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!username || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }
    
    const userData = {
        username: username,
        email: email,
        password: password // In real apps, never store passwords in plain text!
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    alert('Sign-up successful!');
    document.getElementById('signupForm').reset();
});