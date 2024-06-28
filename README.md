# forSure Hired (Backend)

# Ironhack Web Dev bootcamp Final Project

---

## API Documentation

This is a REST Api created for our final project in the Ironhack Web Dev bootcamp.
Below you will find the available endpoints of the backend API made with express, mongodb and jwt for authentication. All endpoints that require authentication are protected by the isAuth middleware and need to check the JWT token before realizing the requested action.

# User

| HTTP Verb | URL             | Request Body       | Action                                 |
| --------- | --------------- | ------------------ | -------------------------------------- |
| POST      | `/user/signup`  | JSON               | Sign Up, creating a new User           |
| POST      | `/user/login`   | JSON               | Log in the User and create a JWT token |
| GET       | `/user/verify`  | JSON, Bearer Token | Verify for a valid JWT token           |
| PUT       | `/user/:userId` | JSON, Bearer Token | Update the specified User info         |

### All routes below are protected and requires a logged in user.

# Jobs

### Only the owner of the job is allowed to see and modify it, all routes have a middleware that checks if isOwner

| HTTP Verb | URL            | Request Body       | Action                                                                                                     |
| --------- | -------------- | ------------------ | ---------------------------------------------------------------------------------------------------------- |
| POST      | `/jobs/`       | JSON, Bearer Token | Create a Job linked with the logged in User                                                                |
| GET       | `/jobs/`       | JSON, Bearer Token | Return all Jobs linked with the logged in User                                                             |
| GET       | `/jobs/:jobId` | JSON, Bearer Token | Return a single Job by ID                                                                                  |
| PUT       | `/jobs/:jobId` | JSON, Bearer Token | Update the specified Job                                                                                   |
| DELETE    | `/jobs/:jobId` | JSON, Bearer Token | Delete the specified Job, also remove the job from the user jobs list and the quiz associated with the job |

# Quizzes

| HTTP Verb | URL             | Request Body       | Action                                                             |
| --------- | --------------- | ------------------ | ------------------------------------------------------------------ |
| POST      | `/quiz/:jobId`  | JSON, Bearer Token | Create a Quiz linked with a Job                                    |
| POST      | `/quiz/`        | JSON, Bearer Token | Create a Quiz based on a custom description                        |
| GET       | `/quiz/`        | JSON, Bearer Token | Return all Quizzes                                                 |
| GET       | `/quiz/:jobId`  | JSON, Bearer Token | Return the Quiz linked with a Job                                  |
| DELETE    | `/quiz/:quizId` | JSON, Bearer Token | Delete the specified Quiz and remove the relationship with the job |

### For Correct functioning:

- After forking/cloning the repo need to run "npm install" on terminal
- You must create a .env file in the server root with the following global variables:

  - MONGODB_URI="your-DB-connection-string"
  - TOKEN_SIGN_SECRET="your-secret-phrase-for-jwt-encrypt/decrypt"(could be anything you want, Example: banana 😊)
  - REACT_APP_URL="your frontend app url"
- Enjoy the project! 🥰
