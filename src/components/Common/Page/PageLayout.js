import React, {useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import SweetAlert from "sweetalert";

export default function PageLayout({children}) {
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
        <div className="page-container-layout">
            <Header/>
            <main className="content-layout">{children}</main>
            <Footer/>
        </div>
    );
}
