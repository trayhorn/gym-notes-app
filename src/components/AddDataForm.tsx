import { useState } from "react";
import { addParam } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type AddDataFormProps = {
	type: "weight" | "reps" | "exercises";
	closeModal: () => void;
};

export default function AddDataForm({ type, closeModal }: AddDataFormProps) {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: (data: { type: string; value: string }) => addParam(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["params"] });
		}
	});

	const [value, setValue] = useState("");
	const [unit, setUnit] = useState("kg");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setUnit(e.target.value);
	}

	const handleAddParam = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (type === "weight") {
			mutation.mutate({
				type,
				value: `${value} ${unit}`
			});
		} else {
			mutation.mutate({ type, value });
		}

		closeModal();
	};

	return (
		<form onSubmit={handleAddParam} className="flex justify-between mt-5">
			<div role="group" className="flex items-center">
				<input type={type === "weight" ? "number" : "text"} name="value" value={value} onChange={handleChange} />
				{type === "weight" && (
					<select onChange={handleUnitChange} name="unit" className="ml-2">
						<option value="kg">kg</option>
						<option value="lbs">lbs</option>
					</select>
				)}
			</div>
			<button className="btn" type="submit">
				Add
			</button>
		</form>
	);
}