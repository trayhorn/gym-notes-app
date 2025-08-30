import ExerciseBlock from "./ExerciseBlock";
import RepsBlock from "./RepsBlock";
import WeightsBlock from "./WeightsBlock";

export default function AddWorkoutForm() {
  return (
    <div>
      <h3 className="text-center text-[20px] font-bold mt-sm mb-sm">Date</h3>
      <input type="date" id="date" className="mb-md" />
      <ExerciseBlock />
      <RepsBlock />
      <WeightsBlock />
    </div>
	);
}