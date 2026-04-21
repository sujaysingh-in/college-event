document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.querySelector("form");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents page reload

        // Get values from input fields
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const phone = contactForm.querySelector('input[name="phone"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();

        // Basic Validation
        if (name === "" || email === "" || message === "") {
            alert("Please fill in all required fields (Name, Email, and Message).");
            return;
        }

        // Email Format Validation
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.match(emailPattern)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Success Message
        alert(`Thank you, ${name}! Your message has been sent successfully. We will contact you at ${email} shortly.`);
        
        // Clear the form
        contactForm.reset();
    });

    // Reset button log
    contactForm.addEventListener("reset", function() {
        console.log("Form has been cleared.");
    });
});