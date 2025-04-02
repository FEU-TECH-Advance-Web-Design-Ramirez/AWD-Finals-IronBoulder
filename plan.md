Chronic Illness Health Tracker App - Project Plan

-PERSONA-

Name: MediSync

Overview: MediSync is a health tracking platform designed to help users manage symptoms, medications, and appointments in one place. The website will feature a clean, professional, and user-friendly design with a blue color scheme, reflecting a sense of trust and calmness.

Background: A 68-year-old retiree who values staying connected, managing health appointments, and accessing community resources.



-UX FLOW-

Home Page:

Displays the mission and an overview of the application.

Provides navigation to different sections.


Sign-Up / Sign-In:

Allows users to register and log in.

Users enter name, email, and password.


Dashboard (After Login):

Provides access to different health management tools.

Symptom Logger

Users log symptoms, select severity, and add notes.

Displays logged symptoms in a list format.


Appointment Tracker:

Users can schedule doctor appointments.

Provides a calendar view for upcoming appointments.


Medication Reminder:

Users add medication names and set reminders.

Displays a list of active medication reminders.


About Us Page:

Contains team information and project details.


Footer:

Displays social media links and contact information.


-LAYOUT & NAVIGATION-

Header:

Logo (left)

Navigation menu (right)

Home

About Us

Care Services (Dropdown with Symptom Logger, Appointment Tracker, Medication Reminder)

Sign-Up

Footer:

Company tagline

Social media links

Contact information

Main Sections:

About Us

Care Services

User Management (Sign-up, Login)

Health Tracking Features (Symptom Logger, Appointments, Medication Reminders)


-COLOR SCHEME & VISUAL STYLE-

Primary Colors:

Blue (#3A7CA5) 

 Malibu (#67BAE6)

 #359bd1 color code

 Accent Colors:
  #9EC3EA color code

White (#FFFFFF)

Grey (#EAEAEA)

Typography:

Sans-serif font for readability and clarity.

Design Approach:

Minimalist design with intuitive UI.

Clear CTAs (Call-to-Actions) for ease of use.

-ENTITY RELATIONAL DATABASE (ERD)-

User (UserID, Name, Email, Password, Contact Info):

Has many Appointments

Has many Medication Reminders

Has many Symptom Logs


Appointment (AppointmentID, UserID, Date, Time, Doctor, Location):

Belongs to a User


Medication Reminder (ReminderID, UserID, Medicine Name, Time, Frequency):

Belongs to a User


Symptom Log (LogID, UserID, Date, Symptom Description, Severity):

Belongs to a User




-DATA FLOW-

User Registration & Authentication:

User signs up or logs in.

User data is validated and stored in the database.

Upon login, user details are retrieved for session management.

2. Appointment Scheduling:

User selects a date and time for an appointment.

The system stores the appointment details in the database.

Appointments are retrieved and displayed on the calendar.

3. Medication Reminder:

User sets a reminder for medication.

The system saves the reminder and triggers notifications when the time comes.

4. Symptom Logging:

User inputs symptoms.

Data is saved and retrieved for tracking trends over time.

5. Data Retrieval & Display:

Dashboard fetches and displays relevant user data.

Lists and calendars dynamically update based on stored information.

