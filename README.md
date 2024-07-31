# My API

My API is a RESTful service that allows you to manage users and hospital entities. It provides endpoints for authentication, user management, and hospital management.

## Getting Started

To get started with My API, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/galihls_/api_rumahsakit.git
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

The following endpoints are available in My API:

### User Endpoints

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login a user and receive a JWT token.

### Hospital Endpoints

- `GET /api/hospitals`: Retrieve a list of all hospitals (requires authentication).
- `POST /api/hospitals`: Create a new hospital (requires authentication).
- `PUT /api/hospitals/:id`: Update an existing hospital by ID (requires authentication).
- `DELETE /api/hospitals/:id`: Delete a hospital by ID (requires authentication).

For detailed information on each endpoint, refer to the [API documentation](/docs/api.md).

## Authentication

To access certain endpoints, authentication is required. Please refer to the [authentication documentation](/docs/authentication.md) for more information on how to authenticate your requests.

## Error Handling

In case of an error, My API will return a JSON response with the following structure:

```json
{
  "message": "Error message"
}
```
