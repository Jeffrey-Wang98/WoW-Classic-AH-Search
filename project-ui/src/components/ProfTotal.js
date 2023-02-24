import React from 'react';

function priceToString(num) {
    let gold = Math.floor(num / 10000);
    let silver = Math.floor((num - gold * 10000) / 100);
    let copper = num - gold * 10000 - silver * 100;
    gold = (gold).toLocaleString('en-US', {useGrouping:true});
    silver = (silver).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    copper = (copper).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    return(`${gold}g ${silver}s ${copper}c`);
}

function ProfTotal( { profItems }) {
    let totalCost = 0;
    for (let i = 0; i < profItems.length; i++) {
        totalCost = totalCost + (profItems[i]['currentPrice'] * profItems[i]['quantity']);
    }
    const totalStr = priceToString(totalCost)

    return(
        <>
        <table class="prof-total">
            <tbody>
            <td></td>
            <td></td>
            <td></td>
            <td>Total Cost</td>
            <td>{totalStr}</td>
            </tbody>
        </table>
        </>
        
    );
}

export default ProfTotal;