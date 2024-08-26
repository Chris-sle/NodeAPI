# User API Documentation

## Base URL
- `http://localhost:3000`

## Endpoints

### 1. Get All Users
- **Endpoint**: `/users`
- **Method**: `GET`
- **Description**: Retrieves a list of all users in the database.
- **Response**: 
  - `200 OK`: Returns an array of user objects.
  ```json
    [
        {
            "ID": 1,
            "EMAIL": "admin@domain.com",
            "NAME": "admin",
            "AGE": 100
        },
        {
            "ID": 2,
            "EMAIL": "example@example.com",
            "NAME": "John Doe",
            "AGE": 30
        }
    ]
- **Error**: 500 Internal Server Error: Server error encountered.

### 2. Get User by ID
- **Endpoint**: `/users/{id}`
- **Method**: `GET`
- **Description**: Retrieves a single user by their ID.
- **URLparameters**: id: integer (Path parameter required, e.g., /users/1)
- **Response**: 
  - `200 OK`: Returns the user object.
  - `404 Not Found`: User does not exist.
  ```json
    {
        "ID": 1,
        "EMAIL": "admin@domain.com",
        "NAME": "admin",
        "AGE": 100
    }

### 3. Create a New User
- **Endpoint**: `/users`
- **Method**: `POST`
- **Description**: Creates a new user in the database.
- **RequestBody**:
  ```json
    {
        "id": 3,
        "email": "newuser@example.com",
        "name": "New User",
        "age": 28
    }
- **Response**: 
  - `201 Created`: User successfully created.
  - `400 Bad Request`: Invalid input data provided.
- **Errors**:
    - `500 Internal Server Error`: Server error encountered.

### 4. Update a User
- **Endpoint**: `/users/{id}`
- **Method**: `PUT`
- **Description**: Updates an existing user's information.
- **RequestBody**:
- **URLparameters**: id: integer (Path parameter required, e.g., /users/1)
- **RequestBody**:
  ```json
    {
        "email": "updated@example.com",
        "name": "Updated User",
        "age": 29
    }
- **Response**: 
  - `200 Ok`: User successfully updated.
  - `404 Not Found`: User does not exist.

### 5. Delete a User
- **Endpoint**: `/users/{id}`
- **Method**: `DELETE`
- **Description**: Deletes a user from the database.
- **URLparameters**: id: integer (Path parameter required, e.g., /users/1)
- **Response**: 
  - `200 Ok`: User successfully deleted.
  - `404 Not Found`: User does not exist.

### General Error Codes
  - `500 Internal Server Error`: A generic error message, given when an unexpected condition was encountered.
 