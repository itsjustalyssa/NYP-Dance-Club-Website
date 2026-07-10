// This Javascript is done by: Alyssa Kwok Xuan Hui
// This is the Events Form page javascript

// Wait for the DOM to be fully loaded before running the script
// Autoselect an event in the dropdown if the user clicked a "Register" button with an event parameter
window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search); // Get URL parameters
    const selectedEvent = params.get("event"); // Retrieve the event name from URL

    if (selectedEvent) {
        const eventDropdown = document.getElementById("event"); // Event dropdown element
        eventDropdown.value = selectedEvent; // Pre-select the event in the dropdown
    }
});

window.addEventListener('DOMContentLoaded', () => {
    // Add an event listener for form submission on the "Events" form
    document.getElementById("eventform").addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the form's default submit action (page reload)

        // Retrieve form input values
        const eventDropdown = document.getElementById("event"); // Event dropdown element
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

        // Get the selected event text (not just the value)
        const event = eventDropdown.options[eventDropdown.selectedIndex].text.trim();

        // Send form data to Google Apps Script endpoint
        fetch("https://script.google.com/macros/s/AKfycbxAr5jGjcOL6kgzLkxhD_U8lVlFkHqrPYOrWuQ5Qx_yTyevwqDCr26J6ud9L0g3IGdT/exec", {
            method: "POST",
            body: JSON.stringify({
                formType: "events", // Identify form type
                selectedevent: event,
                fullname: name,
                contact: contact
            })
        })
            // Handle successful submission
            .then(() => {
                const alertBox = document.getElementById("formAlert");
                alertBox.innerHTML =
                    "Thank you for registering for our event!<br><br>You have submitted: <br><br>" +
                    `<strong>Event:</strong> ${event}<br>` +
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
