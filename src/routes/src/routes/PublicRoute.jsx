import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../providers/AuthProvider";

function PublicRoute({ children }) {
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
      if (user.role === "user") {
        router("/", { scroll: true, replace: true });
      }
      router("/", { scroll: true, replace: true });
    }
  }, [router, user]);

  console.log("user public", user);

  return <>{!user && <div>{children}</div>}</>;
}

export default PublicRoute;
