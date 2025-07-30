import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getToken = () => Cookies.get("token");

  const isValidToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) return false;
      setUser({ email: decoded.email }); // or `sub` or your custom payload
      return true;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token && isValidToken(token)) {
      // already handled by isValidToken
    } else {
      logout(); // token expired or invalid
    }
  }, []);

  const login = (token) => {
    Cookies.set("token", token, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
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
