# Express API Demo

A simple Express.js API with login and items endpoints.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Login
- **URL**: `/api/login`
- **Method**: `POST`
- **Body**:
```json
{
    "email": "admin@gmail.com",
    "password": "password"
}
```
- **Response**:
```json
{
    "token": "random_string",
    "user": {
        "email": "admin@gmail.com"
    }
}
```
- **Note**: Sets an HTTP-only cookie for authentication

### Get Items
- **URL**: `/api/items`
- **Method**: `GET`
- **Headers**: Requires authentication cookie
- **Response**:
```json
[
    {
        "id": "1",
        "name": "Item 1",
        "description": "Description for Item 1"
    },
    ...
]
```

### Logout
- **URL**: `/api/logout`
- **Method**: `POST`
- **Response**:
```json
{
    "message": "Logged out successfully"
}
```

## Testing the API

You can test the API using tools like Postman or curl:

1. Login:
```bash
curl -X POST http://localhost:3000/api/login \
-H "Content-Type: application/json" \
-d '{"email":"admin@gmail.com","password":"password"}' \
-c cookies.txt
```

2. Get Items (using the cookie from login):
```bash
curl http://localhost:3000/api/items \
-b cookies.txt
```

3. Logout:
```bash
curl -X POST http://localhost:3000/api/logout \
-b cookies.txt
```

## Authentication

The API uses cookie-based authentication. After successful login, an HTTP-only cookie is set that must be included in subsequent requests to protected endpoints. The cookie is automatically handled by browsers, but when testing with curl, you'll need to save and send the cookie manually. 