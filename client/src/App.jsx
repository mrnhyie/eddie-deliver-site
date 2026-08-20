import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import RequestErrand from './pages/RequestErrand'
import RestaurantPartner from './pages/RestaurantPartner'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import Errands from './pages/admin/Errands'
import Restaurants from './pages/admin/Restaurants'
import AdminLayout from './components/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/request-errand" element={<RequestErrand />} />
        <Route path="/restaurant" element={<RestaurantPartner />} />

        {/* Admin auth — /admin goes to login */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected admin shell */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="errands" element={<Errands />} />
          <Route path="restaurants" element={<Restaurants />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
