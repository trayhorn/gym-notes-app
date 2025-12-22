import { FaPlus, FaMinus, FaCheck } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";

type TrainingOptionsListProps = {
  selectedParam: string;
  isDeleting: boolean;
  dataList: string[];
  toggleDeleteMode: () => void;
  handleListItemClick: (item: string) => void;
  openModal: () => void;
};

export default function TrainingOptionsList({
	dataList,
	selectedParam,
	isDeleting,
	toggleDeleteMode,
	handleListItemClick,
	openModal,
}: TrainingOptionsListProps) {
	return (
		<ul className="blockList">
			{dataList.map((item: string) => (
				<li key={item} className="relative">
					<button
						className={`btn ${selectedParam === item ? "selected" : ""} ${
							isDeleting ? "animate-pulse" : ""
						}`}
						onClick={() => handleListItemClick(item)}
					>
						{item}
					</button>
					{isDeleting && (
						<IoIosRemoveCircle
							size={20}
							className="absolute top-[-10px] right-[-10px]"
						/>
					)}
				</li>
			))}
			<li className="flex items-center justify-center gap-sm">
				<button className="btn bg-primary" onClick={toggleDeleteMode}>
					{isDeleting ? (
						<FaCheck color="#FFFFFF" size={25} />
					) : (
						<FaMinus color="#FFFFFF" size={25} />
					)}
				</button>
				<button className="btn bg-primary" onClick={openModal}>
					<FaPlus color="#FFFFFF" size={25} />
				</button>
			</li>
		</ul>
	);
}