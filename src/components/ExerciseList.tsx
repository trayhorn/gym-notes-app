import ExerciseInfoBlock from "./ExerciseInfoBlock";
import type { ExerciseSet } from "../types";

type ExerciseListProps = {
  groupedExercises: (
    | ExerciseSet
    | {
        supersetGroup: string;
        items: ExerciseSet[];
      }
  )[];
  singleElementClass: string;
  superSetElementClass: string;
};

function ExerciseList({
  groupedExercises,
  singleElementClass,
  superSetElementClass,
}: ExerciseListProps) {
  return (
    <>
      {groupedExercises.map((item, idx) => {
        if ("items" in item) {
          return (
            <div key={idx} className="superset flex flex-col mt-lg w-max">
              {item.items.map((ex, i) => (
                <ExerciseInfoBlock
                  key={i}
                  className={superSetElementClass}
                  item={ex}
                />
              ))}
            </div>
          );
        } else {
          return (
            <ExerciseInfoBlock
              key={idx}
              item={item}
              className={singleElementClass}
            />
          );
        }
      })}
    </>
  );
}

export default ExerciseList;
