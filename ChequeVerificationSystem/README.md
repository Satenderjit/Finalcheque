# Cheque Verification System

This project implements a cheque verification system. Users can verify cheque status by providing the name and cheque number.

## Features

- Backend API for cheque verification
- MongoDB Atlas database integration
- React frontend with responsive design
- Real-time cheque status checking

## Project Structure

```
ChequeVerificationSystem/
├── backend/
│   ├── controllers/
│   │   └── chequeController.js
│   ├── models/
│   │   └── Cheque.js
│   ├── routes/
│   │   └── chequeRoutes.js
│   ├── services/
│   │   └── chequeService.js
│   ├── utils/
│   │   └── db.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── mongodb-setup.md
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── ChequeVerification.js
    │   │   └── ChequeVerification.module.css
    │   ├── pages/
    │   ├── styles/
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd ChequeVerificationSystem/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up MongoDB Atlas:
   - Follow the instructions in [mongodb-setup.md](./backend/mongodb-setup.md)
   - Create a `.env` file in the backend directory with your MongoDB URI:
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/cheque_verification_db?retryWrites=true&w=majority
     PORT=5000
     ```

4. Start the backend server:
   ```bash
   npm run dev  # for development with nodemon
   # or
   npm start    # for production
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ChequeVerificationSystem/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

## API Endpoints

- `POST /api/cheques/verify` - Verify a cheque status
  - Request body: `{ "name": "string", "chequeNumber": "string" }`
  - Response: `{ "success": boolean, "status": "Available|Used|Not Found", "message": "string", "cheque": {...} }`


## Database Schema

The application uses a MongoDB collection named "cheques" with the following schema:

- `_id`: ObjectId (auto-generated)
- `name`: String (required)
- `chequeNumber`: String (required, unique)
- `status`: String (enum: "Available", "Used", "Not Found", default: "Available")
- `createdAt`: Date (default: current timestamp)
- `updatedAt`: Date (default: current timestamp)

## Testing the System

1. Make sure both backend and frontend servers are running
2. Open the frontend in your browser (usually at http://localhost:3000)
3. Enter a name and cheque number
4. The system will check the database and return the status

## Sample Data

The backend automatically adds sample cheques when it starts up if the database is empty:

- John Doe, CK001 - Available
- Jane Smith, CK002 - Used
- Robert Johnson, CK003 - Available
- Emily Davis, CK004 - Not Found

## Technologies Used

- Backend: Node.js, Express.js, Mongoose
- Database: MongoDB Atlas
- Frontend: React, CSS Modules
- HTTP Client: Axios

## Security Considerations

- Store API keys securely in environment variables
- Validate all inputs on the server side
- Implement rate limiting for API endpoints in production
- Use HTTPS in production deployments
- Sanitize user inputs to prevent injection attacks