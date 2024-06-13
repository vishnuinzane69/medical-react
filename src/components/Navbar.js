import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../store/authSlice";

function Navbar() {
  var user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function logout() {
    if (user) {
      axios.post(
        "https://medicalstore.mashupstack.com/api/logout",
        {},
        {
          headers: { Authorization: "Bearer "+ user.token },
        }
      );
      dispatch(removeUser());
      navigate('/');
    }
  }
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="navbar-brand">
      <h3 class=" text-warning mr-4">MED STORE</h3>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse mr-auto"
        id="navbarNav"
        style={{ float: "left" }}
      >
        <ul className="navbar-nav ml-auto" style={{ color: "#0F1B38" }}>
          <li className="nav-item">
            <NavLink
              to={"/home"}
              className="nav-link"
              activeclassName="active"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={"/medicine"}
              className="nav-link"
              activeclassName="active"
            >
              Medicine
            </NavLink>
          </li>
          {user ? (
            <li className="nav-item">
              <NavLink
              className="nav-link"
                to={"/"}
                onClick={logout}
              >
                Logout
              </NavLink>
            </li>
          ) : (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
