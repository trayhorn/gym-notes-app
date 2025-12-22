import { FaPlus, FaMinus, FaCheck } from "react-icons/fa";
import type {
	deleteParamData,
	TrainingOptionsPropertyType,
	WorkoutSetPropertyType,
} from "../types";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteParam } from "../api";

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
		<ul className="blockList">
			{paramList.map((item: string) => (
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
	);
}
