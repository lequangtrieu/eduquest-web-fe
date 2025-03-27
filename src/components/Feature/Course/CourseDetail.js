import {useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import PageLayout from "../../Common/Page/PageLayout";
import "../../../public/assets/css/course-detail.css";

export default function CourseDetail() {
    const {idCourse} = useParams();
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [hasPurchased, setHasPurchased] = useState(false);

    const fetchCourseDetail = async () => {
        try {
            const result = await axios.get(`https://eduquest-web-bqcrf6dpejacgnga.southeastasia-01.azurewebsites.net/api/Course/${idCourse}`);
            setCourse(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch purchase history for the current user
    const fetchPurchaseHistory = async () => {
        try {
            const userId = localStorage.getItem("userId");
            if (userId) {
                const response = await axios.get(`https://eduquest-web-bqcrf6dpejacgnga.southeastasia-01.azurewebsites.net/api/Payment/purchaseHistory?userId=${userId}`);
                setPurchaseOrders(response.data);
            }
        } catch (error) {
            console.error("Error fetching purchase history:", error);
        }
    };

    const handleBuyClick = async () => {
        try {
            const paymentData = {
                "userId": localStorage.getItem("userId"),
                "orderName": course.courseId.toString(),
                "description": course.courseTitle.substring(0, 25),
                "totalPrice": course.price,
                "paymentMethod": "Online",
                "returnUrl": "https://eduquest-web-fe.vercel.app/PaymentSuccess/",
                "cancelUrl": "https://eduquest-web-fe.vercel.app/"
            };

            console.log("xxxxxxxxx");

            // Gửi request tới API để tạo payment link
            const response = await axios.post("https://eduquest-web-bqcrf6dpejacgnga.southeastasia-01.azurewebsites.net/api/Payment/payment-link", paymentData);

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

    useEffect(() => {
        if (course && purchaseOrders.length > 0) {
            const purchased = purchaseOrders.some(
                (order) => +order.orderName === course.courseId && order.status === 1
            );
            setHasPurchased(purchased);
        }
    }, [course, purchaseOrders]);

    useEffect(() => {
        fetchCourseDetail();
        fetchPurchaseHistory();
    }, [idCourse]);

    if (!course) {
        return <PageLayout>Loading...</PageLayout>;
    }

    return (
        <PageLayout>
            <div className="course-detail">
                {/* Main Content */}
                <div className="content">
                    <img src="/img/courses/course-1.jpg" className="course-image" alt={course.courseTitle}/>
                    <h2>{course.courseTitle}</h2>
                    <p>{course.description}</p>

                    <div className="course-meta">
                        <p><strong>Category:</strong> {course.categoryName}</p>
                        <p><strong>Price:</strong> {course.price} VND</p>
                        <p><strong>Start Date:</strong> {new Date(course.createDate).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> {course.status === 1 ? "Available" : "Not Available"}</p>
                    </div>

                    {/* Course Video */}
                    <div className="course-video">
                        <h3>Introduction Video</h3>
                        <iframe
                            src="https://www.youtube.com/embed/x0fSBAgBrOQ"
                            title="Course Video"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {/* Instructor Info */}
                    <div className="instructor-info">
                        <h3>Instructor</h3>
                        <div className="instructor-profile">
                            <img src="/img/trainers/trainer-1-2.jpg" alt="Instructor"/>
                            <div className="info">
                                <h3>John Doe</h3>
                                <p>10 years in AI & Machine Learning.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                {/* Sidebar Buy Now Section */}
                <div className="sidebar">
                    <h4>{hasPurchased ? "Course Purchased" : "Buy Now"}</h4>
                    {hasPurchased ? (
                        <button
                            className="btn btn-enroll"
                            onClick={() => navigate(`/learn-course/${idCourse}`)}
                        >
                            Enroll Now
                        </button>
                    ) : (
                        <>
                            <p className="price">{course.price} VND</p>
                            <button className="btn btn-buy" onClick={handleBuyClick}>
                                Buy Course
                            </button>
                        </>
                    )}

                    <h5>Upcoming Sessions</h5>
                    <ul>
                    <li>March 2025</li>
                        <li>June 2025</li>
                    </ul>
                </div>

            </div>
        </PageLayout>
    );
}
