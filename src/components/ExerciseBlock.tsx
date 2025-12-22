import { FaPlus, FaMinus, FaCheck } from "react-icons/fa";
import { useContext, useState } from "react";
import { FilterContext } from "../context/FilterContext";
import type { deleteParamData } from "../types";
import type { WorkoutSetPropertyType, TrainingOptionsPropertyType } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteParam } from "../api";

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
			<ul className="blockList">
				{filteredParamList.map((item: string) => (
					<li key={item}>
						<button
							className={`btn ${selectedParam === item ? "selected" : ""}`}
							onClick={() => handleListItemClick(item)}
						>
							{item}
						</button>
					</li>
				))}
				<li className="flex items-center justify-center gap-sm">
					<button className="btn bg-primary" onClick={toggleDeleteMode}>
						{isDeleting ? (
							<FaCheck color="#FFFFFF" size={25} />
						) : (
							<FaMinus color="#FFFFFF" size={25} />
						)}
					</button>
					<button className="btn bg-primary" onClick={openModal}>
						<FaPlus color="#FFFFFF" size={25} />
					</button>
				</li>
			</ul>
		</>
	);
}
