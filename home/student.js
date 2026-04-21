document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    
    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match! Please check again.");
        return;
    }
 
    console.log("Registration Data:", { username, email, password });
    
     alert("Account created successfully for " + username + "!");
    
});