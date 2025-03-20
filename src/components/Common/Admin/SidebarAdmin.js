import { Link, useNavigate } from "react-router-dom";
export function SidebarAdmin() {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };
  return (
    <>
      <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a
          class="sidebar-brand d-flex align-items-center justify-content-center"
          onClick={navigateHome}
        >
          <img
            src="/img/EduQuestLogo.png"
            alt="EduQuest Logo"
            class="logo-img"
          />
          <div style={{ color: "white" }} class="mx-3">
            SB Admin 
          </div>
        </a>

        <hr class="sidebar-divider my-0"></hr>

        <li class="nav-item active">
          <a class="nav-link" onClick={navigateHome}>
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </li>

        <hr class="sidebar-divider"></hr>

        <div class="sidebar-heading">Interface</div>

        <li class="nav-item">
          <a
            class="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i class="fas fa-fw fa-cog"></i>
            <span>Account Management</span>
          </a>
          <div
            id="collapseTwo"
            class="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div class="bg-white py-2 collapse-inner rounded">
              <Link to={"/admin/student/studentList"} class="collapse-item">
                Student
              </Link>
              <Link to={"/admin/teacher/teacherList"} class="collapse-item">
                Teacher
              </Link>
              <Link to={"/admin/statistic"} class="collapse-item">
                Statistic
              </Link>
            </div>
          </div>
        </li>

        <li class="nav-item">
          <a
            class="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseUtilities"
            aria-expanded="true"
            aria-controls="collapseUtilities"
          >
            <i class="fas fa-fw fa-wrench"></i>
            <span>Courses</span>
          </a>
          <div
            id="collapseUtilities"
            class="collapse"
            aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar"
          >
            <div class="bg-white py-2 collapse-inner rounded">
              <h6 class="collapse-header">Course Management:</h6>
              <Link to={"/admin/course/courseList"} class="collapse-item">
                List courses
              </Link>
            </div>
          </div>
        </li>

        <hr class="sidebar-divider"></hr>

        <li class="nav-item">
          <Link class="nav-link" href="tables.html">
            <i class="fas fa-fw fa-table"></i>
            <span>Tables</span>
          </Link>
        </li>

        <hr class="sidebar-divider d-none d-md-block"></hr>

        <div class="text-center d-none d-md-inline">
          <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>
      </ul>
    </>
  );
}
