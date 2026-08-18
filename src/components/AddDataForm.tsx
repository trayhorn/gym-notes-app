import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addParam } from "../api";
import type { addParamData, TrainingOptionsPropertyType } from "../types";

type AddDataFormProps = {
  type: TrainingOptionsPropertyType;
  closeModal: () => void;
};

export default function AddDataForm({ type, closeModal }: AddDataFormProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: addParamData) => addParam(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["params"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      if (!error.response) return;
      const { message } = error.response.data;
      toast.error(message);
    },
  });

  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("kg");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value);
  };

  const handleAddParam = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === "weights") {
      mutation.mutate({
        type,
        value: `${value} ${unit}`,
      });
    } else {
      mutation.mutate({ type, value });
    }

    closeModal();
  };

  return (
    <form onSubmit={handleAddParam} className="flex justify-between mt-5">
      <div role="group" className="flex items-center">
        <input
          type={type === "weights" ? "number" : "text"}
          name="value"
          value={value}
          onChange={handleChange}
        />
        {type === "weights" && (
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
