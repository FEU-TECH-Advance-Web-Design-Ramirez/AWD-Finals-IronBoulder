//Medication Reminder
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
		
			// Create reminder item
			const reminderItem = document.createElement('li');
			reminderItem.classList.add('reminder-item');
		
			// Display the reminder information
			reminderItem.innerHTML = `
				<div class="reminder-text">${medicineName} - ${reminderTime}</div>
				<button class="delete-btn" onclick="deleteReminder(this)">Delete</button>
			`;
		
			// Add the reminder to the list
			const remindersList = document.getElementById('reminders');
			remindersList.appendChild(reminderItem);
		
			// Set up the alarm for the reminder
			setupAlarm(reminderTime);
		
			// Clear input fields
			document.getElementById('medicineName').value = '';
			document.getElementById('reminderTime').value = '';
		}
		
		// Function to delete a reminder
		function deleteReminder(buttonElement) {
			const reminderItem = buttonElement.parentElement;
			reminderItem.remove();
		}
		
		// Function to set up the alarm for the reminder
		function setupAlarm(reminderTime) {
			const currentTime = new Date();
			const [hours, minutes] = reminderTime.split(':');
			const reminderDate = new Date();
			reminderDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
		
			// Calculate the time difference in milliseconds
			const timeDifference = reminderDate - currentTime;
		
			// Set up the alarm
			if (timeDifference > 0) {
				setTimeout(() => {
					alert('⏰ Time to take your medicine!');
				}, timeDifference);
			}
		}
		
		// Update the current time every second
		setInterval(updateCurrentTime, 1000);
		
		// Update the current time immediately on page load
		updateCurrentTime();