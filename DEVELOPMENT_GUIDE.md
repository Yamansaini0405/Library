# Development Guide

## Getting Started

### Prerequisites
- Node.js v14+
- npm or yarn
- A code editor (VS Code recommended)

### Initial Setup

```bash
# 1. Navigate to project
cd library_frontend

# 2. Install dependencies
npm install

# 3. Configure backend URL in src/services/api.js
# Change: const API_BASE_URL = 'http://localhost:8080'

# 4. Start development server
npm run dev

# 5. Open browser to http://localhost:5173
```

## Project Structure Explained

### Components

**ProtectedRoute.jsx**
- Wraps protected pages
- Redirects to login if not authenticated
- Used with React Router

**StudentCard.jsx**
- Displays individual student info
- Edit and delete buttons
- Status badge indicator

**StudentForm.jsx**
- Reusable form component
- Handles validation
- Used for create and edit operations

### Pages

**LoginPage.jsx**
- Entry point for users
- Email and password inputs
- Validation and error display

**StudentPage.jsx**
- Shows all students in grid
- Add student button
- Edit/delete actions
- Logout button

**StudentFormPage.jsx**
- Wrapper for StudentForm
- New student or edit student mode
- Back navigation

### Services

**api.js**
- Centralized API calls
- Authentication header handling
- Error handling for all requests

### Context

**AuthContext.jsx**
- Global auth state
- Login/logout functions
- User data storage

## Common Development Tasks

### Adding a New API Endpoint

1. **Add function to `services/api.js`:**
```javascript
export const getReports = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reports`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      return { success: false, message: 'Failed to fetch reports' };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};
```

2. **Use in component:**
```javascript
const result = await getReports();
if (result.success) {
  setReports(result.data);
}
```

### Modifying Form Fields

1. **Edit `StudentForm.jsx`:**
```javascript
const [formData, setFormData] = useState({
  // ... existing fields
  newField: '',
});
```

2. **Add input in form:**
```jsx
<div>
  <label>New Field</label>
  <input
    name="newField"
    value={formData.newField}
    onChange={handleChange}
  />
</div>
```

### Changing Colors

Edit Tailwind classes in components:
```jsx
// Before
className="bg-blue-600 hover:bg-blue-700"

// After
className="bg-green-600 hover:bg-green-700"
```

Or update `tailwind.config.js` for global theme changes.

### Adding Icons

Use lucide-react icons:
```jsx
import { Plus, Trash2, Heart } from 'lucide-react';

<Plus size={20} /> // 20px icon
```

Browse all icons: https://lucide.dev

### Error Handling

**API errors:**
```javascript
if (!result.success) {
  setError(result.message);
  // Show error to user
}
```

**Form validation:**
```javascript
const validateForm = () => {
  const errors = {};
  if (!name) errors.name = 'Required';
  return Object.keys(errors).length === 0;
};
```

## Debugging Tips

### Browser DevTools

1. **Console Tab**
   - Check for JavaScript errors
   - Log API responses: `console.log(data)`

2. **Network Tab**
   - See all API requests
   - Check response status and data
   - Verify request headers

3. **React DevTools Extension**
   - Inspect component props
   - View state changes
   - Profile performance

### Logging

Add console logs to understand flow:
```javascript
console.log('Logging in user:', email);
const result = await login(email, password);
console.log('Login result:', result);
```

### Breakpoints

Use browser debugger:
```javascript
// Code pauses here when dev tools open
debugger;

statements.here();
```

## Performance Optimization

### Current optimizations:
- ✅ Vite tree-shaking
- ✅ Component lazy loading ready
- ✅ Minimal dependencies

### Further optimizations:
```javascript
// Lazy load pages
const StudentPage = lazy(() => import('./pages/StudentPage'));

// Use Suspense for fallback
<Suspense fallback={<Loader />}>
  <StudentPage />
</Suspense>
```

## Testing (Manual)

### Login Flow
1. Navigate to `/login`
2. Enter email and password
3. Click login
4. Should redirect to `/students`

### Student CRUD
1. **Create**: Click "Add Student", fill form, submit
2. **Read**: View student on list page
3. **Update**: Click edit, modify, submit
4. **Delete**: Click delete, confirm

### Error Cases
1. Submit form with empty fields
2. Enter invalid email
3. Disconnect backend and try request

## Code Style

### Component Structure
```javascript
// 1. Imports
import React, { useState } from 'react';

// 2. Component definition
export const MyComponent = () => {
  // 3. State and hooks
  const [state, setState] = useState();

  // 4. Effects and handlers
  const handleClick = () => {};

  // 5. Render
  return <div></div>;
};
```

### Naming Conventions
- Components: PascalCase (e.g., `StudentCard`)
- Files: PascalCase for components, camelCase for utilities
- Variables: camelCase (e.g., `studentName`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

## File Modification Checklist

When adding features, check:
- [ ] Updated necessary components
- [ ] Added API calls if needed
- [ ] Added validation
- [ ] Added error handling
- [ ] Updated styling
- [ ] Tested in browser
- [ ] Checked console for errors
- [ ] Verified mobile responsive

## Environment Variables

Create `.env` file in root:
```
VITE_API_BASE_URL=http://localhost:8080
```

Use in code:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

## Build Process

### Development
```bash
npm run dev
```
- Hot module replacement
- No optimization
- Source maps for debugging

### Production
```bash
npm run build
```
- Minification
- Tree-shaking
- Output to `dist/` folder

### Preview Production
```bash
npm run preview
```
- Serves optimized build locally
- Test before deployment

## Deployment Preparation

Before deploying:
1. Set correct `API_BASE_URL` for production
2. Run `npm run build`
3. Test the build: `npm run preview`
4. Check all features work
5. Verify performance
6. Review console for errors

## Useful Resources

- **React Docs**: https://react.dev
- **React Router**: https://reactrouter.com
- **Tailwind CSS**: https://tailwindcss.com
- **Lucide Icons**: https://lucide.dev
- **Vite Docs**: https://vitejs.dev
- **MDN Web Docs**: https://developer.mozilla.org

## Troubleshooting

### Hot reload not working
```bash
# Restart dev server
npm run dev
```

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Dependencies not installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### API calls failing
1. Check backend is running
2. Verify API_BASE_URL is correct
3. Check network tab for actual URL
4. Look for CORS errors

## Quick Reference

### File Organization
```
New files → Create in appropriate folder
    Features → pages/ folder
    Shared UI → components/
    Logic → services/
    State → context/
```

### Styling
All components use Tailwind CSS classes directly:
```jsx
<div className="p-6 bg-white rounded-lg shadow-md">
  Content
</div>
```

### State Management
- Auth state: Use `AuthContext`
- Page state: Use `useState` in components
- Form state: Use `useState` in forms

### Conditional Rendering
```javascript
{isLoading ? <Loader /> : <Content />}

{error && <ErrorAlert message={error} />}

{students.length === 0 ? <Empty /> : <List />}
```

---

**Happy coding!** Refer back to this guide whenever needed.
