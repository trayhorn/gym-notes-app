import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string | null>(null);

	return <AuthContext value={{ token, setToken }}>{children}</AuthContext>;
};
