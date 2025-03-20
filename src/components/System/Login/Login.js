import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../public/assets/css/login.css";
import PageLayout from "../../Common/Page/PageLayout";
import SweetAlert from "sweetalert";

export default function Login() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    if (localStorage.getItem("logoutSuccess") === "true") {
      SweetAlert(
        "Logged out successfully!",
        "You have been logged out of the system.",
        "success"
      );
      localStorage.removeItem("logoutSuccess");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://eduquest-web-bqcrf6dpejacgnga.southeastasia-01.azurewebsites.net/api/Auth/Login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data && response.data.token) {
        const token = response.data.token.result;
        localStorage.setItem("authToken", token);

        try {
          const decodedToken = jwtDecode(token);
          console.log(decodedToken);
          const role = decodedToken.role;
          const userName = decodedToken.sub;
          const avatar = response.data.avatar;
          const emailConfirmed = decodedToken.emailConfirmed;
          const userId = decodedToken.nameid;

          if (!emailConfirmed) {
            setError(
              "You haven't confirmed your email. Please confirm your email before logging in."
            );
            return;
          }

          localStorage.setItem("userName", userName);
          localStorage.setItem("userId", userId);
          localStorage.setItem("role", role);

          if (avatar) {
            localStorage.setItem("avatar", avatar);
          }
          localStorage.setItem("isLogin", "isLogin");

          if (role === "Admin") {
            navigate("/admin");
          } else if (role === "Student" || role === "VIP Student") {
            navigate("/courses");
          } else if (role === "Teacher") {
            navigate("/courses");
          } else {
            setError("Invalid role.");
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <PageLayout>
      <div
        className="d-flex justify-content-center align-items-center my-5"
        style={{
          background:
            "url('https://source.unsplash.com/1600x900/?nature,water') no-repeat center center fixed",
          backgroundSize: "cover",
        }}
      >
        <div
          className="card shadow-lg p-5"
          style={{
            maxWidth: "400px",
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "12px",
          }}
        >
          <h2
            className="text-center mb-4 font-weight-bold"
            style={{ color: "#343a40" }}
          >
            Login
          </h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email" className="font-weight-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter email"
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="font-weight-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mt-4"
              style={{ borderRadius: "8px" }}
            >
              Login
            </button>
          </form>
          <div className="text-center mt-3">
            <small>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-decoration-none"
                style={{ color: "#007bff" }}
              >
                Sign up
              </Link>
            </small>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
