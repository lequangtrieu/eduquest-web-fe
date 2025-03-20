import "../../../public/assets/css/pricing.css";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function Subscriptions() {
      useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, []);
      
    const handleBuyClick = async () => {
        try {
            const paymentData = {
                "userId": localStorage.getItem("userId"),
                "orderName": "Premium Plan",
                "description": "Premium Plan",
                "totalPrice": 15000,
                "paymentMethod": "Online",
                "returnUrl": "http://localhost:3000/PaymentPremium/",
                "cancelUrl": "http://localhost:3000/"
            };

            // Gửi request tới API để tạo payment link
            const response = await axios.post("https://localhost:7091/api/Payment/payment-link", paymentData);

            console.log(response);
            if (response.data && response.data.paymentLink) {
                // Chuyển hướng người dùng đến link thanh toán
                window.location.href = response.data.paymentLink;
            }
        } catch (error) {
            console.error("Error while creating payment link:", error);
            alert("An error occurred while processing your payment. Please try again.");
        }
    };


    return (
        <section id="pricing" className="pricing section">
            <div className="container" data-aos="zoom-in" data-aos-delay="100">
                <div className="row g-3 justify-content-center">
                    <div className="col-lg-4 col-md-5">
                        <div className="pricing-item">
                            <div className="icon">
                                <i className="bi bi-box"></i>
                            </div>
                            <h4 className="fw-semibold fs-5">Free Plan</h4>
                            <h5 className="price">
                                0 VND<span>/month</span>
                            </h5>
                            <ul className="list-unstyled">
                                <li>
                                    <i className="bi bi-check"></i> Limited free courses
                                </li>
                                <li>
                                    <i className="bi bi-check"></i> AI course recommendations
                                </li>
                                <li className="text-muted">
                                    <i className="bi bi-x"></i> No quizzes & analytics
                                </li>
                                <li className="text-muted">
                                    <i className="bi bi-x"></i> No certification
                                </li>
                            </ul>
                            <Link to="/courses">
                                <button className="buy-btn">Get Started</button>
                            </Link>

                        </div>
                    </div>

                    <div className="col-lg-4 col-md-5">
                        <div className="pricing-item">
                            <div className="icon">
                                <i className="bi bi-rocket"></i>
                            </div>
                            <h4 className="fw-semibold fs-5">Premium Plan</h4>
                            <h5 className="price">
                                15000 VND<span>/month</span>
                            </h5>
                            <ul className="list-unstyled">
                                <li>
                                    <i className="bi bi-check"></i> Unlimited course access
                                </li>
                                <li>
                                    <i className="bi bi-check"></i> AI-powered learning
                                </li>
                                <li>
                                    <i className="bi bi-check"></i> Personalized quizzes
                                </li>
                                <li>
                                    <i className="bi bi-check"></i> Certification included
                                </li>
                            </ul>
                            {localStorage.getItem('role') === 'VIP Student' ?
                                (
                                    <Link to="/courses">
                                        <button className="buy-btn">Get Started</button>
                                    </Link>
                                ) : (
                                    <button className="buy-btn" onClick={handleBuyClick}>Subscribe Now</button>
                                )}

                        </div>
                    </div>

                    {/*<div className="col-lg-4 col-md-5">*/}
                    {/*    <div className="pricing-item">*/}
                    {/*        <div className="icon">*/}
                    {/*            <i className="bi bi-person-video3"></i>*/}
                    {/*        </div>*/}
                    {/*        <h4 className="fw-semibold fs-5">Instructor Plan</h4>*/}
                    {/*        <h5 className="price">*/}
                    {/*            $49<span>/month</span>*/}
                    {/*        </h5>*/}
                    {/*        <ul className="list-unstyled">*/}
                    {/*            <li>*/}
                    {/*                <i className="bi bi-check"></i> Unlimited course uploads*/}
                    {/*            </li>*/}
                    {/*            <li>*/}
                    {/*                <i className="bi bi-check"></i> AI-powered student insights*/}
                    {/*            </li>*/}
                    {/*            <li>*/}
                    {/*                <i className="bi bi-check"></i> Revenue sharing & analytics*/}
                    {/*            </li>*/}
                    {/*            <li>*/}
                    {/*                <i className="bi bi-check"></i> Advanced tracking & reports*/}
                    {/*            </li>*/}
                    {/*        </ul>*/}
                    {/*        <button className="buy-btn">Join as Instructor</button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </section>

    );
}

