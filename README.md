# Users CRUD API

This is a simple CRUD API built with Node.js and TypeScript. It allows you to perform basic operations such as creating,
retrieving, updating, and deleting users.

## Features

- Create a new user
- Retrieve all users or a specific user by ID
- Update user by ID
- Delete user by ID
- Validation for user ID format

## Technologies

- Node.js
- TypeScript
- dotenv
- nodemon
- Webpack
- ESLint
- Prettier
- Vitest (for testing)
- UUID (for unique user IDs)

## Installation

To get started with this API, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/LinderJK/crid-api-task.git
   ```
2. Checkout on development branch:
    ```bash
    git checkout development
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1.To run the API in development mode, use:

```bash
npm run start:dev
```

To build and start the project for production, run:

```bash
npm run start:prod
```

You can also run linting and formatting checks:

```bash
npm run lint
npm run format
```

## Testing

For running tests, use:

```
bash
npm run test
```

If you have error then run tests please check you `hosts` file.
To be like `127.0.0.1	localhost`.

## API Endpoints

PORT = 3070 for development

PORT = 8080 for production

You port 8080 can be used for different program. You can use any port.

Base URL
`http://localhost:<PORT>/api/users`

1. `GET /`
   Returns a welcome message and API information.

2. `GET /api/users`
   Retrieves all users.

3. `GET /api/users/:id`
   Retrieves a specific user by ID.

4. `POST /api/users`
   Creates a new user. The request body should contain JSON data with user details.

5. `PUT /api/users/:id`
   Updates an existing user. Requires the user ID in the URL and the updated data in the request body.

6. `DELETE /api/users/:id`
   Deletes a user by ID.

### Example Request

To create a user, send a POST request to /api/users with a JSON body like this:

```json
{
  "name": "John Doe",
  "age": 30,
  "hobbies": [
    "reading",
    "traveling"
  ]
}
```

### Example Response

Successful responses will return JSON data. For example, when retrieving all users, the response might look like this:

```json
[
  {
  "id": "some-unique-id",
  "name": "John Doe",
  "age": 30,
  "hobbies": ["reading", "traveling"]
  }
]


