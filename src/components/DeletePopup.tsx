import { deleteWorkout } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeletePopupProps = {
  closeModal: () => void;
  workoutId: string;
};

export default function DeletePopup({ closeModal, workoutId }: DeletePopupProps) {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: (data: { id: string }) => deleteWorkout(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["workouts"] });
		},
		onError: (error) => {
			alert("Error deleting workout:" + error);
		},
	});

	const handleWorkoutDelete = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) {
			console.error("No token found");
			return;
		}
		mutation.mutate({ id: workoutId });
	};

	return (
		<div className="flex flex-col gap-4">
			<h2>Are you sure you want to delete this workout?</h2>
			<div className="flex justify-center gap-4">
				<button className="btn bg-error" onClick={handleWorkoutDelete}>
					Delete
				</button>
				<button className="btn" onClick={closeModal}>
					Cancel
				</button>
			</div>
		</div>
	);
}
