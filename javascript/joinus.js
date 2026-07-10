// This Javascript is done by: Huang Ru Yi Lily
// This is the Join Us page javascript

// Wait for the DOM to be fully loaded before running the script
window.addEventListener('DOMContentLoaded', () => {

    // Add an event listener for form submission on the "Join Us" form
    document.getElementById("joinUsForm").addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the form's default submit action (page reload)

        // Retrieve form input values
        const slot = document.querySelector('input[name="audi"]:checked')?.value || "Not selected"; // Selected audition slot
        const name = document.getElementById("fullname").value; // Full name
        const adminnumber = document.getElementById("adminno").value; // Admin number
        const contact = document.getElementById("contact").value; // Email or contact
        const year = document.getElementById("year").value; // Year of study
        const school = document.getElementById("school").value; // School within NYP
        const studentClass = document.getElementById("class").value; // Class name
        const level = document.getElementById("level").value; // Dance experience level
        const reason = document.getElementById("reason").value; // Reason for joining

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

        // Send form data to Google Apps Script
        fetch("https://script.google.com/macros/s/AKfycbxAr5jGjcOL6kgzLkxhD_U8lVlFkHqrPYOrWuQ5Qx_yTyevwqDCr26J6ud9L0g3IGdT/exec", {
            method: "POST",
            body: JSON.stringify({
                formType: "club", // Identify form type
                audition: slot,
                fullname: name,
                adminnum: adminnumber,
                contact: contact,
                year: year,
                school: school,
                studentClass: studentClass,
                danceExpLvl: level,
                whyjoin: reason
            })
        })
            // Handle successful submission
            .then(() => {
                const alertBox = document.getElementById("formAlert");
                alertBox.innerHTML =
                    "Thank you for registering for the audition!<br><br>You have submitted: <br><br>" +
                    `<strong>Audition Slot:</strong> ${slot}<br>` +
                    `<strong>Full Name:</strong> ${name}<br>` +
                    `<strong>Admin Number:</strong> ${adminnumber}<br>` +
                    `<strong>Email:</strong> ${contact}<br>` +
                    `<strong>Year:</strong> ${year}<br>` +
                    `<strong>School:</strong> ${school}<br>` +
                    `<strong>Class:</strong> ${studentClass}<br>` +
                    `<strong>Dance Experience Level:</strong> ${level}<br>` +
                    `<strong>Reason for Joining:</strong> ${reason}`;

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
