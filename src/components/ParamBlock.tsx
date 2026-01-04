import BaseModal from "./BaseModal";
import { useModal } from "../hooks/useModal";
import AddDataForm from "./AddDataForm";
import { formatName } from "../utils/formatName";
import type { WorkoutSetPropertyType } from "../types";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteParam } from "../api";
import type { deleteParamData } from "../types";
import TrainingOptionsList from "./TrainingOptionsList";
import { ExerciseFilter } from "./ExerciseFilter";
import { useContext } from "react";
import { FilterContext } from "../context/FilterContext";


type ParamBlockProps = {
  selectedParam: string;
	paramBlockType: "exercisesBlock" | "repsBlock" | "weightsBlock";
  name: WorkoutSetPropertyType;
  paramList: string[];
	handleSetParam: (type: WorkoutSetPropertyType, value: string) => void;
};

export default function ParamBlock({
  selectedParam,
	paramBlockType,
  name,
	handleSetParam,
	paramList,
}: ParamBlockProps) {

	const { filterValue } = useContext(FilterContext)!;

	const filteredParamList = paramList.filter((item) =>
		item.toLowerCase().includes(filterValue.toLowerCase())
	);

	// Other logic

	const { isModalOpen, openModal, closeModal } = useModal();

	const trainingParamType =
		paramBlockType === "exercisesBlock"
			? "exercises"
			: paramBlockType === "repsBlock"
			? "reps"
				: "weights";


	const [isDeleting, setIsDeleting] = useState(false);

	const toggleDeleteMode = () => {
		setIsDeleting((prev) => !prev);
	};

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (data: deleteParamData) => deleteParam(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["params"] });
		},
	});

	const handleListItemClick = (item: string) => {
		if (isDeleting) {
			mutation.mutate({ type: trainingParamType, item });
		} else {
			handleSetParam(name, item);
		}
	};

	return (
		<div className="max-h-[500px] overflow-auto p-sm">
			<h3 className="text-center text-[20px] font-bold mt-sm mb-sm">
				{formatName(name)}
			</h3>
			{paramBlockType === "exercisesBlock" ? (
				<>
					<ExerciseFilter />
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
			) : (
				<TrainingOptionsList
					selectedParam={selectedParam}
					isDeleting={isDeleting}
					dataList={paramList}
					toggleDeleteMode={toggleDeleteMode}
					handleListItemClick={handleListItemClick}
					openModal={openModal}
				/>
			)}

			<BaseModal isOpen={isModalOpen} onRequestClose={closeModal}>
				<AddDataForm type={trainingParamType} closeModal={closeModal} />
			</BaseModal>
		</div>
	);
}