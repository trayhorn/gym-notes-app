import { createContext } from "react";

type FilterContextType = {
	exerciseFilterValue: string;
	setExerciseFilterValue: (value: string) => void;
};

export const FilterContext = createContext<FilterContextType>({
	exerciseFilterValue: "",
	setExerciseFilterValue: () => {},
});