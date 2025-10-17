import BaseModal from "./BaseModal";
import { useModal } from "../hooks/useModal";
import AddDataForm from "./AddDataForm";
import ExerciseBlock from "./ExerciseBlock";
import RepWeighsBlock from "./RepWeighsBlock";
import { formatName } from "../utils/formatName";


type ParamBlockProps = {
  selectedParam: string;
  name: "exercises" | "reps" | "weights";
  paramList: string[];
	handleSetParam: (value: string) => void;
};

export default function ParamBlock({
  selectedParam,
  name,
	handleSetParam,
	paramList,
}: ParamBlockProps) {
	const { isModalOpen, openModal, closeModal } = useModal();

	return (
		<>
			<h3 className="text-center text-[20px] font-bold mt-sm mb-sm">
				{formatName(name)}
			</h3>
			{name === "exercises" ? (
				<ExerciseBlock
					selectedParam={selectedParam}
					handleSetParam={handleSetParam}
					paramList={paramList}
					openModal={openModal}
				/>
			) : (
				<RepWeighsBlock
					selectedParam={selectedParam}
					paramList={paramList}
					handleSetParam={handleSetParam}
					openModal={openModal}
				/>
			)}

			<BaseModal isOpen={isModalOpen} onRequestClose={closeModal}>
				<AddDataForm type={name} closeModal={closeModal} />
			</BaseModal>
		</>
	);
}