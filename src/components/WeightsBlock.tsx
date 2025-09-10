import BaseModal from "./BaseModal";
import AddDataForm from "./AddDataForm";
import { useModal } from "../hooks/useModal";
import { useState } from "react";

type WeightsBlockProps = {
	weights: string[];
	handleSetWeight: (value: string) => void;
};

export default function WeightsBlock({ handleSetWeight, weights }: WeightsBlockProps) {
	const { isModalOpen, openModal, closeModal } = useModal();
	const [isSelected, setIsSelected] = useState<string>("");

	const handleBtnClick = (value: string) => {
		handleSetWeight(value);
		setIsSelected(value);
	}

	return (
		<>
			<h3 className="text-center text-[20px] font-bold mt-sm mb-sm">Weights</h3>
			<ul className="blockList">
				{weights.map((weight: string) => {
					return (
						<li key={weight}>
							<button
								className={`btn ${isSelected === weight ? "selected" : ""}`}
								onClick={() => handleBtnClick(weight)}
							>
								{weight}
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
					type="weights"
					closeModal={closeModal}
				/>
			</BaseModal>
		</>
	);
}
