

type SetListProps = {
    training: {
        name: string;
        reps: string;
        weight: string;
    }[];
};

export default function SetList({training}: SetListProps) {

    const handleMouseDown = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
    }


    return (
        <ul className="mt-md">
            {training.map(({ name, reps, weight }) => (
                <li
                    key={name}
                    className="mb-sm flex gap-2 btn w-fit mt-md cursor-default"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    <span>{name}</span>
                    <span>{reps}</span>
                    <span>{weight}</span>
                </li>
            ))}
        </ul>
    )
}