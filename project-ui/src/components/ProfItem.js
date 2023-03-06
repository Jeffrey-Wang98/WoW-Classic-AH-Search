import React from 'react';
import PriceString from './PriceString';

function ProfItem( { item }) {

    return(
        <tr>
            <td><img src={item.icon} width="50" alt="item's icon"></img></td>
            <td>{item.name}</td>
            <PriceString price={item.currentPrice}/>
            <td>{item.quantity}</td>
            <PriceString price={item.currentPrice * item.quantity}/>
        </tr>
    );
};

export default ProfItem;