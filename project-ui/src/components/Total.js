import React from 'react';
import PriceString from './PriceString';

function Total( {items }) {
    let totalCost = 0;
    for (let i = 0; i < items.length; i++) {
        totalCost = totalCost + items[i]['total']
    }
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
            <PriceString price={totalCost} colSpan={2}/>
            </tbody>
        </table>
        </>
        
    );
};

export default Total;