import type {
	deleteParamData,
	TrainingOptionsPropertyType,
	WorkoutSetPropertyType,
} from "../types";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteParam } from "../api";
import TrainingOptionsList from "./TrainingOptionsList";

type RepWeighsBlockProps = {
	selectedParam: string;
	trainingParamType: TrainingOptionsPropertyType;
	paramList: string[];
	handleSetParam: (type: WorkoutSetPropertyType, value: string) => void;
	openModal: () => void;
	name: WorkoutSetPropertyType;
};

export default function RepWeighsBlock({
	selectedParam,
	trainingParamType,
	paramList,
	handleSetParam,
	openModal,
	name,
}: RepWeighsBlockProps) {
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
		<TrainingOptionsList
			selectedParam={selectedParam}
			isDeleting={isDeleting}
			dataList={paramList}
			toggleDeleteMode={toggleDeleteMode}
			handleListItemClick={handleListItemClick}
			openModal={openModal}
		/>
	);
}
