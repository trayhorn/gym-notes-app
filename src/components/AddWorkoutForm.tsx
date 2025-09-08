import ExerciseBlock from "./ExerciseBlock";
import RepsBlock from "./RepsBlock";
import WeightsBlock from "./WeightsBlock";
import { useState, useEffect } from "react";
import type { Params } from "../types";
import { fetchAllParams } from "../api";

export default function AddWorkoutForm() {
  const [params, setParams] = useState<Params | null>(null);

  const handleAddParam = (param: Params) => {
    setParams(param);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchAllParams(token)
        .then(({ data: {params} }) => {
          setParams(params[0]);
        })
				.catch((e) => console.log(e));
    }
  }, []);

  if(!params) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="text-center text-[20px] font-bold mt-sm mb-sm">Date</h3>
      <input type="date" id="date" className="mb-md" />
      <ExerciseBlock handleAddParam={handleAddParam} exercises={params?.exercises} />
      <RepsBlock handleAddParam={handleAddParam} reps={params?.reps} />
      <WeightsBlock handleAddParam={handleAddParam} weights={params?.weights} />
    </div>
	);
}