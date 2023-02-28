import React from 'react';
import { TbTrash, TbEdit } from 'react-icons/tb';

function priceToString(num) {
    let gold = Math.floor(num / 10000);
    let silver = Math.floor((num - gold * 10000) / 100);
    let copper = num - gold * 10000 - silver * 100;
    gold = (gold).toLocaleString('en-US', {useGrouping:true});
    silver = (silver).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    copper = (copper).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    return([gold, silver, copper]);
}

function Item({ item, onEdit, onDelete }) {
    let realm = item.realm.replaceAll("_", " ");
    const curPriceStrings = priceToString(item.currentPrice);
    const markPriceStrings = priceToString(item.marketPrice);
    const totalStrings = priceToString(item.total);

    return (
        <tr>
            <td><img src={item.icon} width="50" alt="item's icon"></img></td>
            <td>{item.name}</td>
            <td>{item.itemID}</td>
            <td>{realm}</td>
            <td>{item.faction}</td>
            <td>
                {curPriceStrings[0]}
                <img src='/images/Gold.webp' alt='gold icon'></img>
                <span> </span>
                {curPriceStrings[1]}
                <img src='/images/Silver.webp' alt='silver icon'></img>
                <span> </span>
                {curPriceStrings[2]}
                <img src='/images/Copper.webp' alt='copper icon'></img>
            </td>
            <td>
                {markPriceStrings[0]}
                <img src='/images/Gold.webp' alt='gold icon'></img>
                <span> </span>
                {markPriceStrings[1]}
                <img src='/images/Silver.webp' alt='silver icon'></img>
                <span> </span>
                {markPriceStrings[2]}
                <img src='/images/Copper.webp' alt='copper icon'></img>
            </td>
            <td>{item.quantity}</td>
            <td>
                <span>{totalStrings[0]}<img src='/images/Gold.webp' alt='gold icon'></img> </span>
                <span>{totalStrings[1]}<img src='/images/Silver.webp' alt='silver icon'></img> </span>
                <span>{totalStrings[2]}<img src='/images/Copper.webp' alt='copper icon'></img> </span>               
            </td>
            <td><TbEdit onClick={() => onEdit(item)} /></td>
            <td><TbTrash onClick={() => onDelete(item._id)} /></td>
        </tr>
    );
}

export default Item;