import WorkoutGallery from "../components/WorkoutGallery";
import { fetchAllWorkouts } from "../api";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { Link, useLocation } from "react-router";
import NoWorkouts from "../components/NoWorkouts";

function App() {
  const {
    isPending,
    isError,
    isSuccess,
    data: workouts,
    error,
  } = useQuery({
    queryKey: ["workouts"],
    queryFn: fetchAllWorkouts,
    enabled: !!localStorage.getItem("authToken"),
  });

  const location = useLocation();

  localStorage.setItem("lastVisitedPage", location.pathname);

  return (
    <>
      {isPending && <Loader />}
      {isError && <span>Error: {error.message}</span>}
      {isSuccess && (
        <>
          <Link
            to="/add_workout"
            className="bg-primary text-text-secondary py-2 px-4 inline-block w-full text-center"
          >
            Add Workout
          </Link>
          {workouts.length > 0 ? (
            <WorkoutGallery workouts={workouts} />
          ) : (
            <NoWorkouts />
          )}
        </>
      )}
    </>
  );
}

export default App;
