import React from 'react';
import PriceString from './PriceString';

function ProfTotal( { profItems }) {
    let totalCost = 0;
    for (let i = 0; i < profItems.length; i++) {
        totalCost = totalCost + (profItems[i]['currentPrice'] * profItems[i]['quantity']);
    }

    return(
        <>
        <table class="prof-total">
            <tbody>
            <td></td>
            <td></td>
            <td></td>
            <td>Total Cost</td>
            <PriceString price={totalCost}/>
            </tbody>
        </table>
        </>
        
    );
}

export default ProfTotal;