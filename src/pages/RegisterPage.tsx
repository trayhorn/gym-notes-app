import AuthForm from "../components/AuthForm";
import { registerUser } from "../api";

export default function RegisterPage() {
  return (
		<>
			<AuthForm submitAction={registerUser} />
		</>
	);
}