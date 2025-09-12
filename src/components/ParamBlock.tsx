import BaseModal from "./BaseModal";
import { useModal } from "../hooks/useModal";
import AddDataForm from "./AddDataForm";
import { FaPlus } from "react-icons/fa";


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

  const formattedName = name.charAt(0).toUpperCase() + name.slice(1, name.length - 1);

	return (
		<>
			<h3 className="text-center text-[20px] font-bold mt-sm mb-sm">
				{formattedName}
			</h3>
			<ul className="blockList">
				{paramList.map((item: string) => {
					return (
						<li key={item}>
							<button
								className={`btn ${selectedParam === item ? "selected" : ""}`}
								onClick={() => handleSetParam(item)}
							>
								{item}
							</button>
						</li>
					);
				})}
				<li className="flex items-center justify-center">
					<button className="btn bg-primary" onClick={openModal}>
						<FaPlus color="#FFFFFF" size={25} />
					</button>
				</li>
			</ul>
			<BaseModal isOpen={isModalOpen} onRequestClose={closeModal}>
				<AddDataForm type={name} closeModal={closeModal} />
			</BaseModal>
		</>
	);
}