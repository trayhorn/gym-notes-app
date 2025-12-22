import { useRef, useMemo } from "react";
import type { WorkoutSetType } from "../types";
import { groupExercises } from "../utils/groupExercises";
import { useSuperset } from "../hooks/useSuperset";


type SetListProps = {
    training: WorkoutSetType[];
    handleAddSuperset: (exercise: WorkoutSetType, supersetId: string) => void;
};

export default function SetList({training, handleAddSuperset}: SetListProps) {
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
      toggleDragging
    } = useSuperset(
      ulElRef,
      btnElRef,
      startYRef,
      initialTopRef,
      transformTopRef,
      training,
      handleAddSuperset
    );

    const groupedTraining = useMemo(() => {
        console.log("Calculating grouped training");
        return groupExercises(training);
    }, [training]);


    return (
        <div>
            <button onClick={toggleDragging} className="btn mt-md mr-sm bg-primary text-text-secondary">Superset</button>
            <ul
                className={`relative mt-md ${isDragging ? "touch-none" : ""}`}
                ref={ulElRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            >
                {groupedTraining.map((item, idx) => {
                    if ("items" in item) {
                        return (
                        <div key={idx} className="superset flex flex-col mt-lg w-max">
                            {item.items.map((ex, i) => (
                            <li key={i} className={`${isDragging ? "outline-2 outline-dashed outline-primary" : ""} dragTarget flex gap-2 font-roboto text-text-primary font-bold p-sm bg-accent cursor-default`}
>
                                <span>{ex.name}</span>
                                <span>{ex.reps}</span>
                                <span>{ex.weight}</span>
                            </li>
                            ))}
                        </div>
                        );
                    } else {
                        return (
                        <li key={idx} className={`${isDragging ? `outline-2 outline-dashed outline-primary` : ""} dragTarget mb-sm flex gap-2 btn w-fit mt-md cursor-default`}
>
                            <span>{item.name}</span>
                            <span>{item.reps}</span>
                            <span>{item.weight}</span>
                        </li>
                        );
                    }
                })}
            </ul>
        </div>
    )
}