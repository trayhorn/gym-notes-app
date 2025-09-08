import WorkoutCard from "./WorkoutCard";
import type { Workout } from "../types";

type WorkoutGalleryProps = {
  workouts?: Workout[];
}

export default function WorkoutGallery({ workouts }: WorkoutGalleryProps) {
  return (
    <ul>
      {workouts?.map((workout) => (
        <li key={workout._id}>
          <WorkoutCard workout={workout} />
        </li>
      ))}
    </ul>
  );
}