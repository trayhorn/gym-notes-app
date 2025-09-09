import AddDataForm from "./AddDataForm";
import { useModal } from "../hooks/useModal";
import BaseModal from "./BaseModal";
import type { Params } from "../types";
import { useState } from "react";

type RepsBlockProps = {
	reps: string[];
	handleAddParam: (param: Params) => void;
	handleSetReps: (value: string) => void;
};

export default function RepsBlock({handleAddParam, handleSetReps, reps }: RepsBlockProps) {
	const { isModalOpen, openModal, closeModal } = useModal();
	const [isSelected, setIsSelected] = useState<string>("");

	const handleBtnClick = (value: string) => {
		handleSetReps(value);
		setIsSelected(value);
	}

	return (
		<>
			<h3 className="text-center text-[20px] font-bold mt-sm mb-sm">Reps</h3>
			<ul className="blockList">
				{reps.map((rep: string) => {
					return (
						<li key={rep}>
							<button
								className={`btn ${isSelected === rep ? "selected" : ""}`}
								onClick={() => handleBtnClick(rep)}
							>
								{rep}
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
					type="reps"
					closeModal={closeModal}
					handleAddParam={handleAddParam}
				/>
			</BaseModal>
		</>
	);
}
