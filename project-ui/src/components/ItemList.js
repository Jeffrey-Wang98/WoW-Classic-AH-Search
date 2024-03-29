import React from 'react';
import Item from './Item';

function ItemList({ items, onDelete, onEdit }) {
    return (
        <table id="list">
            <thead>
                <tr>
                    <th></th>
                    <th>Name of Item</th>
                    <th>ID</th>
                    <th>Realm</th>
                    <th>Faction</th>
                    <th>Current Price</th>
                    <th>Market Price</th>
                    <th>Quantity</th>
                    <th>Item Total</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, i) => 
                    <Item 
                        item={item} 
                        key={i}
                        onEdit={onEdit} 
                        onDelete={onDelete}
                    />)}
            </tbody>
        </table>
    );
}

export default ItemList;
