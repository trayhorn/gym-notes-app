import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { fetchCurrentUser } from "../api";
import { useQuery } from "@tanstack/react-query";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { data: username, error, isLoading } = useQuery({
		queryKey: ["currentUser"],
		queryFn: fetchCurrentUser,
		retry: false,
	});
	const [user, setUser] = useState<string | null>(null);

	useEffect(() => {
		if (username) {
			setUser(username);
		} else if (error) {
			setUser(null);
		}
	}, [username, error]);

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
				isLoading,
				isAuthenticated: !!user,
			}}
		>
			{children}
		</AuthContext>
	);
};