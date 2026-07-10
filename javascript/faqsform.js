// This Javascript is done by: Huang Ru Yi Lily
// This is the FAQs Form page javascript

// Wait for the DOM to be fully loaded before running the script
window.addEventListener('DOMContentLoaded', () => {

    // Add an event listener for form submission on the "Join Us" form
    document.getElementById("faqsform").addEventListener("submit", function (e) {
        e.preventDefault();

        // Retrieve form input values
        const name = document.getElementById("fullname").value; // Full Name
        const contact = document.getElementById("contact").value; // Email
        const message = document.getElementById("enquirymsg").value; // Enquiry Message

        // Get references to UI elements for feedback/loader
        const submitbtn = this.querySelector("button[type=submit]"); // Submit button
        const loadingOverlay = document.getElementById("loadingOverlay"); // Loading overlay
        const spinner = document.getElementById("spinner"); // Loading spinner
        const tickIcon = document.getElementById("tickIcon"); // Success tick icon
        const loadingText = document.getElementById("loadingText"); // Loading text
        const tickText = document.getElementById("tickText"); // Tick text

        // Disable submit button and change text to prevent multiple clicks
        submitbtn.disabled = true;
        submitbtn.textContent = "Submitting...";

        // Show loading overlay with spinner
        loadingOverlay.classList.add("show");
        spinner.style.display = "inline-block";
        tickIcon.style.display = "none";
        loadingText.style.display = "block";
        tickText.style.display = "none";

        // Send form data to Google Apps Script
        fetch("https://script.google.com/macros/s/AKfycbxAr5jGjcOL6kgzLkxhD_U8lVlFkHqrPYOrWuQ5Qx_yTyevwqDCr26J6ud9L0g3IGdT/exec", {
            method: "POST",
            body: JSON.stringify({
                formType: "enquiry", // Identify form type
                fullname: name,
                contact: contact,
                enquirymsg: message
            })
        })
            // Handle successful submission
            .then(() => {
                const alertBox = document.getElementById("formAlert");
                alertBox.innerHTML =
                    "Thank you for your enquiry!<br><br>You have submitted: <br><br>" +
                    `<strong>Full Name:</strong> ${name}<br>` +
                    `<strong>Email:</strong> ${contact}<br>` +
                    `<strong>Your Question(s):</strong> ${message}`;

                // Show success message
                alertBox.classList.remove("d-none");
                alertBox.scrollIntoView({ behavior: "smooth" });
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // Reset the form fields
                this.reset();

                // Switch from spinner to tick icon
                setTimeout(() => {
                    spinner.style.display = "none";
                    tickIcon.style.display = "inline-block";

                    // Switch from "loading" text to "success" text
                    loadingText.style.display = "none";
                    tickText.style.display = "block";

                    // Hide overlay and re-enable submit button after short delay
                    setTimeout(() => {
                        loadingOverlay.classList.remove("show");
                        submitbtn.disabled = false;
                        submitbtn.textContent = "Submit";
                    }, 1000);
                }, 100);
            })
            // Handle errors during fetch
            .catch((error) => {
                console.log("Error!", error);
                alert("Something went wrong. Please try again.");
                submitbtn.disabled = false;
                submitbtn.textContent = "Submit";
            });
    });
});