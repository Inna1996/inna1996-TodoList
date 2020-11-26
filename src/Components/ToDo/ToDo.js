import React, { useState } from 'react';
import InputItem from './InputItem/InputItem';
import Filter from './Filter/Filter';
import ItemList from './ItemList/ItemList';
import cl from './ToDo.module.css';
import translate from './../../i18n/translate';
import useLocalStorage from './../../Hooks/useLocalStorage';

const ToDo = () => {

    const state = {
        items: [
            {
                value: 'neues App erstellen',
                isDone: true,
                id: 1
            },
        ],
        filter: 'all',
        invalidValue: false,
    };

    const [items, setItems] = useLocalStorage('items', state.items);

    const [filter, setFilter] = useLocalStorage('filter', state.filter);
    const [invalidValue, setInvalidValue] = useState(state.invalidValue);

    const onClickDone = id => {
        const newItemList = items.map(item => {
            const newItem = { ...item };
            if (item.id === id) {

                newItem.isDone = !item.isDone;
            }
            return newItem;
        });
        setItems(newItemList);
    };

    const onClickDelete = id => {
        const newItem = items.filter(el => el.id !== id);
        setItems(newItem)
    }

    const [num, setNum] = useState(items.length + 1);

    const onClickAdd = value => {
        if (value !== '') {
            setNum(num + 1);
            console.log(num)
            const newItem = [
                ...items,
                {
                    id: num,
                    isDone: false,
                    value: value
                }
            ];
            setInvalidValue(false);
            setItems(newItem);
        } else {
            setInvalidValue(true);
        }
    }

    const onClickSetActive = value => setFilter(value);

    const updateItemValue = (value, id) => {
        const newItemList = items.map(item => {
            const newItem = { ...item };
            if (item.id === id) {
                newItem.value = value;
            }
            return newItem;
        });
        setItems(newItemList);
    };
    const translateApp = id => translate(id);


    const handleOnDragEnde = ({ destination, source }) => {
        if (!destination) return;
        if (destination.index === source.index && destination.droppableId === source.droppableId) return;

        const itemsArr = Array.from(items);
        const [reorderedItem] = itemsArr.splice(source.index, 1);
        itemsArr.splice(destination.index, 0, reorderedItem);

        setItems(itemsArr);
        console.log(itemsArr)

    };


    let filteredItems = [];
    if (filter === 'all') filteredItems = items;
    if (filter === 'activ') filteredItems = items.filter(item => !item.isDone);
    if (filter === 'completed') filteredItems = items.filter(item => item.isDone);

    return (
        <div className={cl.wrapper}>
            <div className={cl.header_wrapper}>
                <header className={cl.header}>{translate('headerList')}</header>
                <Filter filter={filter} translateApp={translateApp}
                    onClickSetActive={onClickSetActive} items={items} />
            </div>
            <InputItem onClickAdd={onClickAdd} translateApp={translateApp}
                items={items} invalidValue={invalidValue} />
            <ItemList items={filteredItems}
                onClickDelete={onClickDelete}
                onClickDone={onClickDone}
                updateItemValue={updateItemValue}
                handleOnDragEnde={handleOnDragEnde} />
        </div>
    )
};
export default ToDo;