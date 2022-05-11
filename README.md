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

