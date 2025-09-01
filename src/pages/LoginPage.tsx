import AuthForm from "../components/AuthForm";
import { loginUser } from "../api";

export default function LoginPage() {
  return (
    <>
      <AuthForm submitAction={loginUser} />
    </>
  );
}