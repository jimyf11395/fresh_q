import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import KpiManager from "./pages/KpiManager";
import Landing from "./pages/Landing";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";

function AppContent() {
  const location = useLocation();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Landing />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/kpi"
            element={
              <PrivateRoute>
                <KpiManager />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/landing"
            element={
              <PrivateRoute>
                <Landing />
              </PrivateRoute>
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
