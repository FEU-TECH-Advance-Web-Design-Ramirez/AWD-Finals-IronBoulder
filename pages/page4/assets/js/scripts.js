// Medication Reminder with JSON Storage

// Function to update the current time
function updateCurrentTime() {
    const currentTimeElement = document.getElementById('currentTime');
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    currentTimeElement.textContent = `Time: ${hours}:${minutes}:${seconds}`;
}

// Function to add a medicine reminder
function addReminder() {
    const medicineName = document.getElementById('medicineName').value.trim();
    const reminderTime = document.getElementById('reminderTime').value.trim();

    if (!medicineName || !reminderTime) {
        alert("Please enter both medicine name and time.");
        return;
    }

    const reminder = { medicineName, reminderTime };
    let reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    reminders.push(reminder);
    localStorage.setItem('reminders', JSON.stringify(reminders));

    displayReminders();
    setupAlarm(reminderTime);

    document.getElementById('medicineName').value = '';
    document.getElementById('reminderTime').value = '';
}

// Function to display reminders
function displayReminders() {
    const remindersList = document.getElementById('reminders');
    remindersList.innerHTML = '';
    let reminders = JSON.parse(localStorage.getItem('reminders')) || [];

    reminders.forEach((reminder, index) => {
        const reminderItem = document.createElement('li');
        reminderItem.classList.add('reminder-item');
        reminderItem.innerHTML = `
            <div class="reminder-text">${reminder.medicineName} - ${reminder.reminderTime}</div>
            <button class="delete-btn" onclick="deleteReminder(${index})">Delete</button>
        `;
        remindersList.appendChild(reminderItem);
    });
}

// Function to delete a reminder
function deleteReminder(index) {
    let reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    reminders.splice(index, 1);
    localStorage.setItem('reminders', JSON.stringify(reminders));
    displayReminders();
}

// Function to set up the alarm for the reminder
function setupAlarm(reminderTime) {
    const currentTime = new Date();
    const [hours, minutes] = reminderTime.split(':');
    const reminderDate = new Date();
    reminderDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    const timeDifference = reminderDate - currentTime;

    if (timeDifference > 0) {
        setTimeout(() => {
            alert('⏰ Time to take your medicine!');
        }, timeDifference);
    }
}

// Load reminders on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCurrentTime();
    displayReminders();
});

// Update the current time every second
setInterval(updateCurrentTime, 1000);