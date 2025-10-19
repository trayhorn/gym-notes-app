import type { Workout, Exercise } from "../types";
import DeletePopup from "./DeletePopup";
import BaseModal from "./BaseModal";
import { useModal } from "../hooks/useModal";

type workoutCardProps = {
  workout: Workout;
}

export default function WorkoutCard({ workout }: workoutCardProps) {
	const { openModal, closeModal, isModalOpen } = useModal();

	const formattedDate = new Date(workout.date).toLocaleDateString("uk-UA");

  return (
		<>
			<div className="h-full relative p-4 bg-secondary font-roboto">
				<h2 className="text-[20px] font-bold">{formattedDate}</h2>
				{workout.exercises.map(({ name, reps, weight }: Exercise) => (
					<div key={name} className="flex gap-2 btn w-fit mt-md cursor-default">
						<span>{name}</span>
						<span>{reps}</span>
						<span>{weight}</span>
					</div>
				))}
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