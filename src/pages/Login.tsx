import { LoginForm } from "../components/LoginForm/LoginForm";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext/useAuth";
import { useEffect } from "react";

export const Login = () => {
  const { isLogged } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      return navigate("/");
    }
  }, [isLogged, navigate]);

  return (
    <main
      className="flex flex-col w-full items-center justify-center"
      style={{ gap: 16 }}
    >
      <img
        src={logo}
        alt="Logo"
        className="filter-invert"
        style={{ width: "200px" }}
      />
      <LoginForm />
    </main>
  );
};
