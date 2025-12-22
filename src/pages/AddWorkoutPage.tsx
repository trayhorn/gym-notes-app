import { useState, useEffect } from "react";
import { fetchAllParams, addWorkout } from "../api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { addWorkoutData, WorkoutSetType, WorkoutSetPropertyType } from "../types";
import ParamBlock from "../components/ParamBlock";
import Loader from "../components/Loader";
import { FilterContext } from "../context/FilterContext";
import { Link } from "react-router";
import { useNavigate, useLocation } from "react-router";
import SetList from "../components/SetList";


export default function AddWorkoutPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [exerciseFilterValue, setExerciseFilterValue] = useState("");
	const [date, setDate] = useState<string>("");
	const [set, setSet] = useState<WorkoutSetType>({
		name: "",
		reps: "",
		weight: "",
	});
	const [training, setTraining] = useState<WorkoutSetType[]>(() => {
		const savedTraining = localStorage.getItem("training");
		return savedTraining ? JSON.parse(savedTraining) : [];
	});

	localStorage.setItem("lastVisitedPage", location.pathname);

	const mutation = useMutation({
		mutationFn: (data: addWorkoutData) => addWorkout(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["workouts"] });
		},
	});

	const {
    isPending,
    isError,
    isSuccess,
    data: params,
    error,
  } = useQuery({
    queryKey: ["params"],
    queryFn: fetchAllParams,
  });

	const handleSetProperty = (type: WorkoutSetPropertyType, value: string) => {
		setSet((prev) => {
      return prev[type] === value
        ? { ...prev, [type]: "" }
        : { ...prev, [type]: value };
    });
	}

	const handleAddSet = () => {
		if (set.name && set.reps && set.weight) {
			setTraining((prev) => [...prev, set]);
			localStorage.setItem("training", JSON.stringify(training));
			setSet({ name: "", reps: "", weight: "" });
			setExerciseFilterValue("");
		} else {
			alert("Please select all params");
		}
	};

	const handleAddSuperset = (exercise: WorkoutSetType, supersetId: string) => {
		setTraining(prev =>
			prev.map(el =>
				el.name === exercise.name
					? { ...el, supersetGroup: supersetId }
					: el
			)
		);
	};

	const handleAddTraining = async () => {
		if (!date) {
			alert("Please select a date");
			return;
		}
		mutation.mutate({ date, exercises: training });
		localStorage.removeItem("training");
		navigate("/");
	};

	const handleClearTraining = () => {
		setTraining([]);
		localStorage.removeItem("training");
	}

	useEffect(() => {
		localStorage.setItem("training", JSON.stringify(training));
	}, [training]);

	if (isPending) return <Loader />;

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	return (
		<>
			<Link
				to="/"
				className="bg-primary text-text-secondary py-2 px-4 inline-block w-full text-center"
			>
				Back
			</Link>

			<div className="xl:pr-28 xl:pl-28 p-lg pt-0">
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
						<FilterContext
							value={{ exerciseFilterValue, setExerciseFilterValue }}
						>
							<ParamBlock
								selectedParam={set.name}
								paramBlockType="exercisesBlock"
								name="name"
								handleSetParam={handleSetProperty}
								paramList={params?.exercises}
							/>
						</FilterContext>
						<ParamBlock
							selectedParam={set.reps}
							paramBlockType="repsBlock"
							name="reps"
							handleSetParam={handleSetProperty}
							paramList={params?.reps}
						/>
						<ParamBlock
							selectedParam={set.weight}
							paramBlockType="weightsBlock"
							name="weight"
							handleSetParam={handleSetProperty}
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
							<SetList training={training} handleAddSuperset={handleAddSuperset} />
						)}

						<div>
							<button
								className="btn mt-md mr-sm bg-primary text-text-secondary disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
								onClick={handleAddTraining}
								disabled={training.length === 0}
							>
								Add training
							</button>
							{training.length > 0 && (
								<button
									className="btn mt-md bg-primary text-text-secondary disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
									onClick={handleClearTraining}
								>
									Clear
								</button>
							)}
						</div>
					</>
				)}
			</div>
		</>
	);
}