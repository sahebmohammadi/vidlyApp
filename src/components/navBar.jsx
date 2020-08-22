import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
class NavBar extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="#">
            Vidly
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
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <NavLink className="nav-item  nav-link" to="/movies">
                Movies
              </NavLink>
              <NavLink className="nav-item  nav-link" to="/customers">
                Customers
              </NavLink>
              <NavLink className="nav-item  nav-link" to="/rentals">
                Rentals
              </NavLink>

              {!user && (
                <>
                  <NavLink className="nav-item  nav-link" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="nav-item  nav-link" to="/register">
                    Register
                  </NavLink>
                </>
              )}

              {user && (
                <>
                  <NavLink className="nav-item  nav-link" to="/profile">
                   {user.name}
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/logout">
                    logout
                  </NavLink>
                </>
              )}
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

export default NavBar;
