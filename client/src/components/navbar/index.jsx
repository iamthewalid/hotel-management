import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHamburger } from 'react-icons/fa';
import { useUser } from '../../store';
import './navbar.css';

const Navbar = () => {
  const [user, setUser] = useUser((state) => [state.user, state.setUser]);
  const navigate = useNavigate();

  function handleLogout() {
    setUser(null);
    navigate('/home');
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to={'/home'} className="navbar-brand font-weight-bold">
          HOTELROOMS
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaHamburger className="text-white" />
        </button>

        <div
          className="ml-auto collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            {user ? (
              <>
                <div className="dropdown">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {user?.name}
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link to={'/profile'} className="dropdown-item">
                      Profile
                    </Link>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Log out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
