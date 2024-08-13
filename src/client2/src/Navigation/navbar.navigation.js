import React from "react";
import {Link, useMatch, useResolvedPath} from "react-router-dom";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-dark" sticky="top">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <Link classname="navbar-brand" to="/">
          MusicArchive
        </Link>
        <Link classname="navbar-brand" to="/memberInfo">
          Member Info
        </Link>
        <Link classname="navbar-brand" to="/instructure">
          Instructor
        </Link>
        <Link classname="navbar-brand" to="/memberships">
          Memberships
        </Link>
        <Link classname="navbar-brand" to="/workouts">
          Workout
        </Link>
        <Link classname="navbar-brand" to="/workout/daily">
          Regulars
        </Link>
        <Link classname="navbar-brand" to="/getStudents/">
          Attendance
        </Link>
        <Link classname="navbar-brand" to="/classInfo/">
          Session Info
        </Link>
      </div>
    </nav>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

export default Navbar;
