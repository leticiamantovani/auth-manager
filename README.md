# auth-manager

Auth Manager is a secure and scalable authentication system built with TypeScript, Node.js, Express, MongoDB, JWT, and bcrypt. It provides a full authentication flow, including user registration, login, password hashing, and token-based authentication.

## Features

- User registration with hashed passwords
- Secure user authentication using JWT
- Login validation with error handling
- Scalable architecture with a service-based approach

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/leticiamantovani/auth-manager.git
   ```
2. Navigate to the project directory:
   ```sh
   cd auth-manager
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables by creating a `.env` file and adding the necessary configurations (e.g., JWT secret, database URL).

## Usage

### Start the Server
Run the application in development mode:
```sh
npm run dev
```

Run the application in production mode:
```sh
npm start
```

## API Endpoints

### User Authentication

#### Register User
**Endpoint:** `POST /register`

**Request Body:**
```json
{
  "username": "exampleUser",
  "password": "securePassword"
}
```

**Response:**
```json
{
  "message": "User created", 
  "token": "token"
}
```

#### Login
**Endpoint:** `POST /login`

**Request Body:**
```json
{
  "username": "exampleUser",
  "password": "securePassword"
}
```

**Response:**
```json
"Login successful"
```

## Technologies Used
- TypeScript
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- bcrypt

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests.

## License
This project is licensed under the MIT License.

