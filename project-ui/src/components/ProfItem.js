import React from 'react';

function priceToString(num) {
    let gold = Math.floor(num / 10000);
    let silver = Math.floor((num - gold * 10000) / 100);
    let copper = num - gold * 10000 - silver * 100;
    gold = (gold).toLocaleString('en-US', {useGrouping:true});
    silver = (silver).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    copper = (copper).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    return([gold, silver, copper]);
}

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