import { useState, useEffect, useCallback } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { fetchAllWorkouts, fetchAllParams } from "../api";
import type { Workout } from "../types";

export default function Chart() {
	const [options, setOptions] = useState({});
	const [exercises, setExercises] = useState<string[]>([]);
	const [selectedExercise, setSelectedExercise] = useState<string>("");

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedExercise(e.target.value);
	};

	const extractExerciseData = useCallback(
		(workouts: Workout[], exerciseName: string) => {
			const filtered = workouts
				.map((workout) => {
					const found = workout.exercises.find(
						(ex) => ex.name === exerciseName
					);
					return found
						? {
								date: workout.date.toString().split("T")[0],
								weight: parseFloat(found.weight),
						  }
						: null;
				})
				.filter(Boolean);

			return {
				dates: filtered.map((f) => f!.date),
				weights: filtered.map((f) => f!.weight),
			};
		},
		[]
	);

	useEffect(() => {
		const loadData = async () => {
			const [workouts, params] = await Promise.all([
				fetchAllWorkouts(),
				fetchAllParams(),
			]);

			setExercises(params.exercises);

			if (!selectedExercise) return;

			const { dates, weights } = extractExerciseData(
				workouts,
				selectedExercise
			);

			setOptions({
				chart: { type: "line" },
				title: { text: "Training Progress" },
				xAxis: { categories: dates },
				yAxis: { title: { text: "Weight (kg)" } },
				series: [{ name: selectedExercise, data: weights.reverse() }],
			});
		};

		loadData();
	}, [selectedExercise, extractExerciseData]);

	return (
		<div className="p-4">
			<form className="flex justify-center mb-4">
				<select
					value={selectedExercise}
					onChange={handleSelectChange}
					className="bg-white border-2 p-2 rounded"
				>
					<option value="">Select exercise...</option>
					{exercises.map((exercise) => (
						<option key={exercise} value={exercise}>
							{exercise}
						</option>
					))}
				</select>
			</form>

			{selectedExercise && (
				<HighchartsReact highcharts={Highcharts} options={options} />
			)}
		</div>
	);
}
