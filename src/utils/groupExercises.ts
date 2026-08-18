import type { ExerciseSet } from "../types";

export function groupExercises(exercises: ExerciseSet[]) {
  return exercises.reduce<
    (ExerciseSet | { supersetGroup: string; items: ExerciseSet[] })[]
  >((acc, ex) => {
    if (!ex.supersetGroup) {
      acc.push(ex);
    } else {
      let group = acc.find(
        item =>
          typeof item !== "undefined" &&
          "supersetGroup" in item &&
          item.supersetGroup === ex.supersetGroup
      ) as { supersetGroup: string; items: ExerciseSet[] } | undefined;

      if (!group) {
        group = { supersetGroup: ex.supersetGroup, items: [] };
        acc.push(group);
      }

      group.items.push(ex);
    }
    return acc;
  }, []);
}
