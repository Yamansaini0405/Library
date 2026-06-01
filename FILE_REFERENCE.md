# File Reference Guide

## Complete File Structure

```
library_frontend/
├── public/                            # Static files
├── src/
│   ├── assets/                        # Images, fonts, etc.
│   │
│   ├── components/                    # Reusable components
│   │   ├── ProtectedRoute.jsx         # Route protection wrapper
│   │   ├── StudentCard.jsx            # Student display card
│   │   └── StudentForm.jsx            # Form component for add/edit
│   │
│   ├── context/                       # React Context
│   │   └── AuthContext.jsx            # Auth state management
│   │
│   ├── pages/                         # Page-level components
│   │   ├── LoginPage.jsx              # Login form
│   │   ├── StudentPage.jsx            # Student list
│   │   └── StudentFormPage.jsx        # Add/Edit student wrapper
│   │
│   ├── services/                      # API & utilities
│   │   └── api.js                     # API calls
│   │
│   ├── App.jsx                        # Main app router
│   ├── main.jsx                       # React entry point
│   └── index.css                      # Tailwind CSS
│
├── API_INTEGRATION.md                 # API endpoints guide
├── DEVELOPMENT_GUIDE.md               # Development tips
├── FRONTEND_README.md                 # Full documentation
├── IMPLEMENTATION_SUMMARY.md          # Project summary
├── QUICKSTART.md                      # Quick start guide
├── package.json                       # Dependencies
├── vite.config.js                     # Vite configuration
├── eslint.config.js                   # ESLint config
├── index.html                         # HTML entry point
└── README.md                          # Original README
```

## Component Details

### Context

#### AuthContext.jsx
**Location:** `src/context/AuthContext.jsx`

**Purpose:** Manages global authentication state

**Key Functions:**
- `login(email, password)` - Authenticate user
- `logout()` - Clear session
- `useAuth()` - Hook to access auth context

**Exported:**
```javascript
export const AuthProvider  // Wrapper component
export const useAuth       // Hook to use context
```

**State:**
- `user` - Current user data
- `isLoading` - Loading state
- `error` - Error messages

---

### Components

#### ProtectedRoute.jsx
**Location:** `src/components/ProtectedRoute.jsx`

**Purpose:** Protect routes from unauthenticated access

**Props:**
- `children` - Components to render if authenticated

**Behavior:**
- Redirects to `/login` if not authenticated
- Renders children if authenticated

**Usage:**
```jsx
<Route
  path="/students"
  element={
    <ProtectedRoute>
      <StudentPage />
    </ProtectedRoute>
  }
/>
```

---

#### StudentCard.jsx
**Location:** `src/components/StudentCard.jsx`

**Purpose:** Display individual student information

**Props:**
- `student` - Student object with all fields
- `onEdit(student)` - Callback for edit button
- `onDelete(id)` - Callback for delete button

**Displays:**
- Student name
- Email
- Phone number
- Seat number
- Total fee
- Payment status (PAID/UNPAID)

**Features:**
- Edit button - Triggers edit modal/page
- Delete button - Removes student
- Status badge - Color-coded by payment status
- Hover effects

---

#### StudentForm.jsx
**Location:** `src/components/StudentForm.jsx`

**Purpose:** Reusable form for creating and editing students

**Props:**
- `student` - Existing student data (null for new)
- `onSubmit(data)` - Submit handler
- `onCancel()` - Cancel handler
- `isLoading` - Loading state

**Fields:**
- Name (text, required)
- Email (email, required)
- Phone (tel, required)
- Seat Number (number, required)
- Total Fee (number, required)
- Payment Status (select: PAID/UNPAID)

**Features:**
- Full validation
- Error messages
- Disabled state during submission
- Save and Cancel buttons

---

### Pages

#### LoginPage.jsx
**Location:** `src/pages/LoginPage.jsx`

**Purpose:** User authentication interface

**Fields:**
- Email input with validation
- Password input
- Login button
- Error display

**Features:**
- Email format validation
- Password length validation
- Form error messages
- Loading state
- API error display
- Professional styling with gradient background

**Flow:**
1. User enters credentials
2. Form validates
3. API login call
4. Success → Redirect to /students
5. Failure → Show error

---

#### StudentPage.jsx
**Location:** `src/pages/StudentPage.jsx`

**Purpose:** Display and manage all students

**Features:**
- Grid of StudentCards
- Add Student button
- Logout button
- Student count display
- Loading spinner
- Error handling
- Delete confirmation
- Edit navigation

**API Calls:**
- `getStudents()` - Load all students
- `deleteStudent(id)` - Delete student

**State:**
- `students` - Array of student objects
- `isLoading` - Loading state
- `error` - Error messages
- `isDeleting` - Delete in progress

**Actions:**
- **Add**: Navigate to `/students/add`
- **Edit**: Navigate to `/students/edit/{id}`
- **Delete**: Call API, update list

---

#### StudentFormPage.jsx
**Location:** `src/pages/StudentFormPage.jsx`

**Purpose:** Wrapper page for StudentForm

**Modes:**
- Create: New student form
- Edit: Pre-filled student data

**Features:**
- Back button navigation
- Error handling
- Loading state
- Page title changes based on mode

