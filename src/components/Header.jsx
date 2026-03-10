import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout, isOwner, isGuest } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navcontainer">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="title" to="/">
            <img
              src="/Le_Mura_degli_Angeli__1_-removebg-preview.png"
              alt="Le Mura degli Angeli"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse d-flex justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto ms-auto mb-lg-0 fs-5 text-center fw-bold">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/gallery">
                  Gallery
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/storia">
                  La nostra storia
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contatti">
                  Contattaci
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link nav-prenota" to="/prenota">
                  <i className="bi bi-calendar-check me-1"></i>Prenota
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav mb-lg-0 fs-5">
              {!user ? (
                <li className="nav-item">
                  <NavLink className="nav-link nav-login" to="/login">
                    <i className="bi bi-person-circle me-1"></i>Accedi
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link nav-dashboard"
                      to={isOwner ? "/dashboard" : "/ospite"}
                    >
                      <i
                        className={`bi ${isOwner ? "bi-speedometer2" : "bi-house-heart"} me-1`}
                      ></i>
                      {isOwner ? "Dashboard" : "Il mio soggiorno"}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn-logout"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-1"></i>Esci
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
