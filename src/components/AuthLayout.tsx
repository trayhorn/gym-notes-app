import { Outlet, NavLink } from "react-router";

export default function AuthLayout() {
  return (
    <section>
      <nav className="flex gap-sm justify-center p-md">
        <NavLink className="btn" to="/login">Login</NavLink>
        <NavLink className="btn" to="/register">Register</NavLink>
      </nav>
      <Outlet />
    </section>
  );
}