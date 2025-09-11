import AddWorkoutForm from "../components/AddWorkoutForm";
import { useModal } from "../hooks/useModal";
import BaseModal from "../components/BaseModal";
import WorkoutGallery from "../components/WorkoutGallery";
import { fetchAllWorkouts } from "../api";
import { useQuery } from "@tanstack/react-query";

function App() {
  const { isModalOpen, openModal, closeModal } = useModal();

  const {
		isPending,
		isError,
		data: workouts,
		error,
	} = useQuery({
		queryKey: ["workouts"],
		queryFn: handleFetchWorkouts,
		enabled: !!localStorage.getItem("authToken"),
	});

  async function handleFetchWorkouts() {
    const token = localStorage.getItem("authToken");
    if(!token) return [];
    try {
      const { data: { workouts } } = await fetchAllWorkouts();
      return workouts;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  if (isPending) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

  return (
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
	);
}

export default App;