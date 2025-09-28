import { useState } from "react";
import { fetchAllParams, addWorkout } from "../api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { addWorkoutData, setType } from "../types";
import ParamBlock from "./ParamBlock";
import Loader from "./Loader";


type AddWorkoutFormProps = {
  closeModal: () => void;
}

export default function AddWorkoutForm({ closeModal }: AddWorkoutFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: addWorkoutData) => addWorkout(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    }
  });

  const {isPending, isError, isSuccess, data: params, error} = useQuery({
		queryKey: ["params"],
		queryFn: fetchAllParams,
	});

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

  const handleAddSet = () => {
		if (set.name && set.reps && set.weight) {
			setTraining((prev) => [...prev, set]);
			setSet({ name: "", reps: "", weight: "" });
		} else {
			alert("Please select all params");
		}
  }

  const handleAddTraining = async () => {
    if (!date) {
      alert("Please select a date");
      return;
    }
    mutation.mutate({ date, exercises: training });
    closeModal();
  }

  if (isPending) return <Loader />;

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

  return (
		<div>
			{isPending && <Loader />}
			{isSuccess && (
				<>
					<h3 className="text-center text-[20px] font-bold mt-sm mb-sm">
						Date
					</h3>
					<input
						type="date"
						id="date"
						className="mb-md"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
					<ParamBlock
						selectedParam={set.name}
						name="exercises"
						handleSetParam={handleSetName}
						paramList={params?.exercises}
					/>
					<ParamBlock
						selectedParam={set.reps}
						name="reps"
						handleSetParam={handleSetReps}
						paramList={params?.reps}
					/>
					<ParamBlock
						selectedParam={set.weight}
						name="weights"
						handleSetParam={handleSetWeight}
						paramList={params?.weights}
					/>

					<button
						className="btn mt-md bg-primary text-text-secondary disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
						onClick={handleAddSet}
						disabled={!set.name || !set.reps}
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
						className="block btn mt-md bg-primary text-text-secondary disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
						onClick={handleAddTraining}
						disabled={training.length === 0}
					>
						Add training
					</button>
				</>
			)}
		</div>
	);
}