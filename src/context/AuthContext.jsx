import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getToken = () => Cookies.get("token");

  const isValidToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) return false;
      setUser({
        user_id: decoded.user_id,
        email: decoded.email,
        username: decoded.username,
        role: decoded.role || "Viewer",
      });
      return true;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    const token = getToken();
    if (!token) return logout();

    const fetchUser = async () => {
      const token = getToken();
      if (!token) return logout();

      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/auth/me`,
          {
            headers: { Authorization: `Bearer ${token}` }, // send token in header
          }
        );
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        logout();
      }
    };

    fetchUser();
  }, []);

  const login = (token) => {
    Cookies.set("token", token, {
      expires: 1,
      secure: window.location.protocol === "https:", // only secure on https
      sameSite: "Lax",
    });
    isValidToken(token); // sets user
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token: getToken(),
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
