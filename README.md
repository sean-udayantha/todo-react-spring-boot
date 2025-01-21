# todo-react-spring-boot

 task Management  is a comprehensive web application designed for managing task . This app provides features for adding, editing, and deleting task.

## Tech Stack
- **Frontend**: React.js with Material-UI for a modern and responsive user interface.
- **Backend**: Spring Boot for a robust and scalable server-side implementation.
- **Database**: MySQL for efficient data storage and management.
- **Additional Tools**: 
  - redux toolkit.
  - React-Toastify for user notifications.

## Features
- **task Management**: Add, edit,  delete and change stutas task records with detailed information.
- **Real-Time Updates**: Interactive list and forms for immediate data updates.


## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sean-udayantha/todo-react-spring-boot
   cd todo-react-spring-boot

   ```
   
2. **steup frontend**:
   ```bash
   cd frontend
   npm install
   npm start
   ```
   
3. **steup backend**:
   ```bash
   cd path/to/backend
   ```
   
   Ensure the application.properties (or application.yml) file contains the correct database connection details
   ```bash
   spring.datasource.url=jdbc:mysql://localhost:3306/curdtest1?createDatabaseIfNotExist=true
   spring.datasource.username=your_username
   spring.datasource.password=Your_password
   ```
   
   Run the Spring Boot application
   ```bash
   ./mvnw spring-boot:run
   ```
   
   If using Gradle, run:
   ```bash
   ./gradlew bootRun
   ```
   
   
