import React from "react";
import { NavLink } from "react-router-dom";

const NotFoundPage = () => (
  <div className="page-not-found-container">
    <div className="page-not-found">
      404 - Hmm, sorry about that. We can&apos;t find the page you&apos;re
      looking for.
    </div>
    <NavLink className="nav__menu-logo" to="/">
      Go Home
    </NavLink>
  </div>
);

export default NotFoundPage;
