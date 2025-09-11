import BaseModal from "./BaseModal";
import { useModal } from "../hooks/useModal";
import AddDataForm from "./AddDataForm";
import { useState } from "react";

type ParamBlockProps = {
  name: "exercises" | "reps" | "weights";
  paramList: string[];
  handleSetParam: (value: string) => void;
};

export default function ParamBlock({ name, handleSetParam, paramList }: ParamBlockProps) {
	const { isModalOpen, openModal, closeModal } = useModal();
	const [isSelected, setIsSelected] = useState<string>("");

	const handleBtnClick = (value: string) => {
		handleSetParam(value);
		setIsSelected(value);
	};

	return (
		<>
			<h3 className="text-center text-[20px] font-bold mt-sm mb-sm">{name}</h3>
			<ul className="blockList">
				{paramList.map((item: string) => {
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
				<AddDataForm type={name} closeModal={closeModal} />
			</BaseModal>
		</>
	);
}