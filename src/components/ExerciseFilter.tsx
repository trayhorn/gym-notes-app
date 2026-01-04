import { useContext } from "react";
import { FilterContext } from "../context/FilterContext";

export function ExerciseFilter() {
	const { filterValue, setFilterValue } = useContext(FilterContext)!;

	return (
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
	);
}