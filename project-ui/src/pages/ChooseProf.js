import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import alchemy from '../data/alchemy.json';
import blacksmithing from '../data/blacksmithing.json';
import enchanting from '../data/enchanting.json';
import inscription from '../data/inscription.json';
import engineering from '../data/engineering.json';
import jewelcrafting from '../data/jewelcrafting.json';
import leatherworking from '../data/leatherworking.json';
import tailoring from '../data/tailoring.json';
import cooking from '../data/cooking.json';
import firstAid from '../data/firstAid.json';
import auctionHouseList from '../data/auctionHouseList.json';


export const ChooseProf = ( { chooseParams } ) => {
    
    const setProfItems = chooseParams[0];
    const setProfession = chooseParams[1];
    const realm = chooseParams[2];
    const faction = chooseParams[3];
    const setRealm = chooseParams[4];
    const setFaction = chooseParams[5];

    const [prof, setProf] = useState('');

    const history         = useHistory();

    const chooseArray = () => {
        switch (prof) {
            case 'Alchemy':
                return alchemy;
            case 'Blacksmithing':
                return blacksmithing;
            case 'Enchanting':
                return enchanting;
            case 'Engineering':
                return engineering;
            case 'Inscription':
                return inscription;
            case 'Jewelcrafting':
                return jewelcrafting;
            case 'Leatherworking':
                return leatherworking;
            case 'Tailoring':
                return tailoring;
            case 'Cooking':
                return cooking;
            case 'First Aid':
                return firstAid;
            default:
                return [];
        }
    }

    // calls micro-service to get json of all prices in same order as items given
    const getPrices = async (itemsForMicro) => {
        return fetch(
        "http://localhost:9000", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            mode: 'cors',
            body: JSON.stringify(itemsForMicro)
        });
    }


    // Get auctionHouseID
    const getAHID = () => {
        if (faction === "Alliance") {
            return auctionHouseList[realm][0];
        }
        else {
            return auctionHouseList[realm][1];
        }
    }

    // set profItems to generated list
    const sendProf = async ( apiPrices, selectedArray ) => {
        let items = []
        apiPrices = await apiPrices.json();
            for (let i in selectedArray) {
                let item = {
                    icon: selectedArray[i].icon,
                    name: selectedArray[i].name,
                    currentPrice: apiPrices[i],
                    quantity: selectedArray[i].quantity,
                };
                items.push(item);
            }
            setProfItems(JSON.parse(JSON.stringify(items)));
    }

    const createListForMicro = (selectedArray, auctionHouseID) => {
        let itemsForMicro = [];
            for (let i in selectedArray) {
                let item = {
                    itemId: selectedArray[i].itemId,
                    auctionHouseId: auctionHouseID
                };
                itemsForMicro.push(item);
            }
        return itemsForMicro;
    }

    const checkError = (apiPrices, selectedArray) => {
        if (apiPrices.status === 200) {
            alert("Your profession list has been generated!");
            sendProf(apiPrices, selectedArray);
        }
        else {
            alert("There was an error preventing the generation of the professsion list.")
        }
    }

    // generate profession item price list
    const chooseProf = async () => {
        if (realm === "" || faction === "" || prof === "") {
            alert("Please enter a valid Realm, Faction, and/or Profession.")
        }
        else {
            setProfession(prof);
            const selectedArray = chooseArray();
            
            // Set auctionHouseID
            const auctionHouseID = getAHID();            

            // create list to send to micro-service
            const listForMicro = createListForMicro(selectedArray, auctionHouseID);
            let apiPrices = await getPrices(listForMicro);

            // handle success or errors
            checkError(apiPrices, selectedArray);
            
            history.push('/professions');
        }
    }

    return(
        <article>
            <h2>Choose Your Realm, Faction, and Profession!</h2>
            <p>
                Please choose the Realm and Faction your character is in and which profession
                you want to level from 1 to 450.
            </p>
            <form onSubmit={(e)=>{e.preventDefault();}}>
                <table class="choose">
                    <thead>
                        <tr>
                            <th>Realm Name</th>
                            <th>Faction</th>
                            <th>Profession</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>
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
                            <select
                                name="profession"
                                id="profession"
                                onChange={e => setProf(e.target.value)}
                            >
                                <option disable selected value class="empty">-Select a Profession-</option>
                                <option value="Alchemy">Alchemy</option>
                                <option value="Blacksmithing">Blacksmithing</option>
                                <option value="Enchanting">Enchanting</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Inscription">Inscription</option>
                                <option value="Jewelcrafting">Jewelcrafting</option>
                                <option value="Leatherworking">Leatherworking</option>
                                <option value="Tailoring">Tailoring</option>
                                <option value="Cooking">Cooking</option>
                                <option value="First Aid">First Aid</option>
                            </select>
                        </td>
                    </tbody>
                </table>
                <button
                    type="submit"
                    onClick={chooseProf}
                    id="submit"
                >Choose</button>
            </form>
        </article>
    );
}

export default ChooseProf;