**API Calls:**
- `createStudent(data)` - Create new
- `updateStudent(id, data)` - Update existing

**Flow:**
1. User submits form
2. Validate data
3. Call API
4. Success → Redirect to /students
5. Failure → Show error

---

### Services

#### api.js
**Location:** `src/services/api.js`

**Purpose:** Centralized API communication

**Configuration:**
```javascript
const API_BASE_URL = 'http://localhost:8080'
```

**Auth Functions:**
- `loginUser(email, password)` - POST /api/auth/login
- `logout()` - Clear localStorage

**Student Functions:**
- `getStudents()` - GET /api/students
- `getStudentById(id)` - GET /api/students/{id}
- `createStudent(data)` - POST /api/students
- `updateStudent(id, data)` - PUT /api/students/{id}
- `deleteStudent(id)` - DELETE /api/students/{id}

**Features:**
- Automatic token inclusion
- Error handling
- JSON parsing
- Success/failure response structure

**Response Format:**
```javascript
{
  success: boolean,
  message: string,
  data?: any,
  error?: string
}
```

---

### Main Files

#### App.jsx
**Location:** `src/App.jsx`

**Purpose:** Main application router

**Routes:**
- `/login` - LoginPage
- `/students` - StudentPage (protected)
- `/students/add` - StudentFormPage (protected)
- `/students/edit/:id` - StudentFormPage (protected)
- `/` - Redirect to /students

**Providers:**
- Router
- AuthProvider

---

#### main.jsx
**Location:** `src/main.jsx`

**Purpose:** React application entry point

**Renders:**
- App component
- StrictMode for development

**CSS Import:**
- `index.css` - Tailwind CSS

---

#### index.css
**Location:** `src/index.css`

**Content:**
- Tailwind CSS import
- Global styles (if any)

---

## Data Models

### Student Object
```javascript
{
  id: number,                    // Auto-generated
  name: string,                  // Required
  email: string,                 // Required, valid email
  phone: string,                 // Required
  seatNo: number,                // Required
  totalFee: number,              // Required
  status: 'PAID' | 'UNPAID'      // Required
}
```

### Auth Response
```javascript
{
  message: string,
  success: boolean,
  token?: string                 // Optional JWT token
}
```

### API Response
```javascript
{
  success: boolean,
  data?: any,
  message: string
}
```

---

## Import Paths

### Absolute Imports (if configured)
```javascript
import { LoginPage } from './pages/LoginPage'
import { StudentCard } from './components/StudentCard'
import { useAuth } from './context/AuthContext'
import { getStudents } from './services/api'
```

### File Extensions
- JSX components: `.jsx`
- Services/utilities: `.js`
- Styles: `.css`

---

## Dependencies

### Core
- **react** - UI library
- **react-dom** - React rendering
- **react-router-dom** - Routing

### Styling
- **tailwindcss** - CSS framework
- **lucide-react** - Icons

### Build Tools
- **vite** - Build tool
- **eslint** - Code linting

---

## Common Patterns

### Using Auth Hook
```javascript
import { useAuth } from '../context/AuthContext'

export const MyComponent = () => {
  const { user, logout, login } = useAuth()
  
  return <div>{user?.email}</div>
}
```

### Making API Calls
```javascript
import { getStudents } from '../services/api'

export const MyComponent = () => {
  const [students, setStudents] = useState([])
  
  useEffect(() => {
    const fetch = async () => {
      const result = await getStudents()
      if (result.success) {
        setStudents(result.data)
      }
    }
    fetch()
  }, [])
}
```

### Form Validation
```javascript
const validateForm = () => {
  const newErrors = {}
  if (!value) newErrors.field = 'Field is required'
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}
```

### Conditional Rendering
```javascript
{isLoading ? <Loader /> : <Content />}
{error && <ErrorAlert />}
{items.length === 0 ? <Empty /> : <List />}
```

---

## Configuration Files

### package.json
**Scripts:**
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview build

### vite.config.js
**Configuration for Vite build tool**

### eslint.config.js
**ESLint rules for code quality**

---

## Styling Guide

### Tailwind Classes Used

**Layout:**
- `flex`, `grid`, `absolute`, `relative`
- `w-full`, `max-w-7xl`, `px-4`, `py-6`

**Colors:**
- `bg-blue-600`, `bg-red-600`, `text-gray-800`
- `hover:bg-blue-700`, `focus:ring-blue-500`

**Components:**
- `rounded-lg`, `shadow-md`, `border`
- `transition`, `disabled:` states

### Creating Responsive Layouts
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid */}
</div>
```

---

## Troubleshooting by File

### App.jsx Issues
- Routes not working → Check route paths
- Components not rendering → Check imports
- 404 errors → Verify route definitions

### LoginPage.jsx Issues
- Login not working → Check API_BASE_URL
- Form not validating → Check validation logic
- Token not saving → Check localStorage in DevTools

### StudentPage.jsx Issues
- Students not loading → Check API response
- Delete not working → Check delete handler
- Grid not responsive → Check Tailwind classes

### api.js Issues
- 401 errors → Check token in localStorage
- CORS errors → Check backend CORS headers
- Failed requests → Check API_BASE_URL and network

---

**This guide covers all files in the project. Use it as a reference while developing!**
