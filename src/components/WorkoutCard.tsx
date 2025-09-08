import type { Workout, Exercise } from "../types";

type workoutCardProps = {
  workout: Workout;
}

export default function WorkoutCard({ workout }: workoutCardProps) {
  return (
		<div className="p-4 mb-4 bg-secondary font-roboto">
			<h2 className="text-[20px] font-bold">{workout.date.split("T")[0]}</h2>
			{workout.exercises.map(({ name, reps, weight }: Exercise) => (
				<div key={name} className="flex gap-2 btn w-fit mt-md cursor-default">
					<span>{name}</span>
					<span>{reps}</span>
					<span>{weight}</span>
				</div>
			))}
		</div>
	);
}