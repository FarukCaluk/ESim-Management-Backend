<<<<<<< HEAD
=======

>>>>>>> a13d17721485e30d6592177318c444efa6227042
# 📱 ESim Management Backend

Backend application for managing users and SIM cards.

## 🚀 Technologies

- [NestJS](https://nestjs.com/) – backend framework
- [MongoDB](https://www.mongodb.com/) – database
- [Mongoose](https://mongoosejs.com/) – ODM for MongoDB
- [Swagger](https://swagger.io/) – API documentation and testing
- [Postman](https://www.postman.com/) – API testing during development

## 📖 API Documentation

- Swagger documentation is available at:

  ```
  http://localhost:3000/api
  ```

## 🔧 Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/FarukCaluk/ESim-Management-Backend.git
   cd ESim-Management-Backend/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your `.env` file (example):

   ```env
   MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/sim-man
   PORT=3000
   ```

4. Run the application:

   ```bash
   npm run start:dev
   ```

## 📌 Available Endpoints

### 👤 Users

- `POST /users` – create a new user
- `GET /users` – get all users
- `GET /users/:id` – get user by ID
- `PUT /users/:id` – update user

### 💳 SimCards

- `POST /simcards` – create a new SIM card
- `GET /simcards` – get all SIM cards
- `GET /simcards/:id` – get SIM card by ID
- `PUT /simcards/:id` – update SIM card

## Postman Collection

A Postman collection is provided in the `assets/` folder for easy testing of the API endpoints.

- File: `assets/postman_collection.json`
- Import it into Postman to quickly test all endpoints.

=======

# 📱 ESim Management Backend

Backend application for managing users and SIM cards.

## 🚀 Technologies

- [NestJS](https://nestjs.com/) – backend framework
- [MongoDB](https://www.mongodb.com/) – database
- [Mongoose](https://mongoosejs.com/) – ODM for MongoDB
- [Swagger](https://swagger.io/) – API documentation and testing
- [Postman](https://www.postman.com/) – API testing during development

## 📖 API Documentation

- Swagger documentation is available at:

  ```
  http://localhost:3000/api
  ```

## 🔧 Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/FarukCaluk/ESim-Management-Backend.git
   cd ESim-Management-Backend/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your `.env` file (example):

   ```env
   MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/sim-man
   PORT=3000
   ```

4. Run the application:

   ```bash
   npm run start:dev
   ```

## 📌 Available Endpoints

### 👤 Users

- `POST /users` – create a new user
- `GET /users` – get all users
- `GET /users/:id` – get user by ID
- `PUT /users/:id` – update user

### 💳 SimCards

- `POST /simcards` – create a new SIM card
- `GET /simcards` – get all SIM cards
- `GET /simcards/:id` – get SIM card by ID
- `PUT /simcards/:id` – update SIM card

## Postman Collection

A Postman collection is provided in the `assets/` folder for easy testing of the API endpoints.

- File: `assets/postman_collection.json`
- Import it into Postman to quickly test all endpoints.
<<<<<<< HEAD
=======

>>>>>>> a13d17721485e30d6592177318c444efa6227042
