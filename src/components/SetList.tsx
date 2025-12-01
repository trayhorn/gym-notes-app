import { useRef, useState, useMemo } from "react";
import type { Exercise } from "../types";
import { groupExercises } from "../utils/groupExercises";
import { nanoid } from 'nanoid';


type SetListProps = {
    training: Exercise[];
    handleAddSuperset: (exercise: Exercise, supersetId: string) => void;
};

export default function SetList({training, handleAddSuperset}: SetListProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isMouseMoveActive, setIsMouseMoveActive] = useState(false);
    const [isMouseUpActive, setIsMouseUpActive] = useState(false);

    const ulElRef = useRef<HTMLUListElement>(null);
    const btnElRef = useRef<HTMLLIElement>(null);
    const startYRef = useRef<number>(0);
    const initialTopRef = useRef<number>(0);

    function toggleDragging() {
        enableButtonPositioning();
        if (isDragging) {
            revokeButtonPosition();
        }
    }

    function enableButtonPositioning() {
        setIsDragging(true);
        const container = ulElRef.current;
        if (!container) return;
        console.log("Enabling button positioning");

        // Make the container the positioning context
        const prevPosition = container.style.position;
        container.dataset.prevPosition = prevPosition || '';
        container.style.position = container.style.position || 'relative';

        const containerRect = container.getBoundingClientRect();
        const scrollTop = container.scrollTop || 0;
        const scrollLeft = container.scrollLeft || 0;

        container.querySelectorAll<HTMLLIElement>('.dragTarget').forEach((btn) => {
            // Measure before we change styles
            const rect = btn.getBoundingClientRect();
            const computed = getComputedStyle(btn);

            // Create placeholder that preserves layout space
            const placeholder = document.createElement('li');
            placeholder.className = 'drag-placeholder';
            // copy crucial layout-affecting styles
            placeholder.style.width = `${rect.width}px`;
            placeholder.style.height = `${rect.height}px`;
            placeholder.style.display = computed.display;
            placeholder.style.boxSizing = computed.boxSizing;
            placeholder.style.margin = computed.margin; // keep margins so flow doesn't change
            placeholder.style.flex = computed.flex; // if inside flex container
            // mark so we can find and remove later
            placeholder.style.background = 'transparent';
            placeholder.style.pointerEvents = 'none';
            placeholder.style.lineHeight = '0';
            placeholder.dataset.placeholderFor = 'dragTarget';

            btn.parentNode?.insertBefore(placeholder, btn);

            // compute top/left relative to container (NOT page)
            const top = rect.top - containerRect.top + scrollTop;
            const left = rect.left - containerRect.left + scrollLeft;

            // apply absolute positioning to the element
            btn.style.position = 'absolute';
            btn.style.top = `${top}px`;
            btn.style.left = `${left}px`;
            btn.style.width = `${rect.width}px`;
            btn.style.margin = '0'; // margin moved to placeholder
            btn.style.zIndex = '999'; // ensure on top while dragging
            btn.dataset.wasPositioned = 'true';
        });

        // store that we're in drag mode
        container.dataset.isDragMode = 'true';
    }

    function revokeButtonPosition() {
        setIsDragging(false);
        const ulEl = ulElRef.current;
        if (!ulEl) return;
        console.log("Revoking button positioning");

        // restore positioned elements
        ulEl
            .querySelectorAll<HTMLUListElement>(".dragTarget")
            .forEach((btn) => {
                if (btn.dataset.wasPositioned !== "true") return;
                btn.style.position = "";
                btn.style.top = "";
                btn.style.left = "";
                btn.style.width = "";
                btn.style.margin = "";
                btn.style.zIndex = "";
                delete btn.dataset.wasPositioned;
            });

        // remove placeholders
        ulEl.querySelectorAll('.drag-placeholder').forEach(pl => pl.remove());

        // restore ulEl position if we changed it
        if (ulEl.dataset.prevPosition !== undefined) {
            ulEl.style.position = ulEl.dataset.prevPosition;
            delete ulEl.dataset.prevPosition;
        }

        delete ulEl.dataset.isDragMode;

        // cleanup listeners if you added them elsewhere
        setIsMouseMoveActive(false);
        setIsMouseUpActive(false);
    }


    function handleMouseDown(e: React.MouseEvent<HTMLUListElement>) {
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
        e.preventDefault();
        console.log("Mouse move on item");

        const btnEl = btnElRef.current;
        if (!btnEl) return;

        const dy = e.clientY - startYRef.current;
        btnEl.style.top = `${parseFloat(btnEl.style.top) + dy}px`;
        startYRef.current = e.clientY;
    }

    function handleMouseUp(e: React.MouseEvent<HTMLUListElement>) {
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
            revokeButtonPosition();
        });

        btnElRef.current = null;

        setIsMouseMoveActive(false);
        setIsMouseUpActive(false);
    }

    const groupedTraining = useMemo(() => {
        console.log("Calculating grouped training");
        return groupExercises(training);
    }, [training]);


    return (
        <div>
            <button onClick={toggleDragging} className="btn mt-md mr-sm bg-primary text-text-secondary">Superset</button>
            <ul
                className="relative mt-md"
                ref={ulElRef}
                onMouseDown={isDragging ? handleMouseDown : undefined}
                onMouseMove={isMouseMoveActive ? handleMouseMove : undefined}
                onMouseUp={isMouseUpActive ? handleMouseUp : undefined}
            >
                {groupedTraining.map((item, idx) => {
                    if ("items" in item) {
                        return (
                        <div key={idx} className="superset flex flex-col mt-lg w-max">
                            {item.items.map((ex, i) => (
                            <li key={i} className={`${isDragging ? "outline-2 outline-dashed outline-primary" : ""} dragTarget flex gap-2 font-roboto text-text-primary font-bold p-sm bg-accent cursor-default`}
>
                                <span>{ex.name}</span>
                                <span>{ex.reps}</span>
                                <span>{ex.weight}</span>
                            </li>
                            ))}
                        </div>
                        );
                    } else {
                        return (
                        <li key={idx} className={`${isDragging ? "outline-2 outline-dashed outline-primary" : ""} dragTarget mb-sm flex gap-2 btn w-fit mt-md cursor-default`}
>
                            <span>{item.name}</span>
                            <span>{item.reps}</span>
                            <span>{item.weight}</span>
                        </li>
                        );
                    }
                })}
            </ul>
        </div>
    )
}