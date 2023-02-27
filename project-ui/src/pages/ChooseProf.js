import React, { useState } from 'react';
import { useHistory } from "react-router-dom";


export const ChooseProf = ( {profItems, setProfItems} ) => {

    const [realm, setRealm]                     = useState('');
    const [faction, setFaction]                 = useState('');
    const [prof, setProf]                       = useState('');

    const history = useHistory();

    const auctionHouseList = {
        Atiesh: [279, 280],
        Myzrael: [281, 282],
        Old_Blanchy: [283, 284],
        Azuresong: [285, 286],
        Mankrik: [287, 288],
        Pagle: [289, 290],
        Ashkandi: [293, 294],
        Westfall: [295, 296],
        Whitemane: [297, 298],
        Faerlina: [311, 312],
        Grobbulus: [317, 318],
        Bloodsail_Buccaneers: [319, 320],
        Remulos: [321, 322],
        Arugal: [323, 324],
        Yojamba: [325, 326],
        Sulfuras: [343, 344],
        Windseeker: [345, 346],
        Benediction: [347, 348],
        Earthfury: [351, 352],
        Skyfury: [461, 462],
        Maladath: [463, 464],
        Eranikus: [471, 472],
        Angerforge: [473, 474]
    };

    const alchemy = {
        0: { 
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_evergreenmoss.jpg',
            name: "Adder's Tongue",
            itemId: 36903,
            quantity: 80
        },
        1: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_potion_07.jpg',
            name: "Pygmy Oil",
            itemId: 40195,
            quantity: 80
        },
        2: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_whispervine.jpg',
            name: "Lichbloom",
            itemId: 36905,
            quantity: 80
        }
    }

    const blacksmithing = {
        0: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_whispervine.jpg',
            name: "Lichbloom",
            itemId: 36905,
            quantity: 80
        },
        1: {
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_potion_07.jpg',
            name: "Pygmy Oil",
            itemId: 40195,
            quantity: 80
        },
        2: { 
            icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_misc_herb_evergreenmoss.jpg',
            name: "Adder's Tongue",
            itemId: 36903,
            quantity: 80
        }
    }

    const chooseProf = async () => {
        const newProf = { realm, faction, prof };
        if (realm === "" || faction === "" || prof === "") {
            alert("Please enter a valid Realm, Faction, and/or Profession.")
        }
        else {
            // console.log(newProf);
            // console.log(setProfItems);
            let items = []
            let selectedArray = [];
            if ( prof === 'Alchemy' ) {
                selectedArray = alchemy;
                // console.log('Alchemy');
            }
            else if ( prof === 'Blacksmithing' ) {
                selectedArray = blacksmithing;
                // console.log('Blacksmithing');
            }

            // console.log(items);
            
            // console.log(profItems)
            // console.log(setProfItems)
            
            // Set auctionHouseID
            let auctionHouseID = 298;
            if (faction === "Alliance") {
                // console.log(auctionHouseList[req.body.realm][0]);
                auctionHouseID = auctionHouseList[realm][0];
            }
            else {
                // console.log(auctionHouseList[req.body.realm][1]);
                auctionHouseID = auctionHouseList[realm][1];
            }

            let itemsForMicro = [];
            for (let i in selectedArray) {
                let item = {
                    icon: selectedArray[i].icon,
                    name: selectedArray[i].name,
                    itemId: selectedArray[i].itemId,
                    auctionHouseId: auctionHouseID,
                    quantity: selectedArray[i].quantity,
                };
                // console.log(item);
                itemsForMicro.push(item);
            }
            let apiPrices = await fetch(
                "http://localhost:9000", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/JSON'
                    },
                    mode: 'cors',
                    body: JSON.stringify(itemsForMicro)
                })
            
            if (apiPrices.status === 200) {
                alert("Your profession list has been generated!");
                apiPrices = await apiPrices.json();
                // console.log(apiPrices);

                for (let i in selectedArray) {
                    let item = {
                        icon: selectedArray[i].icon,
                        name: selectedArray[i].name,
                        currentPrice: apiPrices[i],
                        quantity: selectedArray[i].quantity,
                    };
                    // console.log(item);
                    items.push(item);
                }

                setProfItems(JSON.parse(JSON.stringify(items)));
            }
            else {
                alert("There was an error preventing the generation of the professsion list.")
            }

            history.push('/professions');
        }
        
        // Select which profession JSON to send
        // Add the auction house ID to the JSON
        // Send that JSON to micro-service on http://localhost:4000
        // Take that response and make new JSON with quantity
        // give that JSON to setProfItems

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
                    <caption>Choose Your Profession!</caption>
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