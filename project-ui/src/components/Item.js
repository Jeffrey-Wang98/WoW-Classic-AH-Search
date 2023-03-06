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
            {/* <td>
                {curPriceStrings[0]}
                <img src='/images/Gold.webp' alt='gold icon'></img>
                <span> </span>
                {curPriceStrings[1]}
                <img src='/images/Silver.webp' alt='silver icon'></img>
                <span> </span>
                {curPriceStrings[2]}
                <img src='/images/Copper.webp' alt='copper icon'></img>
            </td> */}
            <PriceString price={item.marketPrice} />
            {/* <td>
                {markPriceStrings[0]}
                <img src='/images/Gold.webp' alt='gold icon'></img>
                <span> </span>
                {markPriceStrings[1]}
                <img src='/images/Silver.webp' alt='silver icon'></img>
                <span> </span>
                {markPriceStrings[2]}
                <img src='/images/Copper.webp' alt='copper icon'></img>
            </td> */}
            <td>{item.quantity}</td>
            {/* <td>
                <span>{totalStrings[0]}<img src='/images/Gold.webp' alt='gold icon'></img> </span>
                <span>{totalStrings[1]}<img src='/images/Silver.webp' alt='silver icon'></img> </span>
                <span>{totalStrings[2]}<img src='/images/Copper.webp' alt='copper icon'></img> </span>               
            </td> */}
            <PriceString price={item.total} />
            <td><TbEdit onClick={() => onEdit(item)} /></td>
            <td><TbTrash onClick={() => onDelete(item._id)} /></td>
        </tr>
    );
}

export default Item;