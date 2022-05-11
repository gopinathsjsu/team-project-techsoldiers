# Hotel Management System by Team - TechSoldiers

## Team members/Contributors:
- Raj Kinkhabwala
- Sakshi Jain
- Shivani Pandit
- Varun Alla

## Github Project Board
https://github.com/gopinathsjsu/team-project-techsoldiers/projects?type=beta

## Project Journal
https://github.com/gopinathsjsu/team-project-techsoldiers/blob/main/Techsoldiers_ProjectJournal_SakshiJain.docx

## Technology Stack
### Front End:
 React JS
### Back End:
- Nest JS
- Prisma 
- Express
- Node.js

### Database:
MySQL

### Unit Test Framework:
Jest


## XP Values
- Respect
- Simplicity
- Courage
- Feedback

## Design Pattern

- Strategy Pattern
- Dependency Injection
- Decorator Pattern
- State Pattern
- Observer Pattern

## Architecture Diagram

<img width="681" alt="image" src="https://user-images.githubusercontent.com/90986401/167753727-cb64afa8-7062-4ced-afab-387dabee2fda.png">

## DB Design

![image](https://github.com/gopinathsjsu/team-project-techsoldiers/blob/main/Artifacts/DB-Design.jpeg)

## Use Case Diagram

![image](https://user-images.githubusercontent.com/90986401/167755379-6976b2bd-017c-41c1-9d5b-7f2cc022e058.png)



## Scrum
- 2 Week Scrums

## Design Decision

For Backend:
NestJs - To Streamline development flow we have used a framework, it also helps developers from different backgrounds work in a simple ecosystem. NestJS had many advantageous features like authentication, configuration, and design pattern built into it. Which aided us to make enterprise level software.

For Authentication:
AWS Cognito - AWS Cognito is used to build robust authentication and authorization into applications, it aids development process from making any authentication decision which might loose application security. Everything is Verified and built using JWT infrastructure.

For Frontend: 
React and Redux : Using React to make the ui/ux development easier, making components of the application. Introduced redux into the application to manage global state of the application, redux helps applications like SPA to transfer and manage UI states from one component to another.

For UI Library:
Mantine UI: Used Mantine UI to make UI/UX development easier, help in managing the states of the UI and also help in development of robust UI. It also helps manage modal system and notifications system.

For Database/ORM:
Prisma ORM: Used Prisma for making helps app developers build faster and make fewer errors with an open source database toolkit for PostgreSQL, MySQL, SQL Server, SQLite, MongoDB and CockroachDB. It has a declarative way to define app's data models and their relations that's human-readable. And you don't have to painstakingly create it from scratch if you already have a database - prisma introspect takes care of that.

DB Design use cases to keep in mind:
1. Can users create a hotel from location? (Hotel master table)
2. Can user create a location? (Location Master table)
3. Can users add rooms to the hotel? - need to give count (hotel-room mapping)
4. Can you add Amenities? – amenities master (all hotels have access to all amenities)
5. Checking the booking capacity? - (mapping table for hotel and room) Master Capacity for any day
6. To see how many bookings exist for a hotel between selected dates – booking table adding room id
7. Booking id, room id and amenities – table for this
8. Room hotel mapping -> no. Of rooms and price

## Deliverables

### Deliverables For Sprint 1: (Feb 26 to March 9)
- Created server for backend and front in first sprint
- Architecture diagram - Varun and Shivani - Done
- DB design - Sakshi and Varun - Done
- Frontend baseline – Raj - Done
- Backend baseline – Varun – Moved To next sprint
- Wireframe for login, registration, landing and listing – Shivani - Done
- Unit Testing Framework – Sakshi – Done
- UI routing protection added – Raj - Done
- Lesson Learn:
- XP Values:
		 - 1. Communication: Concentrate more on communication.
		 - 2. Simplicity: Should Start with Simple component of the application.

### Deliverables For Sprint 2: March 10 to March 23
- hotel search component - UI (Varun) - Done
- Backend baseline – Varun – Done
- User Registration UI - Raj - Done
- Wireframe Hotel Booking and booking summary UI- Shivani - Done
- Backend service for listing locations – Sakshi - Done
- Backend for Default hotel listing Api - Sakshi - Done
- Backend for Hotel details Api - Varun - Done
- Hotel Listing UI- Shivani - Done
- Backend for Login and Registration - Raj - Done
- Lesson Learn:
- XP Values:
		1. FeedBack: Concentrate more on doing code reviews.

### Deliverables For Sprint 3: March 24 to April 6 
- Backend service for Booking component- Sakshi - Done
- Booking Ui – Shivani - Done 
- Booking summary frontend - Shivani - Done
- My Bookings Change/ Cancel Booking Wireframes - Shivani
- Bookings api - Sakshi - Done
- Ec2 autoscaling group - varun - Done
- pricing strategy schema and api – varun and Sakshi - Done
- Amenities listing api – Sakshi - Done
- Frontend Integration - Raj & Shivani - Done
- Code Refactoring - Raj - Done

### Deliverables For Sprint 4: April 7 to April 20
- Jenkins integration - Varun - Done
- Pricing Strategy - Varun - Done
- create a hotel, location, add rooms Api - Sakshi - Done
- backend services for creation (hotel, location, room) UI - Shivani - Done
- Booking Summary - Raj & Varun - Done
- My Bookings Change/ Cancel Booking Api  - Done
- My Bookings Change/ Cancel Booking Wireframes - Shivani - Done
- My Bookings Change/ Cancel Booking UI - Shivani - Done
- Frontend Integration - Raj & Shivani - Done
- Admin - Raj - Done
- Backend Route Protection - Raj - Done

### Deliverables For Sprint 5: April 21 to May 5 
- Booking Summary UI changes and integration - Varun/Shivani - Done
- MyBooking Cancelation and Updation integration - Shivani - Done
- Code Refactoration - Raj - Done
- Final Integration of API- Raj - Done
- Deployment of Code - Varun - Done
- Change / Fetch Role API - Sakshi - Done
- Update Rewards API - Sakshi - Done


