import { useContext, useState } from "react";
import { FilterContext } from "../context/FilterContext";
import type { deleteParamData } from "../types";
import type { WorkoutSetPropertyType, TrainingOptionsPropertyType } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteParam } from "../api";
import TrainingOptionsList from "./TrainingOptionsList";

type ExerciseBlockProps = {
	selectedParam: string;
	trainingParamType: TrainingOptionsPropertyType;
	paramList: string[];
	handleSetParam: (type: WorkoutSetPropertyType, value: string) => void;
	openModal: () => void;
	name: WorkoutSetPropertyType;
};

export default function ExerciseBlock({
	selectedParam,
	trainingParamType,
	handleSetParam,
	paramList,
	openModal,
	name
}: ExerciseBlockProps) {
	const [isDeleting, setIsDeleting] = useState(false);

	const toggleDeleteMode = () => {
		setIsDeleting((prev) => !prev);
	}

	const {
		exerciseFilterValue,
		setExerciseFilterValue
	} = useContext(FilterContext);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (data: deleteParamData) => deleteParam(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["params"] });
		},
	});

	const filteredParamList = paramList.filter((item) =>
		item.toLowerCase().includes(exerciseFilterValue.toLowerCase())
	);

	const handleListItemClick = (item: string) => {
		if (isDeleting) {
			mutation.mutate({ type: trainingParamType, item });
		} else {
			handleSetParam(name, item);
		}
	}

	return (
		<>
			<div className="mb-md flex items-center gap-md">
				<label htmlFor="filter">Filter</label>
				<input
					type="text"
					name="filter"
					value={exerciseFilterValue}
					autoComplete="off"
					onChange={(e) => setExerciseFilterValue(e.target.value)}
				/>
			</div>
			{filteredParamList.length === 0 && (
				<p className="text-center">No exercises found</p>
			)}
			<TrainingOptionsList
				selectedParam={selectedParam}
				isDeleting={isDeleting}
				dataList={filteredParamList}
				toggleDeleteMode={toggleDeleteMode}
				handleListItemClick={handleListItemClick}
				openModal={openModal}
			/>
		</>
	);
}
