import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../public/assets/css/courses.css";
import "../../../public/assets/css/pricing.css";
import "../../../public/assets/css/heroSection.css";
import Chatbot from "../../Common/OpenAIChat/Chatbot";
import { Banner } from "../../Common/Page/Banner";
import Swal from "sweetalert2";

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState(["All"]);
    const [priceFilter, setPriceFilter] = useState(""); // Thêm state để lọc theo giá
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        fetchCategories();
        fetchCourses();
    }, []);
    
    useEffect(() => {
    
        const delaySearch = setTimeout(() => {
            handleSearch();
        }, 500);
    
        return () => clearTimeout(delaySearch);
    }, [searchQuery]);

    useEffect(() => {
        handleSearch();
    }, [priceFilter, category]);

    const fetchCategories = async () => {
        try {
            // const response = await axios.get("http://localhost:5065/api/CourseCategory");
            const response = await axios.get("https://eduquest-web-bqcrf6dpejacgnga.southeastasia-01.azurewebsites.net/api/CourseCategory");
            setCategories(["All"].concat(response.data.map(c => c.name)));
            setCategory("All");
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCourses = async () => {
        try {
            // const result = await axios.get("http://localhost:5065/api/Courses?$filter=status eq 1");
            const result = await axios.get("https://eduquest-web-bqcrf6dpejacgnga.southeastasia-01.azurewebsites.net/api/Courses?$filter=status eq 1");
            setCourses(result.data);
        } catch (error) {
            console.error("Error when fetching course data:", error);
            setCourses([]);
        }
    };

    const handleSearch = useCallback(async () => {
        let trimmedKeyword = searchQuery.trim();
    
        if (trimmedKeyword.length > 60) {
            trimmedKeyword = trimmedKeyword.substring(0, 60);
            Swal.fire(
                "Error!",
                "Your search input is too long, it has been trimmed to 60 characters.",
                "error"
            );
        }
    
        try {
            const filterQuery = `$filter=(contains(tolower(courseTitle), '${encodeURIComponent(trimmedKeyword)}') or contains(tolower(description), '${encodeURIComponent(trimmedKeyword)}')) and status eq 1
            ${category !== "All" ? " and categoryName eq '" + category + "'" : ""}
            ${priceFilter === "" ? "" : (priceFilter === "low" ? " and price le 20000" : (priceFilter === "medium" ? " and price gt 20000 and price le 50000" : " and price gt 50000"))}`;
    
            const result = await axios.get(`https://eduquest-web-bqcrf6dpejacgnga.southeastasia-01.azurewebsites.net/api/Courses?${filterQuery}`);
            // const result = await axios.get(`http://localhost:5065/api/Courses?${filterQuery}`);
            setCourses(result.data);
        } catch (error) {
            console.error("Error searching courses:", error);
            setCourses([]);
        }
    }, [searchQuery, priceFilter, category]);

    // const filteredCourses = courses
        // .filter((course) => (category !== "All" ? course.categoryName.toLowerCase() === category.toLowerCase() : true))
        // // .filter((course) => (category ? course.categoryId === parseInt(category) : true))
        // .filter((course) => {
        //     if (priceFilter === "") return true;
        //     const price = parseFloat(course.price);
        //     if (priceFilter === "low") return price <= 20000;
        //     if (priceFilter === "medium") return price > 20000 && price <= 50000;
        //     if (priceFilter === "high") return price > 50000;
        //     return true;
        // })
        // ;

    return (
        <div>
            <Banner />

            <div className="CourseLayout">
                <div className="container coursesContainer">
                    <div className="search-filter d-flex justify-content-between mb-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="form-control w-50"
                        />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="form-select w-25"
                        >
                            {categories.map((category) => (
                                <option value={category}>{category}</option>
                            ))}
                            {/* <option value="">All</option>
                            <option value="Programming Languages">Programming Languages</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="Web Development">Web Development</option> */}
                        </select>
                        <select
                            value={priceFilter}
                            onChange={(e) => setPriceFilter(e.target.value)}
                            className="form-select w-25"
                        >
                            <option value="">Filter by Price</option>
                            <option value="low">Under 20.000VND</option>
                            <option value="medium">20.000 - 50.000VND</option>
                            <option value="high">Above 50.000VND</option>
                        </select>

                    </div>

                    <div className="row">
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <div key={course.courseId}
                                    className="col-lg-4 col-md-6 d-flex align-items-stretch mb-4">
                                    <div className="course-item">
                                        <img src={course.imageURL || "../img/courses/course-1.jpg"} className="img-fluid"
                                            alt={course.courseTitle} />
                                        <div className="course-content">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <p className="category">{course.categoryName}</p>
                                                <p className="price">{new Intl.NumberFormat("vi-VN").format(course.price)} VND</p>
                                            </div>
                                            <h3>{course.courseTitle}</h3>
                                            <p className="description">{course.description}</p>
                                            <div className="trainer d-flex justify-content-between align-items-center">
                                                <div className="trainer-profile d-flex align-items-center">
                                                    <img src="/img/trainers/trainer-1-2.jpg" className="img-fluid"
                                                        alt="Trainer" />
                                                    <Link to="/" className="trainer-link">{course.trainerName}</Link>
                                                </div>
                                                <button className="btn btn-primary mt-3 w-100"
                                                    onClick={() => navigate(`/course/${course.courseId}`)}>
                                                    View detail
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">Không có khóa học nào</p>
                        )}
                    </div>

                    <div className="pagination d-flex justify-content-center mt-4">
                        {[...Array(Math.ceil(courses.length / coursesPerPage)).keys()].map((page) => (
                            <button key={page + 1}
                                className={`btn ${currentPage === page + 1 ? "btn-primary" : "btn-outline-primary"} mx-1`}
                                onClick={() => setCurrentPage(page + 1)}>
                                {page + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {localStorage.getItem("role") === 'VIP Student' && <Chatbot />}
        </div>
    );
}
