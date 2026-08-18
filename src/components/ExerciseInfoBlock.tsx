import type { ExerciseSet } from "../types";

type ExerciseInfoBlockProps = {
  item: Omit<ExerciseSet, "supersetGroup">;
  className: string;
};

function ExerciseInfoBlock({ item, className }: ExerciseInfoBlockProps) {
  const { name, reps, weight } = item;

  return (
    <div className={className}>
      <span>{name}</span>
      <span>{reps}</span>
      <span>{weight}</span>
    </div>
  );
}

export default ExerciseInfoBlock;
