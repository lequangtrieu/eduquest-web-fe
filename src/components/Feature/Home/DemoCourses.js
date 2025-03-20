import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

export function DemoCourses() {
    const navigate = useNavigate();

    const showLoginAlert = () => {
        Swal.fire({
            icon: "warning",
            title: "Login Required",
            text: "You need to log in to use this feature.",
            showCancelButton: true,
            confirmButtonText: "Login",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/login");
            }
        });
    };
    const [courses, setCourses] = useState([]);
    const fetchApi = async () => {
        try {
            const result = await axios.get("https://localhost:7091/api/Courses");
            setCourses(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchApi();

        console.log("xxxxxxx",courses.length);
    }, []);
    return (
            <section id="courses" className="courses section">
                <div className="container">
                    <div className="row">
                        {courses.length > 0 ? (
                            courses.slice(0, 3).map((item) => (
                                <div
                                    key={item.courseId}
                                    className="col-lg-4 col-md-6 d-flex align-items-stretch"
                                    data-aos="zoom-in"
                                    data-aos-delay="100"
                                >
                                    <div className="course-item">
                                        <img
                                            src="/img/courses/course-1.jpg" // Đây là hình ảnh mặc định, bạn có thể thêm trường hình ảnh nếu có trong API
                                            className="img-fluid"
                                            alt={item.courseTitle}
                                        />
                                        <div className="course-content">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <p className="category">{item.categoryName}</p>
                                                <p className="price">{`${item.price} VND`}</p> {/* Hiển thị giá theo dạng tiền tệ */}
                                            </div>
                                            <h3>
                                                <Link to={`/course/${item.courseId}`} className="collapse-item">
                                                    {item.courseTitle}
                                                </Link>
                                            </h3>
                                            <p className="description">{item.description}</p>
                                            <div className="trainer d-flex justify-content-between align-items-center">
                                                <div className="trainer-profile d-flex align-items-center">
                                                    <img
                                                        src="/img/trainers/trainer-1-2.jpg" // Bạn có thể thay đổi đường dẫn hình ảnh của giảng viên nếu có trong API
                                                        className="img-fluid"
                                                        alt="Instructor"
                                                    />
                                                </div>
                                                <button className="btn btn-primary mt-3 w-100" onClick={showLoginAlert}>
                                                    View detail
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <>
                                <div
                                    className="col-lg-4 col-md-6 d-flex align-items-stretch"
                                    data-aos="zoom-in"
                                    data-aos-delay="100"
                                >
                                    <div className="course-item">
                                        <img
                                            src="/img/courses/course-1.jpg"
                                            className="img-fluid"
                                            alt="Full-Stack Web Development"
                                        />
                                        <div className="course-content">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <p className="category">Full-Stack Web Development</p>
                                                <p className="price">$299</p>
                                            </div>
                                            <h3>
                                                <a href="course-details.html">
                                                    Become a Full-Stack Developer
                                                </a>
                                            </h3>
                                            <p className="description">
                                                Learn HTML, CSS, JavaScript, React, and Node.js to
                                                build dynamic and responsive web applications.
                                                Hands-on projects and real-world applications
                                                included.
                                            </p>
                                            <div className="trainer d-flex justify-content-between align-items-center">
                                                <div className="trainer-profile d-flex align-items-center">
                                                    <img
                                                        src="/img/trainers/trainer-1-2.jpg"
                                                        className="img-fluid"
                                                        alt="John Doe"
                                                    />
                                                    <a href="" className="trainer-link">
                                                        John Doe
                                                    </a>
                                                </div>
                                                <div className="trainer-rank d-flex align-items-center">
                                                    <i className="bi bi-person user-icon"></i>&nbsp;120
                                                    &nbsp;&nbsp;
                                                    <i className="bi bi-heart heart-icon"></i>&nbsp;98
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0"
                                    data-aos="zoom-in"
                                    data-aos-delay="200"
                                >
                                    <div className="course-item">
                                        <img
                                            src="/img/courses/course-2.jpg"
                                            className="img-fluid"
                                            alt="Digital Marketing"
                                        />
                                        <div className="course-content">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <p className="category">Digital Marketing for IT</p>
                                                <p className="price">$199</p>
                                            </div>
                                            <h3>
                                                <a href="course-details.html">
                                                    SEO & Social Media Strategies
                                                </a>
                                            </h3>
                                            <p className="description">
                                                Master SEO, content marketing, and social media
                                                strategies tailored for IT and tech businesses. Learn
                                                how to drive traffic and optimize brand presence
                                                online.
                                            </p>
                                            <div className="trainer d-flex justify-content-between align-items-center">
                                                <div className="trainer-profile d-flex align-items-center">
                                                    <img
                                                        src="/img/trainers/trainer-2-2.jpg"
                                                        className="img-fluid"
                                                        alt="Sarah Lee"
                                                    />
                                                    <a href="" className="trainer-link">
                                                        Sarah Lee
                                                    </a>
                                                </div>
                                                <div className="trainer-rank d-flex align-items-center">
                                                    <i className="bi bi-person user-icon"></i>&nbsp;85
                                                    &nbsp;&nbsp;
                                                    <i className="bi bi-heart heart-icon"></i>&nbsp;72
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0"
                                    data-aos="zoom-in"
                                    data-aos-delay="300"
                                >
                                    <div className="course-item">
                                        <img
                                            src="/img/courses/course-3.jpg"
                                            className="img-fluid"
                                            alt="AI Copywriting"
                                        />
                                        <div className="course-content">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <p className="category">AI-Powered Copywriting</p>
                                                <p className="price">$149</p>
                                            </div>
                                            <h3>
                                                <a href="course-details.html">Write Better with AI</a>
                                            </h3>
                                            <p className="description">
                                                Leverage AI tools like ChatGPT and Jasper to create
                                                high-quality blog posts, landing pages, and ad copy
                                                that convert. Perfect for tech professionals and
                                                content creators.
                                            </p>
                                            <div className="trainer d-flex justify-content-between align-items-center">
                                                <div className="trainer-profile d-flex align-items-center">
                                                    <img
                                                        src="/img/trainers/trainer-3-2.jpg"
                                                        className="img-fluid"
                                                        alt="Michael Chen"
                                                    />
                                                    <a href="" className="trainer-link">
                                                        Michael Chen
                                                    </a>
                                                </div>
                                                <div className="trainer-rank d-flex align-items-center">
                                                    <i className="bi bi-person user-icon"></i>&nbsp;60
                                                    &nbsp;&nbsp;
                                                    <i className="bi bi-heart heart-icon"></i>&nbsp;80
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
    )
}