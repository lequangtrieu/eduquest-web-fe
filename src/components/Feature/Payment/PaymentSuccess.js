import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import PageLayout from "../../Common/Page/PageLayout";

export function PaymentSuccess() {
    const [paymentStatus, setPaymentStatus] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Sử dụng useNavigate thay vì history
    const location = useLocation();

    useEffect(() => {
        // Lấy các tham số từ URL query string
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get("code");
        const id = queryParams.get("id");
        const cancel = queryParams.get("cancel") === "true"; // Convert cancel string to boolean
        const status = queryParams.get("status");
        const orderCode = queryParams.get("orderCode");

        // Kiểm tra nếu có thông tin thanh toán hợp lệ
        if (code && id && status && orderCode) {
            handlePaymentSuccess(code, id, cancel, status, orderCode);
        } else {
            setPaymentStatus("Error");
            setMessage("Invalid payment information.");
        }
    }, [location]);

    const handlePaymentSuccess = async (code, id, cancel, status, orderCode) => {
        try {
            // Gửi yêu cầu đến backend để xử lý thanh toán
            const response = await axios.get(
                `https://localhost:7091/api/Payment/paymentSuccess`,
                {
                    params: { code, id, cancel, status, orderCode },
                }
            );

            if (response.data.message === "Payment successful and order status updated") {
                setPaymentStatus("Success");
                setMessage(response.data.message);
            } else {
                setPaymentStatus("Failed");
                setMessage(response.data.message);
            }
        } catch (error) {
            setPaymentStatus("Error");
            setMessage("An error occurred while processing your payment.");
            console.error(error);
        }
    };

    const handleGoHome = () => {
        navigate("/"); // Quay về trang chủ bằng useNavigate
    };

    return (
        <PageLayout>
        <div className="payment-success">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <h2>Payment Successful!</h2>
                        <p>Payment successful and order status updated</p>
                        <button className="btn btn-primary mt-4" onClick={handleGoHome}>
                            Go to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </PageLayout>
    );
}
