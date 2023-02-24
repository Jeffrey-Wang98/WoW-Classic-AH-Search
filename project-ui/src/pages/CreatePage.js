import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

// const app = express();


export const CreatePage = () => {

    const [realm, setRealm]                     = useState('');
    const [itemID, setItemID]                   = useState('');
    const [faction, setFaction]                 = useState('');
    const [quantity, setQuantity]               = useState('');
    
    const history = useHistory();

    const addItem = async () => {
        const newItem = { realm, faction, itemID, quantity};
        const response = await fetch('/items', {
            method: 'post',
            body: JSON.stringify(newItem),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Added a new item!");
        } 
        // else if (response.status === 404){
        //     alert(`Item does not exist or is not in the auction house. Please check if item ID is valid, status code = ${response.status}`);
        // }
        // else if (response.status === 400){
        //     alert(`Please enter the realm and faction or quantity, status code = ${response.status}`);
        // }
        // else {
        //     alert(`Could not add the item, status code = ${response.status}`);
        // }
        else{
            const errMessage = await response.json();
            alert(`Could not search item. Status ${response.status}. ${errMessage.Error}`);
        }        
        history.push("/");
    };


    return (
        <>
        <article>
            <h2>Add a new item to your WoW shopping list!</h2>
            <p>
                You can search for an item you want to buy here! 
                Please input the item ID by looking it up on <Link to={{ pathname: "https://wowhead.com/wotlk" }} target="_blank">wowhead.com/wotlk (new tab)</Link>. 
                Choose the realm and faction of the auction house from which you want to look up price.
                Set the quantity to know how much it will cost to buy x amount of that item.
            </p>
            <div>
            <img src="/images/example.png" width="1000"></img>
            </div>
            <form onSubmit={(e) => { e.preventDefault();}}>
                    <table class="create">
                        <thead>
                            <tr>
                                <th>Realm Name</th>
                                <th>Faction</th>
                                <th>Item ID</th>
                                <th>Quantity</th>
                                {/* <th>Market Price</th>
                                <th>Search Time</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            <td>
                                {/* <input
                                    type="text"
                                    placeholder="Realm Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)} 
                                    id="name" /> */}
                                <select 
                                    name="realm"
                                    id="realm"
                                    onChange={e => setRealm(e.target.value)}
                                >
                                    <option disable selected value class="empty">-Select a Realm-</option>
                                    <option value="Atiesh">Atiesh</option>
                                    <option value="Myzrael">Myzrael</option>
                                    <option value="Old_Blanchy">Old Blanchy</option>
                                    <option value="Azuresong">Azuresong</option>
                                    <option value="Mankrik">Mankrik</option>
                                    <option value="Pagle">Pagle</option>
                                    <option value="Ashkandi">Ashkandi</option>
                                    <option value="Westfall">Westfall</option>
                                    <option value="Whitemane">Whitemane</option>
                                    <option value="Faerlina">Faerlina</option>
                                    <option value="Grobbulus">Grobbulus</option>
                                    <option value="Bloodsail_Buccaneers">Bloodsail Buccaneers</option>
                                    <option value="Remulos">Remulos</option>
                                    <option value="Arugal">Arugal</option>
                                    <option value="Yojamba">Yojamba</option>
                                    <option value="Sulfuras">Sulfuras</option>
                                    <option value="Windseeker">Windseeker</option>
                                    <option value="Benediction">Benediction</option>
                                    <option value="Earthfury">Earthfury</option>
                                    <option value="Skyfury">Skyfury</option>
                                    <option value="Maladath">Maladath</option>
                                    <option value="Angerforge">Angerforge</option> 
                                </select>
                            </td>
                            <td>
                                <select
                                    name="faction"
                                    id="faction"
                                    onChange={e => setFaction(e.target.value)}
                                >
                                    <option disable selected value class="empty">-Select a Faction-</option>
                                    <option value="Alliance">Alliance</option>
                                    <option value="Horde">Horde</option>

                                </select>    
                            </td>
                            <td>
                                <input
                                    type="number"
                                    placeholder='18231'
                                    value={itemID}
                                    min="0"
                                    size="8"
                                    onChange={e => setItemID(e.target.value)} 
                                    id="itemID" />      
                            </td>
                            <td>
                                <input
                                    type="number"
                                    placeholder='1'
                                    value={quantity}
                                    size="10"
                                    min="1"
                                    onChange={e => setQuantity(e.target.value)}
                                    id="quantity" />
                            </td>
                            {/* <td>
                                <input
                                    type="date"
                                    value={time}
                                    onChange={e => setTime(e.target.value)}
                                    id="time" />
                            </td> */}
                        </tbody>
                    </table>
                    <button
                        type="submit"
                        onClick={addItem}
                        id="submit"
                        >Add</button>
            </form>
            </article>
        </>
    );
}

export default CreatePage;