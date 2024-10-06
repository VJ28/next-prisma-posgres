import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  let left = (
    <div className="left">
      <span className="app-name">My App</span>
      <style jsx>{`
        .app-name {
          font-size: 1.5rem;
          font-weight: bold;
          color: #1f2937; /* Gray-800 */
        }
      `}</style>
    </div>
  );

  let right = isAuthenticated ? (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  ) : router.pathname.indexOf("login") < 0 ? (
    <Link href="/login">
      <a className="nav-link">Login</a>
    </Link>
  ) : (
    <Link href="/onboard">
      <a className="nav-link">Sign Up</a>
    </Link>
  );

  return (
    <nav className="navbar">
      {left}
      <div className="right">{right}</div>
      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between; /* Space between left and right sections */
          padding: 1.5rem 2rem;
          align-items: center;
          background-color: #ffffff; /* White background */
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
        }

        .right {
          display: flex;
          align-items: center;
        }

        .nav-link {
          margin-left: 1rem;
          padding: 0.5rem 1rem;
          color: #1f2937; /* Gray-800 */
          font-weight: medium;
          border: 2px solid transparent; /* For hover effect */
          border-radius: 0.25rem; /* Rounded corners */
          transition: background-color 0.3s, color 0.3s; /* Smooth transition */
        }

        .nav-link:hover {
          background-color: #f3f4f6; /* Gray-100 */
          color: #1f2937; /* Gray-800 */
        }

        .logout-button {
          background-color: #e63946; /* Red color */
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s; /* Smooth transition */
        }

        .logout-button:hover {
          background-color: #d62839; /* Darker red */
        }
      `}</style>
    </nav>
  );
};

export default Header;
