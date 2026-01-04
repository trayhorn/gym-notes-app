import { createContext } from "react";

type FilterContextType = {
  filterValue: string;
  setFilterValue: (value: string) => void;
};

export const FilterContext = createContext<FilterContextType>({
  filterValue: "",
  setFilterValue: () => {},
});