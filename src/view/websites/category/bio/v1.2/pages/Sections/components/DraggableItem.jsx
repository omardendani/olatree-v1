// 3. COMPOSANT POUR UN ITEM DRAGGABLE
// components/DraggableItem.jsx
import { Items } from './bento/Items.jsx';

export default function DraggableItem({
    item,
    index,
    transform,
    height,
    width,
    isDragging
}) {

    //const hoverRefs = useRef({});
    const id = `item_${index}`;

    return (
        <div
            id={id}
            data-draggable-id={index}
            className='edit-mode-grp-item-content'
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: transform,
                height: height,
                width: width,
                transition: isDragging ? 'none' : 'transform 0.1s ease-out'
            }}
        >
            <Items
                data={item}
            />

        </div>
    );
};