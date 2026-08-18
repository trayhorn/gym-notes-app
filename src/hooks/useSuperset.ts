import { useState } from "react";
import type { RefObject, PointerEvent } from "react";
import type { ExerciseSet } from "../types";
import { nanoid } from "nanoid";

export function useSuperset(
  ulElRef: RefObject<HTMLUListElement | null>,
  btnElRef: RefObject<HTMLLIElement | null>,
  startYRef: RefObject<number>,
  initialTopRef: RefObject<number>,
  transformTopRef: RefObject<number>,
  training: ExerciseSet[],
  handleAddSuperset: (exercise: ExerciseSet, supersetId: string) => void
) {
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseMoveActive, setIsMouseMoveActive] = useState(false);
  const [isMouseUpActive, setIsMouseUpActive] = useState(false);

  function toggleDragging() {
    setIsDragging(prev => !prev);
  }

  function handlePointerDown(e: PointerEvent<HTMLUListElement>) {
    if (!isDragging) return;

    e.preventDefault();

    const targetLi = (e.target as HTMLElement).closest(".btn");
    if (!targetLi) return;

    btnElRef.current = targetLi as HTMLLIElement;

    const rect = btnElRef.current.getBoundingClientRect();
    const ulRect = ulElRef.current?.getBoundingClientRect();

    startYRef.current = e.clientY;
    initialTopRef.current = rect.top - (ulRect?.top ?? 0);

    setIsMouseMoveActive(true);
    setIsMouseUpActive(true);
  }

  function handlePointerMove(e: PointerEvent<HTMLUListElement>) {
    if (!isMouseMoveActive) return;

    e.preventDefault();

    const btnEl = btnElRef.current;
    if (!btnEl) return;

    const dy = e.clientY - startYRef.current;
    transformTopRef.current += dy;
    btnEl.style.transform = `translateY(${transformTopRef.current}px)`;
    startYRef.current = e.clientY;
  }

  function handlePointerUp(e: PointerEvent<HTMLUListElement>) {
    if (!isMouseUpActive) return;

    e.preventDefault();

    const btnEl = btnElRef.current;
    const ulEl = ulElRef.current;
    if (!btnEl || !ulEl) return;

    const movedRect = btnEl.getBoundingClientRect();

    ulEl.querySelectorAll(".btn").forEach(otherBtn => {
      if (otherBtn === btnEl) return;

      const otherRect = otherBtn.getBoundingClientRect();

      const isIntersecting =
        movedRect.left < otherRect.right &&
        movedRect.right > otherRect.left &&
        movedRect.top < otherRect.bottom &&
        movedRect.bottom > otherRect.top;

      if (isIntersecting) {
        const firstExerciseName = btnEl.firstChild?.textContent;
        const secondExerciseName = otherBtn.firstChild?.textContent;

        const supersetId = nanoid();

        training
          .filter(
            ex =>
              ex.name === firstExerciseName || ex.name === secondExerciseName
          )
          .forEach(ex => handleAddSuperset(ex, supersetId));
      }
      btnElRef.current!.style.transform = "";
      transformTopRef.current = 0;
      setIsDragging(false);
    });

    btnElRef.current = null;

    setIsMouseMoveActive(false);
    setIsMouseUpActive(false);
  }

  return {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    isDragging,
    toggleDragging,
  };
}
