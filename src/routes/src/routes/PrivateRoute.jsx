import React, { useEffect } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  const router = useNavigate();

  useEffect(() => {
    const get_user = () => {
      const storedUser = localStorage.getItem("user");
      return storedUser == "undefined" || storedUser == null
        ? null
        : JSON.parse(storedUser);
    };

    console.log("user 654546", get_user());

    const user = get_user();

    if (user) {
      if (user?.role !== "user") {
        router("/dashboard", { scroll: true, replace: true });
      } else {
        router("/", { scroll: true, replace: true });
      }
    } else {
      router("/", { scroll: true, replace: true });
    }
  }, [router, user]);

  console.log("user private", user);

  return <>{user && <div>{children}</div>}</>;
  // return <>{<div>{children}</div>}</>;
}

export default PrivateRoute;
