import { useState } from "react";
import type { Exercise } from "../types";
import { nanoid } from "nanoid";


export function useSuperset(
  ulElRef: React.RefObject<HTMLUListElement | null>,
  btnElRef: React.RefObject<HTMLLIElement | null>,
  startYRef: React.RefObject<number>,
  initialTopRef: React.RefObject<number>,
  transformTopRef: React.RefObject<number>,
  training: Exercise[],
  handleAddSuperset: (exercise: Exercise, supersetId: string) => void
) {
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseMoveActive, setIsMouseMoveActive] = useState(false);
  const [isMouseUpActive, setIsMouseUpActive] = useState(false);

  function toggleDragging() {
    setIsDragging((prev) => !prev);
  }

  function handleMouseDown(e: React.MouseEvent<HTMLUListElement>) {
    if(!isDragging) return;

    e.preventDefault();
    console.log("Mouse down on item");

    const targetLi = (e.target as HTMLElement).closest('.btn');
    if (!targetLi) return;

    btnElRef.current = targetLi as HTMLLIElement;

    const rect = btnElRef.current.getBoundingClientRect();
    const ulRect = ulElRef.current?.getBoundingClientRect();

    startYRef.current = e.clientY;
    initialTopRef.current = rect.top - (ulRect?.top ?? 0);

    setIsMouseMoveActive(true);
    setIsMouseUpActive(true);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLUListElement>) {
    if(!isMouseMoveActive) return;

    e.preventDefault();
    console.log("Mouse move on item");

    const btnEl = btnElRef.current;
    if (!btnEl) return;

    const dy = e.clientY - startYRef.current;
    transformTopRef.current += dy;
    btnEl.style.transform = `translateY(${transformTopRef.current}px)`;
    startYRef.current = e.clientY;
  }

  function handleMouseUp(e: React.MouseEvent<HTMLUListElement>) {
    if(!isMouseUpActive) return;

    e.preventDefault();
    console.log("Mouse up on item");

    const btnEl = btnElRef.current;
    const ulEl = ulElRef.current;
    if (!btnEl || !ulEl) return;

    const movedRect = btnEl.getBoundingClientRect();

    ulEl.querySelectorAll('.btn').forEach(otherBtn => {
        if (otherBtn === btnEl) return;

        const otherRect = otherBtn.getBoundingClientRect();

        const isIntersecting =
        movedRect.left < otherRect.right &&
        movedRect.right > otherRect.left &&
        movedRect.top < otherRect.bottom &&
        movedRect.bottom > otherRect.top;

        if (isIntersecting) {
            console.log('🔥 Intersected');
            console.log('DragTarget:', btnEl.firstChild?.textContent);
            console.log('Other Target:', otherBtn.firstChild?.textContent);

            const firstExerciseName = btnEl.firstChild?.textContent;
            const secondExerciseName = otherBtn.firstChild?.textContent;

            const supersetId = nanoid();

            training
                .filter(
                    ex => ex.name === firstExerciseName || ex.name === secondExerciseName
                )
                .forEach(ex => handleAddSuperset(ex, supersetId));
        }
        btnElRef.current!.style.transform = '';
        transformTopRef.current = 0;
        setIsDragging(false);
    });

    btnElRef.current = null;

    setIsMouseMoveActive(false);
    setIsMouseUpActive(false);
  }

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    isDragging,
    toggleDragging
  };
}