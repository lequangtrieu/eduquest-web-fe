import axios from "axios";
import AdminLayout from "../../Common/Admin/AdminLayout";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchKeyword]);

  const fetchCourses = async () => {
    try {
      const result = await axios.get("https://localhost:7091/api/Courses/");
      setCourses(result.data);
    } catch (error) {
      console.error("Error when fetching course data:", error);
      setCourses([]);
    }
  };

  const handleToggleCourseStatus = async (
    courseId,
    courseTitle,
    isApproved
  ) => {
    const action = isApproved ? "unapprove" : "approve";
    const actionText = isApproved ? "unapprove" : "approve";

    Swal.fire({
      title: `Do you want to ${actionText} the course "${courseTitle}"?`,
      text: `Once ${actionText}d, this course will ${
        isApproved ? "be hidden from students" : "be available for students"
      }!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isApproved ? "#d33" : "#28a745",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, ${actionText} now!`,
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            `https://localhost:7091/api/Course/${action}/${courseId}`
          );
          Swal.fire(
            isApproved ? "Unapproved!" : "Approved!",
            `The course "${courseTitle}" has been ${actionText}d.`,
            "success"
          );

          setCourses((prevCourses) =>
            prevCourses.map((course) =>
              course.courseId === courseId
                ? { ...course, status: !course.status }
                : course
            )
          );
        } catch (error) {
          console.error(`Error ${action}ing course:`, error);
          Swal.fire(
            "Error!",
            `Unable to ${actionText} the course. Please try again!`,
            "error"
          );
        }
      }
    });
  };

  const handleSearch = async () => {
    if (searchKeyword.length > 60) {
        const trimmedKeyword = searchKeyword.substring(0, 60);
        setSearchKeyword(trimmedKeyword);
        
        Swal.fire(
          "Error!",
          "Your search input is too long, it has been trimmed to 99 characters.",
          "error"
        );
        
        fetchCourses();
        return;
      }

    if (!searchKeyword.trim()) {
      fetchCourses();
      return;
    }

    try {
      const result = await axios.get(
        `https://localhost:7091/api/Course/search?keyword=${searchKeyword}`
      );
      setCourses(result.data);
    } catch (error) {
      console.error("Error searching courses:", error);
      setCourses([]);
    }
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Management course</h1>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <input
              type="text"
              className="form-control"
              style={{ width: "25%" }}
              placeholder="Search courses by name..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <thead className="thead-dark">
                  <tr>
                    <th>Image</th>
                    <th>Name Course</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length > 0 ? (
                    courses.map((course, index) => (
                      <tr key={index}>
                        <td className="text-center">
                          <img
                            width="50"
                            height="50"
                            alt="Course"
                            src={
                              course.imageURL
                                ? course.imageURL
                                : "../../img/blog/blog-2.jpg"
                            }
                            className="rounded"
                            style={{ objectFit: "cover" }}
                          />
                        </td>
                        <td>{course.courseTitle || "N/A"}</td>
                        <td>
                          {course.description
                            ? truncateText(course.description, 50)
                            : "No description"}
                        </td>
                        <td>{course.categoryName || "N/A"}</td>
                        <td>{Math.floor(course.price)}$</td>
                        <td className="text-center">
                          <button
                            style={{ width: "120px" }}
                            className={`btn ${
                              course.status ? "btn-danger" : "btn-success"
                            } btn-sm`}
                            onClick={() =>
                              handleToggleCourseStatus(
                                course.courseId,
                                course.courseTitle,
                                course.status
                              )
                            }
                          >
                            {course.status ? "Deactivate" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
