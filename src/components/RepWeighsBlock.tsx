import { FaPlus } from "react-icons/fa";

type RepWeighsBlockProps = {
  selectedParam: string;
  paramList: string[];
  handleSetParam: (value: string) => void;
  openModal: () => void;
};

export default function RepWeighsBlock({
  selectedParam,
  paramList,
  handleSetParam,
  openModal,
}: RepWeighsBlockProps) {
	return (
		<ul className="blockList">
			{paramList.map((item: string) => (
				<li key={item}>
					<button
						className={`btn ${selectedParam === item ? "selected" : ""}`}
						onClick={() => handleSetParam(item)}
					>
						{item}
					</button>
				</li>
			))}
			<li className="flex items-center justify-center">
				<button className="btn bg-primary" onClick={openModal}>
					<FaPlus color="#FFFFFF" size={25} />
				</button>
			</li>
		</ul>
	);
}
