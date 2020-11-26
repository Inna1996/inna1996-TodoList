import React from 'react';
import cl from './ItemList.module.css';
import Item from './../Item/Item';
import DeleteButton from '../DeleteButton/DeleteButton';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ItemList = ({ items, updateItemValue, editMode, activatedEditMode, handleOnDragEnde, onClickDone, onClickDelete }) => {

    const handleOnDragEnd = (destination, source) => {
        handleOnDragEnde(destination, source);
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
                {(provided) => (
                    <ul className={cl.list} {...provided.droppableProps} ref={provided.innerRef}>
                        {
                            items.map(({ id, isDone, value }, index) => {
                                return (
                                    <Draggable key={index} draggableId={index + ''} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={cl.list__item}
                                                key={id}>
                                                <Item value={value}
                                                    id={id}
                                                    isDone={isDone}
                                                    onClickDone={onClickDone}
                                                    updateItemValue={updateItemValue}
                                                    editMode={editMode}
                                                    activatedEditMode={activatedEditMode} />
                                                <DeleteButton onClickDelete={onClickDelete} id={id} /></div>
                                        )}
                                    </Draggable>
                                )
                            })
                        }
                        {provided.placeholder}
                    </ul >
                )}
            </Droppable>
        </DragDropContext>
    )
};
ItemList.defaultProps = {
    items: [{
        value: 'Sorry, no tasks found',
        isDone: false
    }]
};
ItemList.propTypes = {
    items: PropTypes.array.isRequired
};
export default ItemList;