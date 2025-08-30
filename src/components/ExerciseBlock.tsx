import data from "../data.json";
import { useState } from "react";
import BaseModal from "./BaseModal";
import { useModal } from "../hooks/useModal";
import AddDataForm from "./AddDataForm";

export default function ExerciseBlock() {
  const [exerciseData, setExerciseData] = useState(data.exercises);
	const { isModalOpen, openModal, closeModal } = useModal();

	const handleAddNewExercise = (newData: { id: number; value: string }) => {
		setExerciseData((prev) => [...prev, newData]);
	};

	return (
		<>
			<h3 className="text-center text-[20px] font-bold mt-sm mb-sm">
				Exercises
			</h3>
			<ul className="blockList">
				{exerciseData.map(({ id, value }) => {
					return (
						<li key={id}>
							<button className="btn">{value}</button>
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
				<AddDataForm addValue={handleAddNewExercise} closeModal={closeModal} />
			</BaseModal>
		</>
	);
}