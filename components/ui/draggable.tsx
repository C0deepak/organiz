import { useDraggable } from "@dnd-kit/core";

interface DraggableProps {
    id: string;
    data: { priority: string };
    children: React.ReactNode;
}

export const Draggable: React.FC<DraggableProps> = ({ id, children, data }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        data,
    });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
};
