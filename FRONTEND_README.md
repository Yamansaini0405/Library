# Library Management System - Frontend

A modern React frontend for a library management system built with Vite, Tailwind CSS, and React Router.

## Features

- **Authentication**: Login system with email and password
- **Student Management**: Full CRUD operations for student records
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **State Management**: Context API for authentication state
- **Protected Routes**: Route protection based on authentication status

## Project Structure

```
src/
├── components/           # Reusable components
│   ├── ProtectedRoute.jsx    # Route protection wrapper
│   ├── StudentCard.jsx       # Student display card
│   ├── StudentForm.jsx       # Student form for add/edit
├── context/             # React context for state management
│   └── AuthContext.jsx       # Authentication context
├── pages/               # Page components
│   ├── LoginPage.jsx         # Login page
│   ├── StudentPage.jsx       # Student list page
│   └── StudentFormPage.jsx   # Student form page
├── services/            # API service functions
│   └── api.js                # API calls and HTTP requests
├── App.jsx              # Main app with routing
├── main.jsx             # Entry point
└── index.css            # Tailwind CSS import
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd library_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Configuration

### API Base URL

Update the `API_BASE_URL` in `src/services/api.js` to match your backend server:

```javascript
const API_BASE_URL = 'http://localhost:8080'; // Change to your backend URL
```

## Running the Application

### Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

### Login

1. Navigate to the login page (automatically redirected if not authenticated)
2. Enter your email and password
3. Click "Login"
4. Upon successful login, you'll be redirected to the student management page

### Student Management

**View Students**
- All registered students are displayed as cards
- Shows name, email, phone, seat number, total fee, and payment status

**Add Student**
- Click the "Add Student" button
- Fill in all required fields
- Click "Save Student"

**Edit Student**
- Click the "Edit" button on any student card
- Modify the fields
- Click "Save Student"

**Delete Student**
- Click the "Delete" button on any student card
- Confirm the deletion

**Logout**
- Click the "Logout" button in the header
- You'll be redirected to the login page

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Students
- `GET /api/students` - Get all students
- `GET /api/students/{id}` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

## Fee Status Options

- `PAID` - Student fees are paid
- `UNPAID` - Student fees are unpaid

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## Form Validation

The application includes comprehensive form validation:

- **Email**: Format validation
- **Phone**: Required field
- **Seat Number**: Numeric validation
- **Total Fee**: Numeric validation
- **Name**: Required field

## Error Handling

- API errors are displayed in user-friendly alert messages
- Form validation errors are shown below each field
- Authentication errors are displayed on the login page

## Authentication Flow

1. User logs in via the login form
2. API returns success/failure response
3. On success, auth token is stored in localStorage
4. User is redirected to the student page
5. Auth context tracks user state
6. Protected routes check authentication before rendering
7. On logout, token is removed and user is redirected to login

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The auth token is stored in localStorage for persistence across page refreshes
- All API requests include the auth token in headers (if available)
- The application handles network errors gracefully
- Form data is validated before submission

## Future Enhancements

- Add search and filter functionality
- Add pagination for large student lists
- Add export to CSV/PDF
- Add user profile management
- Add role-based access control
- Add activity logging
- Add data validation on the backend

## License

This project is part of the Library Management System.
