document.getElementById("login-btn").addEventListener("click", async () => {
    const username = document.getElementById("login-username-input").value;
    const password = document.getElementById("login-password-input").value;

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    try {
        // Send a POST request to the backend to validate the credentials
        const response = await fetch("http://localhost:5050/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // If login is successful redirect to the main page
            alert("Login successful!");
            window.location.href = "index.html";
        } else {
            // If login fails show an error message
            alert(data.message || "Invalid username or password.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again later.");
    }
});


// Get references to elements
const registerBtn = document.querySelector('#register-btn');
const registerSection = document.querySelector('#register-section');
const submitRegisterBtn = document.querySelector('#submit-register-btn');

// Toggle form visibility when "Register" button is clicked
registerBtn.addEventListener('click', () => {
    registerSection.hidden = !registerSection.hidden;
});

// Handle registration submission
submitRegisterBtn.addEventListener('click', () => {
    const name = document.querySelector('#firstname-input').value.trim();
    const lastName = document.querySelector('#lastname-input').value.trim();
    const username = document.querySelector('#username-input').value.trim();
    const password = document.querySelector('#password-input').value;
    const salary = parseFloat(document.querySelector('#salary-input').value);
    const age = parseInt(document.querySelector('#age-input').value);

    // Validate inputs
    if (!name || !lastName || !username || !password || isNaN(salary) || isNaN(age)) {
        alert("Please fill out all fields correctly.");
        return;
    }

    // Send POST request to backend
    fetch('http://localhost:5050/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, lastName, username, password, salary, age })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Registration successful:", data);
        alert("Registration successful!");

        // Clear the form
        document.querySelectorAll('#firstname-input, #lastname-input, #username-input, #password-input, #salary-input, #age-input')
            .forEach(input => input.value = "");

        // Hide the form after registration
        registerSection.hidden = true;
    })
    .catch(err => {
        console.error("Registration failed:", err);
        alert("Registration failed. Check console for details.");
    });
});
