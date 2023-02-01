import React from 'react';
import { TbTrash, TbEdit } from 'react-icons/tb';

function priceToString(num) {
    let gold = Math.floor(num / 10000);
    let silver = Math.floor((num - gold * 10000) / 100);
    let copper = num - gold * 10000 - silver * 100;
    return(`${gold}g ${silver}s ${copper}c`);
}

function Item({ item, onEdit, onDelete }) {
    return (
        <tr>
            <td><img src={item.icon} width="50"></img></td>
            <td>{item.name}</td>
            <td>{item.itemID}</td>
            <td>{item.realm}</td>
            <td>{item.faction}</td>
            <td>{priceToString(item.currentPrice)}</td>
            <td>{priceToString(item.marketPrice)}</td>
            <td>{item.quantity}</td>
            <td>{priceToString(item.total)}</td>
            <td><TbEdit onClick={() => onEdit(item)} /></td>
            <td><TbTrash onClick={() => onDelete(item._id)} /></td>
        </tr>
    );
}

export default Item;