import type { Workout } from "../types";
import DeletePopup from "./DeletePopup";
import BaseModal from "./BaseModal";
import { useModal } from "../hooks/useModal";
import { groupExercises } from "../utils/groupExercises";

type workoutCardProps = {
  workout: Workout;
}


export default function WorkoutCard({ workout }: workoutCardProps) {
	const { openModal, closeModal, isModalOpen } = useModal();
	const formattedDate = new Date(workout.date).toLocaleDateString("uk-UA");
	const groupedExercises = groupExercises(workout.exercises);

  return (
		<>
			<div className="h-full relative p-4 bg-secondary font-roboto">
				<h2 className="text-[20px] font-bold">{formattedDate}</h2>
				{groupedExercises.map((item, idx) => {
          if ("items" in item) {
            return (
              <div key={idx} className="superset flex flex-col mt-lg w-max">
                {item.items.map((ex, i) => (
                  <div key={i} className="font-roboto text-text-primary font-bold p-sm bg-accent cursor-default">
                    <span>{ex.name}</span>
                    <span>{ex.reps}</span>
                    <span>{ex.weight}</span>
                  </div>
                ))}
              </div>
            );
          } else {
            return (
              <div key={idx} className="flex gap-2 btn w-fit mt-md cursor-default">
                <span>{item.name}</span>
                <span>{item.reps}</span>
                <span>{item.weight}</span>
              </div>
            );
          }
        })}
				<button className="absolute top-3 right-3" onClick={openModal}>
					Delete
				</button>
			</div>
			<BaseModal isOpen={isModalOpen} onRequestClose={closeModal}>
				<DeletePopup closeModal={closeModal} workoutId={workout._id} />
			</BaseModal>
		</>
	);
}