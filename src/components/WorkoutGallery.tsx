import WorkoutCard from "./WorkoutCard";
import type { WorkoutCardType } from "../types";

type WorkoutGalleryProps = {
  workouts: WorkoutCardType[];
};

export default function WorkoutGallery({ workouts }: WorkoutGalleryProps) {
  return (
    <ul className="grid gap-md [grid-template-columns:repeat(auto-fill,minmax(350px,1fr))]">
      {workouts.map(workoutCard => (
        <WorkoutCard key={workoutCard._id} workoutCard={workoutCard} />
      ))}
    </ul>
  );
}
