import React from 'react';
import ProfItem from './ProfItem';
import ProfTotal from './ProfTotal';

function ProfList( { profItems} ) {
    return (
        <table id="prof-list">
            <caption>Your Profession List</caption>
            <thead>
                <tr>
                    <th></th>
                    <th>Name of Item</th>
                    <th>Current Price</th>
                    <th>Quantity</th>
                    <th>Item Total</th>
                </tr>
            </thead>
            <tbody>
                {profItems.map((item, i) => 
                    <ProfItem 
                        item={item} 
                        key={i}
                    />)}
            </tbody>
        </table>
    );
}

export default ProfList;