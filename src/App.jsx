import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import { StudentPage } from './pages/StudentPage'
import { StudentFormPage } from './pages/StudentFormPage'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Routes */}
          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <StudentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students/add"
            element={
              <ProtectedRoute>
                <StudentFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students/edit/:id"
            element={
              <ProtectedRoute>
                <StudentFormPage />
              </ProtectedRoute>
            }
          />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/students" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App