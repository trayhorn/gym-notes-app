import BaseModal from "./BaseModal";
import { useModal } from "../hooks/useModal";
import AddDataForm from "./AddDataForm";
import { useState } from "react";

type ExerciseBlockProps = {
	exercises: string[];
	handleSetName: (value: string) => void;
};

export default function ExerciseBlock({ handleSetName, exercises }: ExerciseBlockProps) {
	const { isModalOpen, openModal, closeModal } = useModal();
	const [isSelected, setIsSelected] = useState<string>("");

	const handleBtnClick = (value: string) => {
		handleSetName(value);
		setIsSelected(value);
	}

	return (
		<>
			<h3 className="text-center text-[20px] font-bold mt-sm mb-sm">
				Exercises
			</h3>
			<ul className="blockList">
				{exercises.map((item: string) => {
					return (
						<li key={item}>
							<button
								className={`btn ${isSelected === item ? "selected" : ""}`}
								onClick={() => handleBtnClick(item)}
							>
								{item}
							</button>
						</li>
					);
				})}
				<li>
					<button className="btn bg-secondary" onClick={openModal}>
						Add
					</button>
				</li>
			</ul>
			<BaseModal isOpen={isModalOpen} onRequestClose={closeModal}>
				<AddDataForm
					type="exercises"
					closeModal={closeModal}
				/>
			</BaseModal>
		</>
	);
}
