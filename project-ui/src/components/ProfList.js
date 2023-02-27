import React from 'react';
import ProfItem from './ProfItem';

function ProfList( { profItems, profession, realm, faction} ) {
    let tableCaption = ``;
    if (profession === '' || realm === '' || faction === '') {
        tableCaption = 'Your Profession List Here';
    }
    else {
        realm = realm.replaceAll("_", " ");
        tableCaption = `Your ${profession} List for ${realm} - ${faction}`;
    }
    return (
        <table id="prof-list">
            <caption>{tableCaption}</caption>
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