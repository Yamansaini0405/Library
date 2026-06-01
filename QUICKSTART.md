# Quick Start Guide - Library Management Frontend

## Setup Steps

### 1. Configure Backend URL

Edit `src/services/api.js` and update the `API_BASE_URL`:

```javascript
const API_BASE_URL = 'http://localhost:8080'; // Your backend server URL
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- react
- react-router-dom
- lucide-react
- tailwindcss

### 3. Start Development Server

```bash
npm run dev
```

Server starts at: `http://localhost:5173`

### 4. Test Login

Use your test credentials to login:
- Email: (provided by your admin)
- Password: (provided by your admin)

## Project Features

### Login System ✅
- Email and password authentication
- Form validation
- Error handling
- Token storage in localStorage

### Student Management ✅
- Create new students
- View all students in card format
- Edit student information
- Delete students
- Display student details (name, email, phone, seat, fee, status)

### UI Components ✅
- Responsive design (mobile-friendly)
- Input validation with error messages
- Loading states
- Error alerts
- Button states (hover, disabled, loading)

### Protected Pages ✅
- Routes require authentication
- Automatic redirect to login if not authenticated
- Session persistence across page refresh

## Development Workflow

1. **Making Changes**
   ```bash
   npm run dev
   ```
   The browser will auto-refresh on file changes

2. **Building for Production**
   ```bash
   npm run build
   ```
   Creates optimized build in `dist/` folder

3. **Debugging**
   - Use browser DevTools (F12)
   - Check browser Console for errors
   - Use React Developer Tools extension

## Common Issues

### "Failed to fetch students"
- Check if backend server is running
- Verify API_BASE_URL is correct
- Check network tab in browser DevTools

### "Login failed"
- Verify email format
- Check password requirements
- Ensure backend server is accessible

### "CORS Error"
- Backend needs to allow requests from your frontend URL
- Add CORS headers to backend responses

## File Locations

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main routing and app structure |
| `src/pages/LoginPage.jsx` | Login form component |
| `src/pages/StudentPage.jsx` | Student list view |
| `src/pages/StudentFormPage.jsx` | Add/Edit student form |
| `src/services/api.js` | API calls |
| `src/context/AuthContext.jsx` | Authentication state |
| `src/components/StudentCard.jsx` | Student display card |
| `src/components/StudentForm.jsx` | Reusable form component |

## Next Steps

1. Configure your backend URL in `api.js`
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Test the login with provided credentials
5. Test student CRUD operations

## Environment Variables (Optional)

Create a `.env` file in the root directory:

```
VITE_API_BASE_URL=http://localhost:8080
```

Then update `api.js`:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
```

## Build Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint (if configured)
```

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify all API endpoints match your backend
3. Ensure authentication token is being sent with requests
4. Check CORS configuration on backend
