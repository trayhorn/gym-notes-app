import { CgProfile } from "react-icons/cg";
import { logoutUser } from "../api";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useState } from "react";

export default function ProfileMenu() {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext)!;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
		<div className="absolute top-2.5 right-2.5 flex flex-col gap-sm">
			<CgProfile
				size={40}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				className="self-end"
			/>
			{isMenuOpen && (
				<ul className="relative bg-white border p-2 mt-2 rounded shadow-md z-10">
					<li className="pt-sm pb-sm border-b">{user}</li>
					<li className="pt-sm pb-sm">
						<button className="w-full" onClick={handleLogout}>
							Logout
						</button>
					</li>
				</ul>
			)}
		</div>
	);
}
