import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import PageLayout from "../../Common/Page/PageLayout";

export function PaymentPremium() {
    const [paymentStatus, setPaymentStatus] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Xóa các key liên quan đến authentication khỏi localStorage
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("avatar");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
    };

    // Gọi API PaymentSuccess để xử lý thanh toán và cập nhật trạng thái đơn hàng
    const handlePaymentSuccess = async (code, id, cancel, status, orderCode) => {
        try {
            const response = await axios.get(
                "https://eduquest-web-bqcrf6dpejacgnga.southeastasia-01.azurewebsites.net/api/Payment/paymentSuccess",
                {
                    params: {code, id, cancel, status, orderCode},
                }
            );

            // Giả sử backend trả về thuộc tính Message chứa thông báo thành công hoặc lỗi
            if (response.data.Message && response.data.Message.includes("Payment successful")) {
                setPaymentStatus("Success");
                setMessage(response.data.Message);
            } else {
                setPaymentStatus("Failed");
                setMessage(response.data.Message || "Payment failed.");
            }
        } catch (error) {
            setPaymentStatus("Error");
            setMessage("An error occurred while processing your payment.");
            console.error(error);
        } finally {
            handleLogout();
        }
    };

    useEffect(() => {
        // Lấy các tham số từ URL query string
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get("code");
        const id = queryParams.get("id");
        const cancel = queryParams.get("cancel") === "true"; // Chuyển đổi từ string sang boolean
        const status = queryParams.get("status");
        const orderCode = queryParams.get("orderCode");

        if (code && id && status && orderCode) {
            handlePaymentSuccess(code, id, cancel, status, orderCode);
        } else {
            setPaymentStatus("Error");
            setMessage("Invalid payment information.");
        }
    }, [location]);

    return (
        <PageLayout>
            <div className="payment-success">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 text-center">
                            <h2>Payment Successful!</h2>
                            <p>Please log in again to use Premium Service.</p>
                            <button className="btn btn-primary mt-4" onClick={() => navigate("/login")}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
