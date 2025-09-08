import { useState } from "react";
import { addParam } from "../api";
import type { Params } from "../types";

type AddDataFormProps = {
	type: "weights" | "reps" | "exercises";
	closeModal: () => void;
	handleAddParam: (param: Params) => void;
};

export default function AddDataForm({ type, closeModal, handleAddParam }: AddDataFormProps) {
	const [value, setValue] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const token = localStorage.getItem("authToken");
		if (token) {
			try {
				const { data } = await addParam(token, { type, value });
				setValue("");
				handleAddParam(data);
				closeModal();
			} catch (e) {
				console.log(e);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex justify-between mt-5">
			<input type="text" name="value" value={value} onChange={handleChange} />
			<button className="btn" type="submit">
				Add
			</button>
		</form>
	);
}
