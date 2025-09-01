import { Outlet } from "react-router";
import Header from "./Header";

export default function SharedLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}