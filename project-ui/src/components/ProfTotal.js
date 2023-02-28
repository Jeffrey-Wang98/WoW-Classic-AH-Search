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

function ProfTotal( { profItems }) {
    let totalCost = 0;
    for (let i = 0; i < profItems.length; i++) {
        totalCost = totalCost + (profItems[i]['currentPrice'] * profItems[i]['quantity']);
    }
    const costStrings = priceToString(totalCost);

    return(
        <>
        <table class="prof-total">
            <tbody>
            <td></td>
            <td></td>
            <td></td>
            <td>Total Cost</td>
            <td>
                {costStrings[0]}
                <img src='/images/Gold.webp' alt='gold icon'></img>
                <span> </span>
                {costStrings[1]}
                <img src='/images/Silver.webp' alt='silver icon'></img>
                <span> </span>
                {costStrings[2]}
                <img src='/images/Copper.webp' alt='copper icon'></img>
            </td>
            </tbody>
        </table>
        </>
        
    );
}

export default ProfTotal;