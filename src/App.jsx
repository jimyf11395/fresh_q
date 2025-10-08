import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/DashboardPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import KpiManager from "./pages/KpiManagerPage";
import Landing from "./pages/LandingPage";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/ProfilePage";
import KpiDetail from "./pages/KpiDetailPage";
import UserManager from "./pages/UserManagerPage";

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
          <Route path="/kpi/:title" element={<KpiDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<UserManager />} />
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
