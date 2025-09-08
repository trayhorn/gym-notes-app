import AddWorkoutForm from "../components/AddWorkoutForm";
import { useModal } from "../hooks/useModal";
import BaseModal from "../components/BaseModal";
import WorkoutGallery from "../components/WorkoutGallery";
import { useEffect, useState } from "react";
import { fetchAllWorkouts } from "../api";
import type { Workout } from "../types";

function App() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const handleFetchWorkout = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const { data: { workouts } } = await fetchAllWorkouts(token);
          setWorkouts(workouts);
        } catch (e) {
          console.log(e);
        }
      }
    }

    handleFetchWorkout();
  }, []);

  return (
		<>
			<button
				className="bg-primary text-text-secondary py-2 px-4 w-full"
				onClick={openModal}
			>
				Add Workout
			</button>
			<BaseModal isOpen={isModalOpen} onRequestClose={closeModal}>
				<AddWorkoutForm />
			</BaseModal>
			<WorkoutGallery workouts={workouts} />
		</>
	);
}

export default App;