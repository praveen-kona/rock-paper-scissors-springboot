# Rock Paper Scissors Game

A full-stack Rock Paper Scissors game developed using Java, Spring Boot, MySQL, HTML, CSS, and JavaScript.

## Live Application

Play the game online:

https://rock-paper-scissors-springboot-production.up.railway.app/

## GitHub Repository

Source Code:

https://github.com/praveen-kona/rock-paper-scissors-springboot

## Features

* Play Rock Paper Scissors against the computer
* Random computer choice generation
* Automatic winner calculation
* Current game score tracking
* Draw tracking
* Current game history
* Previous game history
* Search previous games
* Filter games by result
* Reset current game
* MySQL database persistence
* REST APIs
* Swagger API documentation
* Responsive web interface

## Technologies Used

### Backend

* Java 25
* Spring Boot
* Spring Web
* Spring Data JPA
* Hibernate
* Maven

### Database

* MySQL

### Frontend

* HTML
* CSS
* JavaScript

### API Documentation

* Swagger / OpenAPI

### Deployment

* Railway

## Project Structure

```text
src/main/java
└── com.example.rockpaperscissor
    ├── controller
    │   └── GameController.java
    ├── entity
    │   └── Game.java
    ├── repository
    │   └── GameRepository.java
    ├── service
    │   └── GameService.java
    └── RockpaperscissorApplication.java

src/main/resources
├── static
│   ├── index.html
│   ├── previous.html
│   ├── script.js
│   └── style.css
└── application.properties
```

## REST API Endpoints

### Play Game

```text
POST /api/game/play
```

Request body:

```text
"ROCK"
```

or

```text
"PAPER"
```

or

```text
"SCISSORS"
```

### Get Score

```text
GET /api/game/score
```

### Get Current Game History

```text
GET /api/game/history
```

### Get Previous Games

```text
GET /api/game/previous
```

### Reset Game

```text
DELETE /api/game/reset
```

## How to Run

1. Make sure MySQL is installed and running.
2. Configure the database in `application.properties`.
3. Open the project in Eclipse or another Java IDE.
4. Update the Maven project.
5. Run `RockpaperscissorApplication.java`.
6. Open the browser.

Application URL:

```text
http://localhost:8080
```

## Swagger API Documentation

Swagger UI:

```text
http://localhost:8080/swagger-ui/index.html
```

Live Swagger UI:

```text
https://rock-paper-scissors-springboot-production.up.railway.app/swagger-ui/index.html
```

## Deployment

The application is deployed using Railway.

Live Application:

```text
https://rock-paper-scissors-springboot-production.up.railway.app/
```

## Game Flow

1. User selects Rock, Paper, or Scissors.
2. The request is sent to the Spring Boot REST API.
3. The computer randomly selects a move.
4. The backend determines the winner.
5. The result is stored in MySQL.
6. The score is updated.
7. The result is displayed on the frontend.

## Future Enhancements

* User login and registration
* Player profiles
* Online multiplayer
* Leaderboard
* Game statistics dashboard
* Deployment to cloud

## Author

**Praveen Kona**

Java Full Stack Developer


## Copyright

Copyright © 2026 Praveen Kona. All Rights Reserved.

This project and its source code may not be copied, modified, distributed, or used without prior written permission.

