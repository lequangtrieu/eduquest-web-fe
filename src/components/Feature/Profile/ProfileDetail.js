import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../../public/assets/css/profile.css";
import PageLayout from "../../Common/Page/PageLayout";
import { storage } from "../../../config/firebaseConfig";
import SweetAlert from "sweetalert";
import Swal from "sweetalert2";
import CertificateLayout from "../Certificate/CertificateLayout";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FaCamera } from "react-icons/fa";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const ProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("courses"); // Tab mặc định
  const [role, setRole] = useState("");
  const [downloadURL, setDownloadURL] = useState("");
  const MySwal = withReactContent(Swal);

  const handleViewCertificate = (certificate) => {
    MySwal.fire({
      title: "",
      html: <CertificateLayout certificate={certificate} />,
      showConfirmButton: false,
      width: "auto",
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    uploadFile(file);
  };

  const fetchCourses = async () => {
    try {
      // const response = await axios.get(`http://localhost:5065/api/Courses?$filter=teacherId eq '${id}'`);
      const response = await axios.get(`https://eduquest-web-bqcrf6dpejacgnga.southeastasia-01.azurewebsites.net/api/Courses?$filter=teacherId eq '${id}'`);
      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveCourse = async (index) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "This course will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://eduquest-web-bqcrf6dpejacgnga.southeastasia-01.azurewebsites.net/api/Course/${index}`);
          Swal.fire("Deleted!", "Course deleted successfully.", "success");
          fetchCourses();
        } catch (error) {
          console.log(error);
          Swal.fire("Error!", "An error occurred while deleting the course.", "error");
        }
      }
    });
  };

  const uploadFile = (file) => {
    const storageRef = ref(storage, `profile-images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        console.error("Upload failed:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadURL(downloadURL);
        setProfile((prevProfile) => ({
          ...prevProfile,
          profilePicture: downloadURL,
        }));

        try {
          const response = await fetch(
            "https://eduquest-web-bqcrf6dpejacgnga.southeastasia-01.azurewebsites.net/api/Auth/profile",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                AccountId: id,
                avatar: downloadURL,
              }),
            }
          );

          localStorage.setItem("avatar", downloadURL);

          if (!response.ok) {
            throw new Error("Failed to update avatar");
          }

          window.dispatchEvent(new Event("avatarUpdated"));

          setTimeout(() => {
            SweetAlert(
              "Updating avatar successfully!",
              "Your avatar has been updated.",
              "success"
            );
          }, 500);
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      }
    );
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      setRole(role);
    }
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://eduquest-web-bqcrf6dpejacgnga.southeastasia-01.azurewebsites.net/api/Auth/profile/${id}`
        );
        const data = await response.json();
        if (!data.certificates || data.certificates.length === 0) {
          data.certificates = [
            {
              studentName: "Lê Quang Triêu",
              courseName: "React Fundamentals",
              instructorName: "John Can",
              completionDate: "2024/03/07",
            },
            {
              studentName: "Lê Quang Triêu",
              courseName: "Advanced Node.js",
              instructorName: "Jane Smith",
              completionDate: "2024/02/20",
            },
            {
              studentName: "Lê Quang Triêu",
              courseName: "Full-Stack Web Development",
              instructorName: "Michael Johnson",
              completionDate: "2024/01/15",
            },
            {
              studentName: "Lê Quang Triêu",
              courseName: "Blockchain and Cryptocurrency",
              instructorName: "David Kim",
              completionDate: "2023/08/25",
            },
          ];
        }
        setProfile(data);
        fetchCourses();
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <div className="profile-container">Loading...</div>;
  if (!profile)
    return <div className="profile-container">Profile not found</div>;

  return (
    <PageLayout>
      <div className="profile-container">
        {/* Cover Photo */}
        <div className="cover-photo">
          <div className="cover-overlay"></div>
          <img
            src={
              downloadURL ||
              profile.avatar ||
              "../img/client-Avatar/clientAvatar-1.jpg"
            }
            alt="Profile"
            className="profile-avatar"
            onClick={() => document.getElementById("fileInput").click()}
          />
          <label htmlFor="fileInput" className="profile-avatar-upload">
            <FaCamera className="camera-icon" />
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <div className="profile-details">
          <h1 className="profile-name">{profile.name}</h1>
          <div className="profile-info">
            <p>Email: {profile.email || "Not provided"}</p>
            <p>Phone: {profile.phone || "Not provided"}</p>
            <p>{profile.bio || "No bio available"}</p>
          </div>

          {/* Hiển thị nút "Create Course" nếu là giáo viên */}
          {role === "Teacher" && (
            <button
              className="btn-create-course"
              onClick={() => navigate("/course/create")}
            >
              Create Course
            </button>
          )}
        </div>

        {(role === "Teacher" && courses.length > 0) && (
          <div className="profile-tabs">
            <div className="courses-teacher table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Course Image</th>
                        <th>Course Title</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course, index) => (
                        <tr key={index}>
                          <td><img className="course-image" src={course.imageURL} alt={course.courseTitle}/></td>
                          <td>
                          {course.courseTitle}
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn-remove"
                                onClick={() => handleRemoveCourse(course.courseId)}
                              >
                                <i className="fas fa-trash"></i> Remove
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
          </div>
        )}

        {/* Nếu role là "student", hiển thị tabs */}
        {role === "Student" ||
          (role === "VIP Student" && (
            <>
              {/* Navigation Tabs */}
              <div className="profile-tabs">
                <div
                  className={`profile-tab ${
                    activeTab === "courses" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("courses")}
                >
                  Courses Enrolled
                </div>
                <div
                  className={`profile-tab ${
                    activeTab === "certificates" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("certificates")}
                >
                  Certificates
                </div>
              </div>

              {/* Tab Content */}
              <div className="profile-content">
                {activeTab === "certificates" && (
                  <div className="certificates-container">
                    <h3>📜 Certificates</h3>
                    {profile.certificates && profile.certificates.length > 0 ? (
                      profile.certificates.map((certificate, index) => (
                        <div key={index} className="certificate-card">
                          <div className="certificate-info">
                            <p
                              style={{ marginBottom: "4px" }}
                              className="certificate-title"
                            >
                              📜 {certificate.courseName}
                            </p>
                            <p
                              style={{ marginBottom: "4px" }}
                              className="certificate-instructor"
                            >
                              👨‍🏫 {certificate.instructorName}
                            </p>
                            <p
                              style={{ marginBottom: "4px" }}
                              className="certificate-date"
                            >
                              📅 {certificate.completionDate}
                            </p>
                          </div>
                          {/* <button
                          style={{
                            marginTop: "4px",
                            padding: "8px",
                            fontSize: "16px",
                            backgroundColor: "#1c5d99",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            borderRadius: "5px",
                            fontWeight: "bold",
                          }}
                          onClick={() =>
                            navigate("/certificate", {
                              state: {
                                studentName: certificate.studentName,
                                courseName: certificate.courseName,
                                instructorName: certificate.instructorName,
                                completionDate: certificate.completionDate,
                              },
                            })
                          }
                        >
                          View
                        </button> */}

                          <button
                            style={{
                              marginTop: "4px",
                              padding: "8px",
                              fontSize: "16px",
                              backgroundColor: "#1c5d99",
                              color: "white",
                              border: "none",
                              cursor: "pointer",
                              borderRadius: "5px",
                              fontWeight: "bold",
                            }}
                            onClick={() => handleViewCertificate(certificate)}
                          >
                            View
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="no-certificates">
                        No certificates available
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "courses" && (
                  <div>
                    <h3>📚 Enrolled Courses</h3>
                    <ul>
                      {profile.courses && profile.courses.length > 0 ? (
                        profile.courses.map((course, index) => (
                          <li key={index}>{course}</li>
                        ))
                      ) : (
                        <p>No courses enrolled</p>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </>
          ))}
      </div>
    </PageLayout>
  );
};

export default ProfileDetail;
