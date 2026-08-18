import type { WorkoutCardType } from "../types";
import DeletePopup from "./DeletePopup";
import BaseModal from "./BaseModal";
import { useModal } from "../hooks/useModal";
import { groupExercises } from "../utils/groupExercises";
import ExerciseList from "./ExerciseList";
import { useMemo } from "react";

type WorkoutCardProps = {
  workoutCard: WorkoutCardType;
};

export default function WorkoutCard({ workoutCard }: WorkoutCardProps) {
  const { openModal, closeModal, isModalOpen } = useModal();
  const formattedDate = new Date(workoutCard.date).toLocaleDateString("uk-UA");
  const groupedTraining = useMemo(
    () => groupExercises(workoutCard.exercises),
    []
  );

  return (
    <li>
      <div className="h-full relative p-4 bg-secondary font-roboto">
        <h2 className="text-[20px] font-bold">{formattedDate}</h2>
        <ExerciseList
          groupedExercises={groupedTraining}
          superSetElementClass="flex gap-2 font-roboto text-text-primary font-bold p-sm bg-accent cursor-default"
          singleElementClass="flex gap-2 btn w-fit mt-md cursor-default"
        />
        <button className="absolute top-3 right-3" onClick={openModal}>
          Delete
        </button>
      </div>
      <BaseModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <DeletePopup closeModal={closeModal} workoutId={workoutCard._id} />
      </BaseModal>
    </li>
  );
}
