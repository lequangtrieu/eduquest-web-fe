import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );

  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || null);
  const history = useHistory();

  const handleLogin = async (email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (data) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userId", data._id);
        localStorage.setItem("driverId", data.driverId);
        localStorage.setItem("avatar", data.avatar);
        setAvatar(data.avatar);
        setIsAuthenticated(true);
        const decodedToken = jwtDecode(data.accessToken);
        setUserRole(decodedToken.role);
        localStorage.setItem("userRole", decodedToken.role);
        if (
          localStorage.getItem("userRole") === "admin" ||
          localStorage.getItem("userRole") === "staff"
        ) {
        //   history.push("/dashboard-admin");
        } else {
        //   history.push("/");
        }

        window.location.reload();

        return data;
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.warn("Sai Tài Khoản Hoặc Mật Khẩu");
      } else {
        toast.error("Đăng Nhập Thất Bại");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("driverId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("avatar");
    localStorage.removeItem("userRole");
    localStorage.removeItem("tabAdmin");
    Cookies.remove("refreshToken", {
      path: "/",
    });
    setAvatar(null);
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return { handleLogin, handleLogout, isAuthenticated };
};

export default useAuth;
