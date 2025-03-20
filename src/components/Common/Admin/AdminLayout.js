import React, { useEffect } from "react";
import { SidebarAdmin } from "../Admin/SidebarAdmin";
import { HeaderAdmin } from "../Admin/HeaderAdmin";
import "./admin.css";
import "./admin2.css";
import SweetAlert from "sweetalert";

export default function AdminLayout({ children }) {
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin !== null) {
      SweetAlert(
        "Đăng nhập thành công!",
        `Chào mừng ${localStorage.getItem("userName")} đến với hệ thống!`,
        "success"
      );
    }
    localStorage.removeItem("isLogin");
  });
  return (
    <div id="wrapper">
      <SidebarAdmin />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <HeaderAdmin />
          <div className="container-fluid">{children}</div>
        </div>
      </div>
    </div>
  );
}
