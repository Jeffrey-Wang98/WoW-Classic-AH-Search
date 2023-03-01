import React from 'react';
import priceToString from './priceToString';

function Total( {items }) {
    let totalCost = 0;
    for (let i = 0; i < items.length; i++) {
        totalCost = totalCost + items[i]['total']
    }
    const totalStrings = priceToString(totalCost)
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
            <td colSpan={2}>
                {totalStrings[0]}
                <img src='/images/Gold.webp' alt='gold icon'></img>
                <span> </span>
                {totalStrings[1]}
                <img src='/images/Silver.webp' alt='silver icon'></img>
                <span> </span>
                {totalStrings[2]}
                <img src='/images/Copper.webp' alt='copper icon'></img>
            </td>
            </tbody>
        </table>
        </>
        
    );
};

export default Total;