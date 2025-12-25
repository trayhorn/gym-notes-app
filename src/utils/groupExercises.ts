import type { WorkoutSetType } from "../types";

export function groupExercises(exercises: WorkoutSetType[]) {
  return exercises.reduce<(WorkoutSetType | { supersetGroup: string; items: WorkoutSetType[] })[]>((acc, ex) => {
    if (!ex.supersetGroup) {
      acc.push(ex);
    } else {
      let group = acc.find(
        (item) => typeof item !== "undefined" && "supersetGroup" in item && item.supersetGroup === ex.supersetGroup
      ) as { supersetGroup: string; items: WorkoutSetType[] } | undefined;

      if (!group) {
        group = { supersetGroup: ex.supersetGroup, items: [] };
        acc.push(group);
      }

      group.items.push(ex);
    }
    return acc;
  }, []);
}