import { useState } from "react";
import { addParam } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type AddDataFormProps = {
	type: "weights" | "reps" | "exercises";
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handleAddParam = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		mutation.mutate({ type, value });
		closeModal();
	};

	return (
		<form onSubmit={handleAddParam} className="flex justify-between mt-5">
			<input type="text" name="value" value={value} onChange={handleChange} />
			<button className="btn" type="submit">
				Add
			</button>
		</form>
	);
}