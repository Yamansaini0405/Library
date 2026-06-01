# Setup & Validation Checklist

Use this checklist to ensure your frontend is properly configured and running.

## Pre-Setup Checklist

- [ ] Node.js v14+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Backend server is running
- [ ] Backend API documentation reviewed
- [ ] Test credentials obtained from admin

## Installation & Configuration

### 1. Install Dependencies
```bash
npm install
```
- [ ] No errors during installation
- [ ] `node_modules` folder created
- [ ] `package-lock.json` updated

### 2. Configure API URL
**File:** `src/services/api.js`
```javascript
const API_BASE_URL = 'http://localhost:8080'
```
- [ ] Backend URL is correct
- [ ] URL matches your backend server
- [ ] No typos in URL

### 3. Verify File Structure
```bash
# Check all required files exist
src/
├── App.jsx                    ✓
├── main.jsx                   ✓
├── index.css                  ✓
├── components/
│   ├── ProtectedRoute.jsx     ✓
│   ├── StudentCard.jsx        ✓
│   └── StudentForm.jsx        ✓
├── context/
│   └── AuthContext.jsx        ✓
├── pages/
│   ├── LoginPage.jsx          ✓
│   ├── StudentPage.jsx        ✓
│   └── StudentFormPage.jsx    ✓
└── services/
    └── api.js                 ✓
```
- [ ] All files above exist
- [ ] No files are missing

## Development Server Setup

### 4. Start Development Server
```bash
npm run dev
```
- [ ] Dev server starts without errors
- [ ] Terminal shows: `Local: http://localhost:5173`
- [ ] No "port already in use" errors

### 5. Access Application
```
Open browser: http://localhost:5173
```
- [ ] Page loads successfully
- [ ] No 404 errors in console
- [ ] No JavaScript errors in console

## Feature Validation

### 6. Login Page
**Navigate to:** `http://localhost:5173` or `http://localhost:5173/login`

- [ ] Login form displays
- [ ] Email input field visible
- [ ] Password input field visible
- [ ] Login button visible
- [ ] No console errors

### 7. Login Validation
- [ ] Submit empty form shows errors
- [ ] Invalid email shows error message
- [ ] Short password shows error message
- [ ] Error messages are visible

### 8. Successful Login
Using test credentials:
- [ ] Enter valid email
- [ ] Enter valid password
- [ ] Click Login button
- [ ] Page redirects to `/students`
- [ ] Student page loads
- [ ] No console errors

### 9. Student Page
**After successful login:**

- [ ] Student list displays (if students exist)
- [ ] "Add Student" button visible
- [ ] "Logout" button visible
- [ ] Student count shown
- [ ] Students displayed in card format

### 10. Add Student
- [ ] Click "Add Student" button
- [ ] URL changes to `/students/add`
- [ ] Form displays
- [ ] Page title shows "Add New Student"
- [ ] All form fields visible:
  - [ ] Name input
  - [ ] Email input
  - [ ] Phone input
  - [ ] Seat Number input
  - [ ] Total Fee input
  - [ ] Status dropdown

### 11. Form Validation
- [ ] Submit empty form shows errors
- [ ] Invalid email shows error
- [ ] Non-numeric seat number shows error
- [ ] Non-numeric fee shows error
- [ ] Error messages are red
- [ ] Save button is disabled during submission

### 12. Create Student
1. Fill in valid data:
   - [ ] Name: "Test Student"
   - [ ] Email: "test@example.com"
   - [ ] Phone: "0123456789"
   - [ ] Seat No: "1"
   - [ ] Total Fee: "5000"
   - [ ] Status: "PAID"

2. Click Save:
   - [ ] Loading indicator shows during save
   - [ ] Page redirects to `/students` on success
   - [ ] New student appears in list
   - [ ] No console errors

### 13. Edit Student
- [ ] Click "Edit" on any student
- [ ] URL changes to `/students/edit/{id}`
- [ ] Page title shows "Edit Student"
- [ ] Form is pre-filled with student data
- [ ] Modify a field
- [ ] Click "Save Student"
- [ ] Page redirects to `/students`
- [ ] Changes are reflected in list

### 14. Delete Student
- [ ] Click "Delete" on any student
- [ ] Confirmation dialog appears
- [ ] Click "OK" to confirm
- [ ] Loading spinner shows during delete
- [ ] Student removed from list
- [ ] List refreshes
- [ ] No console errors

### 15. Logout
- [ ] Click "Logout" button
- [ ] Redirected to `/login`
- [ ] Cannot go back to `/students` without logging in
- [ ] Attempting `/students` redirects to login
- [ ] localStorage token is cleared (check DevTools)

## API Integration Validation

### 16. Network Requests
**Open DevTools (F12) → Network tab:**

**Login request:**
- [ ] POST /api/auth/login request visible
- [ ] Request includes email and password
- [ ] Response status is 200 (success)
- [ ] Response includes message and success=true

