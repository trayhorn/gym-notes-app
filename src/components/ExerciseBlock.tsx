import { useState } from "react";

type ExerciseBlockProps = {
	selectedParam: string;
	paramList: string[];
	handleSetParam: (value: string) => void;
};

export default function ExerciseBlock({
	selectedParam,
	handleSetParam,
	paramList,
}: ExerciseBlockProps) {
	const [filterValue, setFilterValue] = useState("");

	const filteredParamList = paramList.filter((item) =>
		item.toLowerCase().includes(filterValue.toLowerCase())
	);

	return (
		<>
			<div className="mb-md flex items-center gap-md">
				<label htmlFor="filter">Filter</label>
				<input
					type="text"
					name="filter"
          value={filterValue}
          autoComplete="off"
					onChange={(e) => setFilterValue(e.target.value)}
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
			</ul>
		</>
	);
}
