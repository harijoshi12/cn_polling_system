# Polling System API

## Description

This project is a robust RESTful API for a polling system, built with Node.js, Express, and MongoDB. It allows users to create polls, add options to polls, vote on options, and view poll results.

## Features

- Create, read, and delete polls
- Add options to existing polls
- Vote on poll options
- Delete options (with restrictions)
- View poll results including vote counts

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose ODM

## Prerequisites

- Node.js (v14 or later)
- MongoDB

## Installation

1. Clone the repository:

```bash
https://github.com/harijoshi12/cn_polling_system.git
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

```bash
PORT=3000
MONGODB_URI=your_mongodb_connection_string
API_PREFIX=/api/v1
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

4. Start the server:

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint                             | Description                 |
| ------ | ------------------------------------ | --------------------------- |
| POST   | /api/v1/questions/create             | Create a new question       |
| GET    | /api/v1/questions/:id                | Get a question with options |
| DELETE | /api/v1/questions/:id/delete         | Delete a question           |
| POST   | /api/v1/questions/:id/options/create | Add option to a question    |
| DELETE | /api/v1/options/:id/delete           | Delete an option            |
| POST   | /api/v1/options/:id/add_vote         | Add a vote to an option     |

## Project Structure

```bash
polling-system-api/
│
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── questionController.js
│   │   └── optionController.js
│   ├── models/
│   │   ├── Question.js
│   │   └── Option.js
│   ├── routes/
│   │   ├── questionRoutes.js
│   │   └── optionRoutes.js
│   ├── utils/
│   │   └── apiError.js
│   └── app.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```