**Student requests:**
- [ ] GET /api/students visible
- [ ] Response is array of students
- [ ] Each student has id, name, email, phone, seatNo, totalFee, status
- [ ] POST /api/students works when creating
- [ ] PUT /api/students/{id} works when editing
- [ ] DELETE /api/students/{id} works when deleting

### 17. Request Headers
- [ ] Authorization header present on student requests
- [ ] Token format: `Bearer {token}`
- [ ] Content-Type: application/json

## Error Handling Validation

### 18. Network Errors
1. Stop backend server
2. Try to load students page
- [ ] Error message displays
- [ ] Error is user-friendly
- [ ] Console shows network error
- [ ] Graceful error handling

### 19. Invalid Credentials
1. Go to login page
2. Enter invalid credentials
- [ ] Error message displays
- [ ] Message indicates invalid credentials
- [ ] Not redirected
- [ ] Form remains visible

### 20. Form Errors
1. Click "Add Student"
2. Try to submit empty form
- [ ] Each field shows error message
- [ ] Error messages are red
- [ ] Form not submitted
- [ ] User stays on form

## Browser & Responsive

### 21. Desktop View
```
Viewport: 1920x1080 or larger
```
- [ ] Layout looks good
- [ ] Buttons are properly sized
- [ ] Text is readable
- [ ] Cards display in 3 columns
- [ ] No horizontal scrolling

### 22. Tablet View
```
Viewport: 768x1024
```
- [ ] Layout is responsive
- [ ] Cards display in 2 columns
- [ ] No content overflow
- [ ] Touch-friendly buttons

### 23. Mobile View
```
Viewport: 375x667 (iPhone)
```
- [ ] Layout is responsive
- [ ] Cards display in 1 column
- [ ] Full-width forms
- [ ] Readable text
- [ ] Touchable buttons

## Performance

### 24. Page Load Time
- [ ] Login page loads quickly (< 2s)
- [ ] Student page loads quickly (< 2s)
- [ ] Form page loads quickly (< 1s)

### 25. API Response Time
- [ ] Student list loads in < 2s
- [ ] Create/Edit completes in < 2s
- [ ] Delete completes in < 2s

## Console & Debugging

### 26. Browser Console
**Check for errors:**
- [ ] No red error messages
- [ ] No warnings about missing props
- [ ] No CORS errors
- [ ] No 404 errors for assets

### 27. React DevTools
If React DevTools extension installed:
- [ ] Can inspect components
- [ ] Can see component props
- [ ] Can see state changes
- [ ] No React errors

## Security Checks

### 28. Authentication
- [ ] Token stored in localStorage
- [ ] Token sent with API requests
- [ ] Token removed on logout
- [ ] Cannot access protected routes without login

### 29. CORS
- [ ] No CORS errors in console
- [ ] Requests from frontend accepted by backend
- [ ] Backend has proper CORS headers

## Production Readiness

### 30. Build Process
```bash
npm run build
```
- [ ] Build completes without errors
- [ ] `dist/` folder created
- [ ] Build size is reasonable (< 1MB)

### 31. Production Preview
```bash
npm run preview
```
- [ ] Preview server starts
- [ ] Application loads
- [ ] All features work
- [ ] No errors in console

## Troubleshooting

If any item failed, check:

| Item Failed | Check |
|------------|-------|
| Installation | Node.js version, npm cache, internet |
| Dev server won't start | Port 5173 available, no errors in config |
| Can't login | API_BASE_URL correct, backend running |
| Students won't load | Network tab in DevTools, backend running |
| Edit/Delete not working | Form validation, API endpoints |
| CORS errors | Backend CORS config, allowed origins |
| Mobile layout broken | Check Tailwind responsive classes |
| API errors 404 | Check endpoint URLs against backend |
| API errors 401 | Check token in localStorage |

## Final Verification

### Summary Checklist
- [ ] All files created successfully
- [ ] Dependencies installed
- [ ] Dev server running
- [ ] Login works
- [ ] Student CRUD works
- [ ] Responsive design works
- [ ] Error handling works
- [ ] API integration works
- [ ] Console is clean (no errors)
- [ ] Ready for development

## Next Steps

1. **If all items checked:** ✅ Ready to develop!
2. **If items unchecked:** Review troubleshooting section
3. **For issues:** Check browser DevTools
4. **For help:** Review documentation files

## Documentation Files

Reference these files for help:
- `FRONTEND_README.md` - Complete documentation
- `QUICKSTART.md` - Quick setup guide
- `API_INTEGRATION.md` - API endpoints and integration
- `DEVELOPMENT_GUIDE.md` - Development tips and tricks
- `FILE_REFERENCE.md` - File-by-file reference
- `IMPLEMENTATION_SUMMARY.md` - Project overview

---

**Checklist complete? You're ready to start building!** 🚀
