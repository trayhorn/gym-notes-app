import Chart from "../components/Chart";
import { useLocation } from "react-router";

export default function AnalyticsPage() {
  const location = useLocation();

  localStorage.setItem("lastVisitedPage", location.pathname);

  return (
    <div className="p-4">
      <Chart />
    </div>
  );
}