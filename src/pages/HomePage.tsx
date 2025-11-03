import WorkoutGallery from "../components/WorkoutGallery";
import { fetchAllWorkouts } from "../api";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { Link, useLocation } from "react-router";

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

	if (isPending) return <Loader />;

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	return (
		<>
			{isPending && <Loader />}
			{isError && <span>Something went wrong</span>}
			{isSuccess && (
				<>
					<Link
						to="/add_workout"
						className="bg-primary text-text-secondary py-2 px-4 inline-block w-full text-center"
					>
						Add Workout
					</Link>
					<WorkoutGallery workouts={workouts} />
				</>
			)}
		</>
	);
}

export default App;
