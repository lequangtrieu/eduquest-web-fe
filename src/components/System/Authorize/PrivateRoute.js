import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import swal from "sweetalert";

const PrivateRoute = ({ allowedRoles = [] }) => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  if (!token) {
    swal({
      title: "Notification",
      text: "You need to log in to access this page.",
      icon: "warning",
      buttons: ["Close", "Log in"],
    }).then((willLogin) => {
      if (willLogin) {
        navigate("/login");
      } else {
        window.history.back();
      }
    });
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    const isAllowed = allowedRoles.includes(userRole) || (userRole === "VIP Student" && allowedRoles.includes("Student"));

    if (isAllowed) {
      return <Outlet />;
    } else {
      if (userRole === "Student" && allowedRoles.includes("VIP Student")) {
        // Show alert when Student tries to access VIP Student pages
        swal({
          title: "Upgrade Your Account",
          text: "You need a VIP package to access this feature. Would you like to upgrade now?",
          icon: "warning",
          buttons: ["View Later", "Upgrade Now"],
          dangerMode: true,
        }).then((willUpgrade) => {
          if (willUpgrade) {
            navigate("/subscriptions");
          } else {
            window.history.back();
          }
        });
        return null;
      }

      swal("Warning!", "You do not have permission to access this page!", "error").then(() => {
        window.history.back();
      });

      return null;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    swal("Error!", "Invalid session. Please log in again.", "error").then(() => {
      navigate("/login");
    });
    return null;
  }
};

export default PrivateRoute;
