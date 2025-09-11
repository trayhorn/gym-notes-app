import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { fetchCurrentUser } from "../api";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<string | null>(null);

	useEffect(() => {
		const handleFetchCurrentUser = async () => {
			try {
				const username = await fetchCurrentUser();
				setUser(username);
			} catch(e) {
				console.log(e);
				setUser(null);
			}
		};
		handleFetchCurrentUser();
	}, []);

	const login = (username: string) => {
		setUser(username);
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext
			value={{
				user,
				login,
				logout,
				isAuthenticated: !!user,
			}}
		>
			{children}
		</AuthContext>
	);
};