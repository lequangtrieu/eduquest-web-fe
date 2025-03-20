import { useEffect, useState } from "react";
import AdminLayout from "../../Common/Admin/AdminLayout";
import axios from "axios";
import Swal from "sweetalert2";

export default function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const result = await axios.get("https://localhost:7091/api/students/all");
      setStudents(result.data);
    } catch (error) {
      console.error("Error when fetching student data:", error);
      setStudents([]);
    }
  };

  const handleBanUnbanStudent = async (studentId, studentName, isBan) => {
    const action = isBan ? "unban" : "ban";
    const actionText = isBan ? "unlock" : "lock";

    Swal.fire({
      title: `Do you want to ${actionText} ${studentName}'s account?`,
      text: `Once ${actionText}ed, this account will ${
        isBan ? "be able to log in again" : "not be able to log in"
      }!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isBan ? "#28a745" : "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, ${actionText} now!`,
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            `https://localhost:7091/api/students/${action}/${studentId}`
          );
          Swal.fire(
            isBan ? "Unlocked!" : "Locked!",
            `${studentName}'s account has been ${
              isBan ? "unlocked" : "locked"
            }.`,
            "success"
          );
          fetchStudents();
        } catch (error) {
          console.error(`Error ${action}ning student:`, error);
          Swal.fire(
            "Error!",
            `Unable to ${actionText} account. Please try again!`,
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
        <h1 className="h3 mb-2 text-gray-800">Student List</h1>
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
                    <th>Account</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? (
                    students.map((student, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            style={{ marginRight: "6px" }}
                            width="40"
                            height="40"
                            alt=""
                            src={
                              student.avatar
                                ? student.avatar
                                : "../../img/client-Avatar/clientAvatar-1.jpg"
                            }
                            className="avatar-img"
                          />
                          {student.email || "N/A"}
                        </td>
                        <td style={{ color: student.isBan ? "red" : "" }}>
                          {student.isBan ? "Banned" : "Normal"}
                        </td>
                        <td>
                          <button
                            style={{ width: "120px" }}
                            className={`btn btn-sm ${
                              student.isBan ? "btn-success" : "btn-danger"
                            }`}
                            onClick={() =>
                              handleBanUnbanStudent(
                                student.id,
                                student.email,
                                student.isBan
                              )
                            }
                          >
                            {student.isBan ? "Unban" : "Ban"} Account
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center text-muted">
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
