import React from 'react';

function priceToString(num) {
    let gold = Math.floor(num / 10000);
    let silver = Math.floor((num - gold * 10000) / 100);
    let copper = num - gold * 10000 - silver * 100;
    return(`${gold}g ${silver}s ${copper}c`);
}


function Total( {items }) {
    let totalCost = 0;
    for (let i = 0; i < items.length; i++) {
        totalCost = totalCost + items[i]['total']
    }
    const totalStr = priceToString(totalCost)
    return(
        <>
        <table class="total">
            <tbody>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td colSpan={2}>Total Cost</td>
            <td colSpan={2}>{totalStr}</td>
            </tbody>
        </table>
        </>
        
    );
};

export default Total;