import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { fetchCurrentUser } from "../api";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<string | null>(null);

	useEffect(() => {
		const token = localStorage.getItem("authToken");

		try {
			if (token) {
				fetchCurrentUser(token).then(({data}) => {
					setUser(data.username);
					setToken(token);
				});
			}
		} catch (e) {
			console.log(e);
			setToken(null);
			setUser(null);
		}
	}, []);

	const login = (newToken: string, user: string) => {
		localStorage.setItem("authToken", newToken);
		setToken(newToken);
		setUser(user);
	};

	const logout = () => {
		localStorage.removeItem("authToken");
		setToken(null);
		setUser(null);
	};

	return (
		<AuthContext
			value={{
				token,
				user,
				login,
				logout,
				isAuthenticated: !!token && !!user,
			}}
		>
			{children}
		</AuthContext>
	);
};