import BaseModal from "./BaseModal";
import AddDataForm from "./AddDataForm";
import { useModal } from "../hooks/useModal";
import type { Params } from "../types";

type WeightsBlockProps = {
	weights: string[];
	handleAddParam: (param: Params) => void;
};

export default function WeightsBlock({handleAddParam, weights }: WeightsBlockProps) {
	const { isModalOpen, openModal, closeModal } = useModal();

	return (
		<>
			<h3 className="text-center text-[20px] font-bold mt-sm mb-sm">Weights</h3>
			<ul className="blockList">
				{weights.map((weight: string) => {
					return (
						<li key={weight}>
							<button className="btn">{weight}</button>
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
					handleAddParam={handleAddParam}
				/>
			</BaseModal>
		</>
	);
}
