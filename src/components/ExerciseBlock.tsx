import BaseModal from "./BaseModal";
import { useModal } from "../hooks/useModal";
import AddDataForm from "./AddDataForm";
import type { Params } from "../types";

type ExerciseBlockProps = {
	exercises: string[];
	handleAddParam: (param: Params) => void;
};

export default function ExerciseBlock({ handleAddParam, exercises }: ExerciseBlockProps) {
	const { isModalOpen, openModal, closeModal } = useModal();

	return (
		<>
			<h3 className="text-center text-[20px] font-bold mt-sm mb-sm">
				Exercises
			</h3>
			<ul className="blockList">
				{exercises.map((item: string) => {
					return (
						<li key={item}>
							<button className="btn">{item}</button>
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
					handleAddParam={handleAddParam}
				/>
			</BaseModal>
		</>
	);
}
