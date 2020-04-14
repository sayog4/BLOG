import Link from "next/link";
import { isAuth, signOut } from "../actions/auth";
import Router from "next/router";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">Blog</a>
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
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">Home</a>
              </Link>
            </li>
            {!isAuth() && (
              <React.Fragment>
                <li className="nav-item">
                  <Link href="/signin">
                    <a className="nav-link">Sign In</a>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link href="/signup">
                    <a className="nav-link">Sign Up</a>
                  </Link>
                </li>
              </React.Fragment>
            )}
            {isAuth() && (
              <button
                onClick={() => signOut(() => Router.replace("/signin"))}
                className="btn btn-outline-danger"
              >
                Log Out
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
