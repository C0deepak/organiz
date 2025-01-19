import { useDroppable } from '@dnd-kit/core';

interface DroppableProps {
    id: string;
    children: React.ReactNode;
}

export const Droppable: React.FC<DroppableProps> = ({ id, children }) => {
    const { setNodeRef } = useDroppable({
        id,
    });

    return (
        <div ref={setNodeRef} className="droppable">
            {children}
        </div>
    );
};
