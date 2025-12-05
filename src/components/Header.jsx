import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="navcontainer ">
      <Link className="title" to="/">
        <img
          src="public/Le_Mura_degli_Angeli__1_-removebg-preview.png"
          alt="title"
        />
      </Link>
      <nav className="navbar navbar-expand-lg bg-body-tartary">
        <div className="container-fluid">
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
            <ul
              className="navbar-nav me-auto ms-auto mb-2 mb-lg-0 fs-5 text-center  p-2 gap-5"
              id="navbarSupportedContent"
            >
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/Camere"
                >
                  Camere
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/storia"
                >
                  La nostra storia
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/contatti"
                >
                  Contattaci
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
