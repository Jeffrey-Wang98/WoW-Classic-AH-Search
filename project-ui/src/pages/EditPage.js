import React from 'react';
import PriceString from '../components/PriceString';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

export const EditPage = ({ item }) => {
    const [currentPrice, setCurrentPrice]       = useState(item.currentPrice);
    const [quantity, setQuantity]                  = useState(item.quantity);
    
    const history = useHistory();

    const editItem = async () => {
        const response = await fetch(`/items/${item._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                currentPrice: currentPrice,
                quantity: quantity
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert("You edited your shopping list!");
        } 
        else {
            const errMessage = await response.json();
            alert(`Could not update item. Status ${response.status}. ${errMessage.Error}`);
        }
        history.push("/");
    }

    return (
        <>
        <article>
            <h2>Edit the current price and/or quantity of an item!</h2>
            <p>
                You can edit the current price and/or quantity of a previously added item in your list.
            </p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                    <table class="edit">
                        <caption>Edit This Item's Price or Quantity</caption>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name of Item</th>
                                <th>Item ID</th>
                                <th>Realm</th>
                                <th>Faction</th>
                                <th>Current Price</th>
                                <th>Market Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <td><img src={item.icon} width="50" alt="item's icon"></img></td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.itemID}     

                            </td>
                            <td>
                                {item.realm}
                            </td>
                            <td>
                                {item.faction}
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={currentPrice}
                                    placeholder="8g88s88c"
                                    size="10"
                                    min="0"
                                    onChange={e => setCurrentPrice(e.target.value)}
                                    id="currentPrice" />
                            </td>
                            <PriceString price={item.marketPrice} />
                            <td>
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="1"
                                    size="4"
                                    min="1"
                                    onChange={e => setQuantity(e.target.value)}
                                    id="quantity" />
                            </td>
                        </tbody>
                    </table>
                    <button
                        type="submit"
                        onClick={editItem}
                        id="submit"
                        >Save</button>
                </form>
            </article>
        </>
    );
}
export default EditPage;