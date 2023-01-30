import React from 'react';
// import { calcGold, calcSilver } from '../components/Item';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

function priceToString(num) {
    let gold = Math.floor(num / 10000);
    let silver = Math.floor((num - gold * 10000) / 100);
    let copper = num - gold * 10000 - silver * 100;
    return(`${gold}g ${silver}s ${copper}c`);
}

export const EditPage = ({ item }) => {
    // const [name, setName]                       = useState(item.name);
    // const [itemID, setItemID]                   = useState(item.itemID);
    const [currentPrice, setCurrentPrice]       = useState(item.currentPrice);
    // const [marketPrice, setMarketPrice]         = useState(item.marketPrice);
    // const [time, setTime]                       = useState(item.time);
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
        } else {
            const errMessage = await response.json();
            alert(`Could not update workout plan. Status ${response.status}. ${errMessage.Error}`);
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
                        <caption>Edit This Item's Quantity</caption>
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
                            <td><img src={item.icon} width="50"></img></td>
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
                            <td>
                                {priceToString(item.marketPrice)}
                            </td>
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