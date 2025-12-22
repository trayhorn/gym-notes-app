import WorkoutCard from "./WorkoutCard";
import type { WorkoutCardType } from "../types";

export default function WorkoutGallery({
  workouts,
}: {
  workouts: WorkoutCardType[];
}) {
  return (
    <ul className="grid gap-md [grid-template-columns:repeat(auto-fill,minmax(350px,1fr))]">
      {workouts.map((workoutCard) => (
        <li key={workoutCard._id}>
          <WorkoutCard workoutCard={workoutCard} />
        </li>
      ))}
    </ul>
  );
}