// Appointment Reminder System
let events = JSON.parse(localStorage.getItem("events")) || []; // Load events from local storage

// Get elements
let eventDateInput = document.getElementById("eventDate");
let eventTitleInput = document.getElementById("eventTitle");
let eventDescriptionInput = document.getElementById("eventDescription");
let reminderList = document.getElementById("reminderList");

let eventIdCounter = events.length ? Math.max(...events.map(e => e.id)) + 1 : 1; 

// Function to add an event
function addEvent() {
    let date = eventDateInput.value;
    let title = eventTitleInput.value;
    let description = eventDescriptionInput.value;

    if (date && title) {
        let eventId = eventIdCounter++;
        events.push({ id: eventId, date, title, description });

        // Save to local storage
        localStorage.setItem("events", JSON.stringify(events));

        showCalendar(currentMonth, currentYear);
        eventDateInput.value = "";
        eventTitleInput.value = "";
        eventDescriptionInput.value = "";
        displayReminders();
    }
}

// Function to delete an event
function deleteEvent(eventId) {
    events = events.filter(event => event.id !== eventId);
    localStorage.setItem("events", JSON.stringify(events));
    showCalendar(currentMonth, currentYear);
    displayReminders();
}

// Function to display reminders
function displayReminders() {
    reminderList.innerHTML = "";
    events.forEach(event => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${event.title}</strong> - ${event.description} on ${new Date(event.date).toLocaleDateString()}`;

        let deleteButton = document.createElement("button");
        deleteButton.className = "delete-event";
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteEvent(event.id);

        listItem.appendChild(deleteButton);
        reminderList.appendChild(listItem);
    });
}

// Date handling
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

// Populate years
function generateYearRange(start, end) {
    return [...Array(end - start + 1).keys()].map(i => `<option value="${start + i}">${start + i}</option>`).join("");
}
document.getElementById("year").innerHTML = generateYearRange(1970, 2050);

// Calendar rendering
let calendar = document.getElementById("calendar-body");
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

document.getElementById("thead-month").innerHTML = "<tr>" + ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => `<th>${d}</th>`).join("") + "</tr>";
let monthAndYear = document.getElementById("monthAndYear");

function next() {
    currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    let firstDay = new Date(year, month, 1).getDay();
    calendar.innerHTML = "";
    monthAndYear.innerHTML = `${months[month]} ${year}`;
    selectYear.value = year;
    selectMonth.value = month;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                row.appendChild(document.createElement("td"));
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                let cell = document.createElement("td");
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.className = "date-picker";
                cell.innerHTML = `<span>${date}</span>`;

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("selected");
                }

                if (hasEventOnDate(date, month, year)) {
                    cell.classList.add("event-marker");
                    cell.appendChild(createEventTooltip(date, month, year));
                }

                row.appendChild(cell);
                date++;
            }
        }
        calendar.appendChild(row);
    }

    displayReminders();
}

function createEventTooltip(date, month, year) {
    let tooltip = document.createElement("div");
    tooltip.className = "event-tooltip";
    getEventsOnDate(date, month, year).forEach(event => {
        let eventElement = document.createElement("p");
        eventElement.innerHTML = `<strong>${event.title}</strong> - ${event.description} on ${new Date(event.date).toLocaleDateString()}`;
        tooltip.appendChild(eventElement);
    });
    return tooltip;
}

function getEventsOnDate(date, month, year) {
    return events.filter(event => {
        let eventDate = new Date(event.date);
        return eventDate.getDate() === date && eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });
}

function hasEventOnDate(date, month, year) {
    return getEventsOnDate(date, month, year).length > 0;
}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

// Show calendar initially
showCalendar(currentMonth, currentYear);

//Symptom logger
// Initialize symptoms array
let symptoms = [];

// Function to update the current time
function updateCurrentTime() {
    const currentTimeElement = document.getElementById('currentTime');
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    currentTimeElement.textContent = `Time: ${hours}:${minutes}:${seconds}`;
}

// Function to save symptoms to JSON (localStorage)
function saveSymptomsToJSON() {
    localStorage.setItem("symptoms", JSON.stringify(symptoms));
}

// Function to load symptoms from JSON (localStorage)
function loadSymptomsFromJSON() {
    let symptomsJSON = localStorage.getItem("symptoms");
    if (symptomsJSON) {
        symptoms = JSON.parse(symptomsJSON);
        displaySymptoms();
    }
}