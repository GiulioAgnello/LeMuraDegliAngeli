import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import DefaultLayout from "./layouts/DefaultLayout";
import Homepage from "./pages/Homepage";
import Gallery from "./pages/Gallery";
import Story from "./pages/Story";
import Contacts from "./pages/Contacts";
import Sternatia from "./pages/Sternatia";
import Corigliano from "./pages/Corigliano";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import GuestPortal from "./pages/GuestPortal";
import Booking from "./pages/Booking";

function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  if (!user) return <Navigate to="/login" />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" />;
  return children;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/sternatia" element={<Sternatia />} />
          <Route path="/corigliano" element={<Corigliano />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/storia" element={<Story />} />
          <Route path="/contatti" element={<Contacts />} />
          <Route path="/prenota" element={<Booking />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute requiredRole="owner">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ospite/*"
          element={
            <ProtectedRoute requiredRole="guest">
              <GuestPortal />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
