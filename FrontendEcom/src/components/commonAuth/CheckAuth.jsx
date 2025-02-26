

import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // console.log(isAuthenticated, user, children);

  if (location.pathname === "/") {
    // console.log("1");

    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.data?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/" />;
      }
    }
  }

  if (!isAuthenticated && (
    location.pathname.includes("/wishlists") ||
    location.pathname.includes("/addtocarts") ||
    location.pathname.includes("/orders")
  )) {
    return <Navigate to="/" />;
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    // console.log("2");
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    // console.log("3");
    if (user?.data?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    }
  }

  if (
    isAuthenticated &&
    user?.data?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    // console.log("4");
    return <Navigate to="/" />;
  }

  if (isAuthenticated && user?.data?.role !== "user" && location.pathname.includes("/auth")) {
    return <Navigate to="/" />;
  }

  // console.log("chilren", children);

  return <>{children}</>;
}

export default CheckAuth;
