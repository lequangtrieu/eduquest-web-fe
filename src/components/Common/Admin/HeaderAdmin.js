import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SweetAlert from "sweetalert";
export function HeaderAdmin() {
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.clear();

    await SweetAlert(
      "Đăng xuất thành công",
      `Cám ơn bạn đã có những trải nghiệm với hệ thống của chúng tôi!`,
      "success"
    );
    navigate("/");
  };

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedAvatar = localStorage.getItem("avatar");
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserId(userId);
    }

    if (storedUserName) {
      setUserName(storedUserName);
    }
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
  }, []);

  return (
    <>
      <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button
          id="sidebarToggleTop"
          class="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i class="fa fa-bars"></i>
        </button>

        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown no-arrow d-sm-none">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="searchDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-search fa-fw"></i>
            </a>

            <div
              class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
              aria-labelledby="searchDropdown"
            >
              <form class="form-inline mr-auto w-100 navbar-search">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  ></input>
                  <div class="input-group-append">
                    <button class="btn btn-primary" type="button">
                      <i class="fas fa-search fa-sm"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>

          <div class="topbar-divider d-none d-sm-block"></div>

          <li class="nav-item dropdown no-arrow">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="mr-2 d-none d-lg-inline text-gray-600 small">
                {userName}
              </span>
              <img
                class="img-profile rounded-circle"
                src={avatar || "../../img/client-Avatar/clientAvatar-1.jpg"}
                width="40"
                height="40"
                alt=""
              ></img>
            </a>
            <div
              class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <a
                class="dropdown-item"
                onClick={logout}
                data-toggle="modal"
                data-target="#logoutModal"
              >
                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
