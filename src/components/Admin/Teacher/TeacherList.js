import { useEffect, useState } from "react";
import AdminLayout from "../../Common/Admin/AdminLayout";
import axios from "axios";
import Swal from "sweetalert2";

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      // const result = await axios.get("https://localhost:7091/api/teachers/all");
      const result = await axios.get("https://eduquest-web-bqcrf6dpejacgnga.southeastasia-01.azurewebsites.net/api/teachers/all");
      setTeachers(result.data);
    } catch (error) {
      console.error("Error when fetching teacher data:", error);
      setTeachers([]);
    }
  };

  const handleToggleBanTeacher = async (teacherId, teacherName, isBanned) => {
    const action = isBanned ? "unban" : "ban";
    const apiUrl = `https://eduquest-web-bqcrf6dpejacgnga.southeastasia-01.azurewebsites.net/api/teachers/${
      isBanned ? "unban" : "ban"
    }/${teacherId}`;

    // const apiUrl = `"https://localhost:7091/api/teachers/${
    //   isBanned ? "unban" : "ban"
    // }/${teacherId}`;

    Swal.fire({
      title: `Do you want to ${action.toLowerCase()} the account of ${teacherName}?`,
      text: isBanned
        ? "The account will be reactivated and can log in again."
        : "Once locked, this account will not be able to log in!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isBanned ? "#28a745" : "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, ${action.toLowerCase()} now!`,
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("authToken");
          await axios.put(
            apiUrl,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );

          Swal.fire(
            `${action}ned!`,
            `The account of ${teacherName} has been ${action.toLowerCase()}ned.`,
            "success"
          );
          fetchTeachers();
        } catch (error) {
          console.error(`Error ${action.toLowerCase()}ning teacher:`, error);
          Swal.fire(
            "Error!",
            `Unable to ${action.toLowerCase()} account. Please try again!`,
            "error"
          );
        }
      }
    });
  };

  return (
    <AdminLayout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>
      <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Teacher List</h1>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Account Management
            </h6>
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
                    <th>Avatar</th> {/* Cột ảnh */}
                    <th>Account</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.length > 0 ? (
                    teachers.map((teacher, index) => (
                      <tr key={index}>
                        {/* Cột ảnh */}
                        <td>
                          <img
                            style={{
                              marginRight: "6px",
                              objectFit: "cover",  // Đảm bảo ảnh luôn đầy đủ mà không bị méo
                              borderRadius: "50%"  // Để tạo ảnh tròn
                            }}
                            width="40"
                            height="40"
                            alt={teacher.email || "Teacher Avatar"}
                            src={
                              teacher.avatar && teacher.avatar !== ""
                                ? teacher.avatar
                                : "../../img/client-Avatar/clientAvatar-1.jpg" // Đảm bảo ảnh mặc định có thể truy cập
                            }
                            className="avatar-img"
                          />
                        </td>

                        {/* Cột email */}
                        <td>{teacher.email || "N/A"}</td>

                        {/* Cột trạng thái */}
                        <td style={{ color: teacher.isBan ? "red" : "" }}>
                          {teacher.isBan ? "Banned" : "Normal"}
                        </td>

                        {/* Cột hành động */}
                        <td>
                          <button
                            style={{ width: "120px" }}
                            className={`btn btn-sm ${teacher.isBan ? "btn-success" : "btn-danger"}`}
                            onClick={() =>
                              handleToggleBanTeacher(teacher.id, teacher.email, teacher.isBan)
                            }
                          >
                            {teacher.isBan ? "Unban" : "Ban"} Account
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center text-muted">
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
