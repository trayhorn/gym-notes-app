

type ExerciseFilterProps = {
	filterValue: string;
	handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ExerciseFilter({
	filterValue,
	handleFilterChange,
}: ExerciseFilterProps) {
	return (
		<div className="mb-md flex items-center gap-md">
			<label htmlFor="filter">Filter</label>
			<input
				type="text"
				name="filter"
				value={filterValue}
				autoComplete="off"
				onChange={handleFilterChange}
			/>
		</div>
	);
}