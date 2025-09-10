import type { Workout, Exercise } from "../types";
import { deleteWorkout } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type workoutCardProps = {
  workout: Workout;
}

export default function WorkoutCard({ workout }: workoutCardProps) {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: ({ token, data }: { token: string; data: { id: string } }) => deleteWorkout(token, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["workouts"] });
		}
	});

	const handleWorkoutDelete = async () => {
		const token = localStorage.getItem("authToken");
		if (!token) {
			console.error("No token found");
			return;
		}
		mutation.mutate({ token, data: { id: workout._id } });
	}

  return (
		<div className="relative p-4 mb-4 bg-secondary font-roboto">
			<h2 className="text-[20px] font-bold">{workout.date.split("T")[0]}</h2>
			{workout.exercises.map(({ name, reps, weight }: Exercise) => (
				<div key={name} className="flex gap-2 btn w-fit mt-md cursor-default">
					<span>{name}</span>
					<span>{reps}</span>
					<span>{weight}</span>
				</div>
			))}
			<button className="absolute top-3 right-3" onClick={handleWorkoutDelete}>
				Delete
			</button>
		</div>
	);
}