import type { Exercise } from "../types";

export function groupExercises(exercises: Exercise[]) {
  return exercises.reduce<(Exercise | { supersetGroup: number; items: Exercise[] })[]>((acc, ex) => {
    if (!ex.supersetGroup) {
      acc.push(ex);
    } else {
      let group = acc.find(
        (item) => typeof item !== "undefined" && "supersetGroup" in item && item.supersetGroup === ex.supersetGroup
      ) as { supersetGroup: number; items: Exercise[] } | undefined;

      if (!group) {
        group = { supersetGroup: ex.supersetGroup, items: [] };
        acc.push(group);
      }

      group.items.push(ex);
    }
    return acc;
  }, []);
}