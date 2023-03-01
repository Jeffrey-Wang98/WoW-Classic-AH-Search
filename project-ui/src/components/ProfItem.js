import React from 'react';
import priceToString from './priceToString';

function ProfItem( { item }) {
    const priceStrings = priceToString(item.currentPrice);
    const totalStrings = priceToString(item.currentPrice * item.quantity);

    return(
        <tr>
            <td><img src={item.icon} width="50" alt="item's icon"></img></td>
            <td>{item.name}</td>
            <td>
                {priceStrings[0]}
                <img src='/images/Gold.webp' alt='gold icon'></img>
                <span> </span>
                {priceStrings[1]}
                <img src='/images/Silver.webp' alt='silver icon'></img>
                <span> </span>
                {priceStrings[2]}
                <img src='/images/Copper.webp' alt='copper icon'></img>
            </td>
            <td>{item.quantity}</td>
            <td>
                {totalStrings[0]}
                <img src='/images/Gold.webp' alt='gold icon'></img>
                <span> </span>
                {totalStrings[1]}
                <img src='/images/Silver.webp' alt='silver icon'></img>
                <span> </span>
                {totalStrings[2]}
                <img src='/images/Copper.webp' alt='copper icon'></img>
            </td>
        </tr>
    );
};

export default ProfItem;