// This JavaScript is done by: Alyssa Kwok Xuan Hui
// This is the Events Feedback page JavaScript

// Wait for the DOM to be fully loaded before running the script
window.addEventListener('DOMContentLoaded', () => {

    // Add an event listener for form submission on the "Events Feedback" form
    document.getElementById("eventform").addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the form's default submit action (page reload)

        // Retrieve form input values
        const eventattended = document.getElementById("eventattended").value; // Event attended
        const ratingDropdown = document.getElementById("rating"); // Rating dropdown
        const feedbackInput = document.getElementById("feedback"); // Feedback input
        const feedback = feedbackInput.value; // General feedback
        const suggestionInput = document.getElementById("suggestion"); // Suggestion input
        const suggestion = suggestionInput.value; // Suggestions
        const name = document.getElementById("fullname").value; // Full name
        const contact = document.getElementById("contact").value; // Email or contact

        // Get references to UI elements for feedback/loader
        const submitbtn = this.querySelector("button[type=submit]"); // Submit button
        const loadingOverlay = document.getElementById("loadingOverlay"); // Overlay element
        const spinner = document.getElementById("spinner"); // Loading spinner
        const tickIcon = document.getElementById("tickIcon"); // Success tick icon
        const loadingText = document.getElementById("loadingText"); // Loading message text
        const tickText = document.getElementById("tickText"); // Success message text

        // Disable submit button and change text to prevent multiple clicks
        submitbtn.disabled = true;
        submitbtn.textContent = "Submitting...";

        // Show loading overlay with spinner
        loadingOverlay.classList.add("show");
        spinner.style.display = "inline-block";
        tickIcon.style.display = "none";
        loadingText.style.display = "block";
        tickText.style.display = "none";

        // Get selected rating text
        const rating = ratingDropdown.options[ratingDropdown.selectedIndex].text.trim();

        // Send form data to Google Apps Script
        fetch("https://script.google.com/macros/s/AKfycbxAr5jGjcOL6kgzLkxhD_U8lVlFkHqrPYOrWuQ5Qx_yTyevwqDCr26J6ud9L0g3IGdT/exec", {
            method: "POST",
            body: JSON.stringify({
                formType: "feedback", // Identify form type
                eventattended: eventattended,
                rating: rating,
                feedback: feedback,
                suggestion: suggestion,
                fullname: name,
                contact: contact
            })
        })
            // Handle successful submission
            .then(() => {
                const alertBox = document.getElementById("formAlert");
                alertBox.innerHTML =
                    "Thank you for your feedback! <br><br>You have submitted: <br><br>" +
                    `<strong>Attended Event:</strong> ${eventattended}<br>` +
                    `<strong>Overall Rating:</strong> ${rating}<br>` +
                    `<strong>General Feedback:</strong> ${feedback}<br>` +
                    `<strong>Suggestions:</strong> ${suggestion}<br>` +
                    `<strong>Full Name:</strong> ${name}<br>` +
                    `<strong>Email:</strong> ${contact}`;

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
                console.error("Error!", error);
                alert("Something went wrong. Please try again.");
                submitbtn.disabled = false;
                submitbtn.textContent = "Submit";
            });
    });
});
