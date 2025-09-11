import { logoutUser } from "../api";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Header() {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext)!;

	const handleLogout = async () => {
		try {
			await logoutUser();
			logout();
			navigate("/login");
		} catch (e) {
			console.log(e);
		}
  };

  return (
		<header className="relative bg-accent p-4">
			<h1 className="flex-1 font-roboto text-text-primary text-3xl font-bold">
				Gym Notes
			</h1>
			<div className="absolute top-2.5 right-2.5">
				<span className="mr-md">{user}</span>
				<button className="ml-auto border-2 p-sm" onClick={handleLogout}>
					Logout
				</button>
			</div>
		</header>
	);
}