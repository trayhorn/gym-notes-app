import data from "../data.json";
import { useState } from "react";
import BaseModal from "./BaseModal";
import AddDataForm from "./AddDataForm";
import { useModal } from "../hooks/useModal";

export default function WeightsBlock() {
	const [weightsData, setWeightsData] = useState(data.weights);
	const { isModalOpen, openModal, closeModal } = useModal();

	const handleAddNewWeight = (newData: { id: number; value: string }) => {
		setWeightsData((prev) => [...prev, newData]);
	};

	return (
		<>
			<h3 className="text-center text-[20px] font-bold mt-sm mb-sm">Weights</h3>
			<ul className="blockList">
				{weightsData.map(({ id, value }) => {
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
				<AddDataForm addValue={handleAddNewWeight} closeModal={closeModal} />
			</BaseModal>
		</>
	);
}