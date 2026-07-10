// This JavaScript is done by: Alyssa Kwok Xuan Hui
// This is the Homepage JavaScript

// Get the current date and time
const now = new Date();

// Set the target date to the first day of the next month at midnight
const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0);
const targetDate = nextMonth.getTime();

// Get the countdown display element
const countdownElement = document.getElementById("countdown");

// Function to update the countdown timer
const updateCountdown = () => {
  const currentTime = new Date().getTime();
  const distance = targetDate - currentTime;

  // If the target date has passed, display a message and stop the timer
  if (distance < 0) {
    countdownElement.textContent = "🎉 Auditions are open!";
    clearInterval(timer);
    return;
  }

  // Calculate remaining days, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  // Update the countdown element with the time remaining
  countdownElement.textContent =
    `${days}d ${hours}h ${minutes}m ${seconds}s until auditions reopen`;
};

// Update the countdown every second
const timer = setInterval(updateCountdown, 1000);
updateCountdown();

