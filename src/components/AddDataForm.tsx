import { useState } from "react";

type AddDataFormProps = {
  addValue: (newData: { id: number; value: string }) => void;
  closeModal: () => void;
};

export default function AddDataForm({ addValue, closeModal }: AddDataFormProps) {
	const [value, setValue] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
    addValue({ id: Date.now(), value });

		e.currentTarget.reset();
		closeModal();
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
