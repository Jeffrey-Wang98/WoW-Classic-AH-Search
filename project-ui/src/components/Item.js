import React from 'react';
import { TbTrash, TbEdit } from 'react-icons/tb';
import PriceString from './PriceString';

function Item({ item, onEdit, onDelete }) {
    let realm = item.realm.replaceAll("_", " ");

    return (
        <tr>
            <td><img src={item.icon} width="50" alt="item's icon"></img></td>
            <td>{item.name}</td>
            <td>{item.itemID}</td>
            <td>{realm}</td>
            <td>{item.faction}</td>
            <PriceString price={item.currentPrice} />
            <PriceString price={item.marketPrice} />
            <td>{item.quantity}</td>
            <PriceString price={item.total} />
            <td><TbEdit onClick={() => onEdit(item)} /></td>
            <td><TbTrash onClick={() => onDelete(item._id)} /></td>
        </tr>
    );
}

export default Item;