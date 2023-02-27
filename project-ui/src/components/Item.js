import React from 'react';
import { TbTrash, TbEdit } from 'react-icons/tb';

function priceToString(num) {
    let gold = Math.floor(num / 10000);
    let silver = Math.floor((num - gold * 10000) / 100);
    let copper = num - gold * 10000 - silver * 100;
    gold = (gold).toLocaleString('en-US', {useGrouping:true});
    silver = (silver).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    copper = (copper).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    return(`${gold}g ${silver}s ${copper}c`);
}

function Item({ item, onEdit, onDelete }) {
    let realm = item.realm.replaceAll("_", " ");
    return (
        <tr>
            <td><img src={item.icon} width="50" alt="item's icon"></img></td>
            <td>{item.name}</td>
            <td>{item.itemID}</td>
            <td>{realm}</td>
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