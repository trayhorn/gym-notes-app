import { logoutUser } from "../api";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Header() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AuthContext)!;

  const handleLogout = async () => {
    if(token) await logoutUser(token);
    setToken(null);
    navigate("/login");
  };

  return (
		<header className="flex justify-center items-center bg-accent p-4">
			<h1 className="flex-1 font-roboto text-text-primary text-3xl font-bold">
				Gym Notes
			</h1>
			<button className="ml-auto border-2 p-sm" onClick={handleLogout}>
				Logout
			</button>
		</header>
	);
}