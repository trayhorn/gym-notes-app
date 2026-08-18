import { useRef, useMemo } from "react";
import type { ExerciseSet } from "../types";
import { groupExercises } from "../utils/groupExercises";
import { useSuperset } from "../hooks/useSuperset";
import ExerciseList from "./ExerciseList";

type SetListProps = {
  training: ExerciseSet[];
  handleAddSuperset: (exercise: ExerciseSet, supersetId: string) => void;
};

export default function SetList({ training, handleAddSuperset }: SetListProps) {
  const ulElRef = useRef<HTMLUListElement>(null);
  const btnElRef = useRef<HTMLLIElement>(null);
  const startYRef = useRef<number>(0);
  const initialTopRef = useRef<number>(0);
  const transformTopRef = useRef<number>(0);

  const {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    isDragging,
    toggleDragging,
  } = useSuperset(
    ulElRef,
    btnElRef,
    startYRef,
    initialTopRef,
    transformTopRef,
    training,
    handleAddSuperset
  );

  const groupedTraining = useMemo(() => groupExercises(training), [training]);

  return (
    <div>
      <button
        onClick={toggleDragging}
        className="btn mt-md mr-sm bg-primary text-text-secondary"
      >
        Superset
      </button>
      <ul
        className={`relative mt-md ${isDragging ? "touch-none" : ""}`}
        ref={ulElRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <ExerciseList
          groupedExercises={groupedTraining}
          superSetElementClass={`${isDragging ? "outline-2 outline-dashed outline-primary" : ""} dragTarget flex gap-2 font-roboto text-text-primary font-bold p-sm bg-accent cursor-default`}
          singleElementClass={`${isDragging ? `outline-2 outline-dashed outline-primary` : ""} dragTarget mb-sm flex gap-2 btn w-fit mt-md cursor-default`}
        />
      </ul>
    </div>
  );
}
