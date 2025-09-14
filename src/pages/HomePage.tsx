import AddWorkoutForm from "../components/AddWorkoutForm";
import { useModal } from "../hooks/useModal";
import BaseModal from "../components/BaseModal";
import WorkoutGallery from "../components/WorkoutGallery";
import { fetchAllWorkouts } from "../api";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";

function App() {
  const { isModalOpen, openModal, closeModal } = useModal();

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
					<button
						className="bg-primary text-text-secondary py-2 px-4 w-full"
						onClick={openModal}
					>
						Add Workout
					</button>
					<BaseModal isOpen={isModalOpen} onRequestClose={closeModal}>
						<AddWorkoutForm closeModal={closeModal} />
					</BaseModal>
					<WorkoutGallery workouts={workouts} />
				</>
			)}
		</>
	);
}

export default App;