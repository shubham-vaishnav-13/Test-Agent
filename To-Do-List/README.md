# To-Do List Backend API

A comprehensive RESTful API for a To-Do List application built with Node.js, Express, and MongoDB.

## Features

- ✅ User authentication (Register/Login) with JWT
- ✅ CRUD operations for todos
- ✅ Filter todos by status and priority
- ✅ Search todos by title/description
- ✅ Sort todos by various fields
- ✅ Toggle todo completion status
- ✅ Due date tracking
- ✅ Tags support
- ✅ Priority levels (low, medium, high)
- ✅ Status tracking (pending, in-progress, completed)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration

4. Start MongoDB

5. Run the application:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Todos

- `GET /api/todos` - Get all todos (Protected)
- `GET /api/todos/:id` - Get single todo (Protected)
- `POST /api/todos` - Create new todo (Protected)
- `PUT /api/todos/:id` - Update todo (Protected)
- `DELETE /api/todos/:id` - Delete todo (Protected)
- `PATCH /api/todos/:id/toggle` - Toggle completion (Protected)

### Query Parameters for GET /api/todos

- `status` - Filter by status (pending, in-progress, completed)
- `priority` - Filter by priority (low, medium, high)
- `search` - Search in title and description
- `sortBy` - Sort by field (createdAt, dueDate, priority, etc.)

## Usage Examples

### Register User
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Todo
```json
POST /api/todos
Headers: Authorization: Bearer <token>
{
  "title": "Complete project",
  "description": "Finish the backend API",
  "priority": "high",
  "status": "in-progress",
  "dueDate": "2024-12-31",
  "tags": ["work", "urgent"]
}
```

### Get Todos with Filters
```
GET /api/todos?status=pending&priority=high&sortBy=-createdAt
Headers: Authorization: Bearer <token>
```

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- dotenv
- cors

## License

ISC
