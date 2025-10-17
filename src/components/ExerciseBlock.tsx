import { FaPlus } from "react-icons/fa";
import { useContext } from "react";
import { FilterContext } from "../context/FilterContext";

type ExerciseBlockProps = {
	selectedParam: string;
	paramList: string[];
	handleSetParam: (value: string) => void;
	openModal: () => void;
};

export default function ExerciseBlock({
	selectedParam,
	handleSetParam,
	paramList,
	openModal,
}: ExerciseBlockProps) {
	const {
		exerciseFilterValue,
		setExerciseFilterValue
	} = useContext(FilterContext);

	const filteredParamList = paramList.filter((item) =>
		item.toLowerCase().includes(exerciseFilterValue.toLowerCase())
	);

	return (
		<>
			<div className="mb-md flex items-center gap-md">
				<label htmlFor="filter">Filter</label>
				<input
					type="text"
					name="filter"
					value={exerciseFilterValue}
					autoComplete="off"
					onChange={(e) => setExerciseFilterValue(e.target.value)}
				/>
			</div>
			{filteredParamList.length === 0 && (
				<p className="text-center">No exercises found</p>
			)}
			<ul className="blockList">
				{filteredParamList.map((item: string) => (
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
		</>
	);
}
