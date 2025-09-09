import ExerciseBlock from "./ExerciseBlock";
import RepsBlock from "./RepsBlock";
import WeightsBlock from "./WeightsBlock";
import { useState, useEffect } from "react";
import type { Params } from "../types";
import { fetchAllParams, addWorkout } from "../api";

type setType = {
  name: string;
  reps: string;
  weight: string;
}

type AddWorkoutFormProps = {
  closeModal: () => void;
}

export default function AddWorkoutForm({ closeModal }: AddWorkoutFormProps) {
  const [params, setParams] = useState<Params | null>(null);
  const [set, setSet] = useState<setType>({
    name: "",
    reps: "",
    weight: "",
  });

  const [training, setTraining] = useState<setType[]>([]);
  const [date, setDate] = useState<string>("");

  const handleSetName = (value: string) => {
    setSet((prev) => ({ ...prev, name: value }));
  }

  const handleSetReps = (value: string) => {
    setSet((prev) => ({ ...prev, reps: value }));
  }

  const handleSetWeight = (value: string) => {
    setSet((prev) => ({ ...prev, weight: value }));
  }

  const handleAddParam = (param: Params) => {
    setParams(param);
  };

  const handleAddSet = () => {
    setTraining((prev) => ([...prev, set]));
    setSet({ name: "", reps: "", weight: "" });
  }

  const handleAddTraining = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      if (!date) {
        alert("Please select a date");
        return;
      }
      try {
        await addWorkout(token, {
          date,
          exercises: training,
        });
        closeModal();
      } catch (e) {
        console.log(e);
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchAllParams(token)
        .then(({ data: {params} }) => {
          setParams(params[0]);
        })
				.catch((e) => console.log(e));
    }
  }, []);

  if(!params) {
    return <div>Loading...</div>;
  }

  return (
		<div>
			<h3 className="text-center text-[20px] font-bold mt-sm mb-sm">Date</h3>
			<input
				type="date"
				id="date"
				className="mb-md"
				value={date}
				onChange={(e) => setDate(e.target.value)}
			/>
			<ExerciseBlock
				handleAddParam={handleAddParam}
				handleSetName={handleSetName}
				exercises={params?.exercises}
			/>
			<RepsBlock
				handleAddParam={handleAddParam}
				handleSetReps={handleSetReps}
				reps={params?.reps}
			/>
			<WeightsBlock
				handleAddParam={handleAddParam}
				handleSetWeight={handleSetWeight}
				weights={params?.weights}
			/>
			<button
				className="btn mt-md bg-primary text-text-secondary"
				onClick={handleAddSet}
			>
				Add Set
			</button>

			{/* Displaying sets */}

			{training.length > 0 && (
				<ul className="mt-md">
					{training.map(({ name, reps, weight }) => (
						<li
							key={name}
							className="mb-sm flex gap-2 btn w-fit mt-md cursor-default"
						>
							<span>{name}</span>
							<span>{reps}</span>
							<span>{weight}</span>
						</li>
					))}
				</ul>
			)}

			<button
				className="block btn mt-md bg-primary text-text-secondary"
        onClick={handleAddTraining}
        disabled={training.length === 0}
			>
				Add training
			</button>
		</div>
	);
}