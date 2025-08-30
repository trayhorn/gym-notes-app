import data from "../data.json";
import { useState } from "react";
import AddDataForm from "./AddDataForm";
import { useModal } from "../hooks/useModal";
import BaseModal from "./BaseModal";

export default function RepsBlock() {
	const [repsData, setRepsData] = useState(data.reps);
	const { isModalOpen, openModal, closeModal } = useModal();

	const handleAddNewRep = (newData: { id: number; value: string }) => {
		setRepsData((prev) => [...prev, newData]);
	};

  return (
		<>
			<h3 className="text-center text-[20px] font-bold mt-sm mb-sm">Reps</h3>
			<ul className="blockList">
				{repsData.map(({ id, value }) => {
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
				<AddDataForm addValue={handleAddNewRep} closeModal={closeModal} />
			</BaseModal>
		</>
	);
}