import BaseModal from "./BaseModal";
import { useModal } from "../hooks/useModal";
import AddDataForm from "./AddDataForm";
import ExerciseBlock from "./ExerciseBlock";
import RepWeighsBlock from "./RepWeighsBlock";
import { formatName } from "../utils/formatName";
import type { WorkoutSetPropertyType} from "../types";


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
	const { isModalOpen, openModal, closeModal } = useModal();

	const convertedParamBlockType =
		paramBlockType === "exercisesBlock"
			? "exercises"
			: paramBlockType === "repsBlock"
			? "reps"
			: "weights";

	return (
		<div className="max-h-[500px] overflow-auto p-sm">
			<h3 className="text-center text-[20px] font-bold mt-sm mb-sm">
				{formatName(name)}
			</h3>
			{paramBlockType === "exercisesBlock" ? (
				<ExerciseBlock
					selectedParam={selectedParam}
					handleSetParam={handleSetParam}
					paramList={paramList}
					openModal={openModal}
					name='name'
				/>
			) : (
				<RepWeighsBlock
					selectedParam={selectedParam}
					paramList={paramList}
					handleSetParam={handleSetParam}
					openModal={openModal}
					name={name}
				/>
			)}

			<BaseModal isOpen={isModalOpen} onRequestClose={closeModal}>
				<AddDataForm type={convertedParamBlockType} closeModal={closeModal} />
			</BaseModal>
		</div>
	);
}