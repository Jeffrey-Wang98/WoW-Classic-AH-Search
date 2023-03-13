import React from 'react';
import ItemList from '../components/ItemList';
import { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Total from '../components/Total';
import LinkButton from '../components/LinkButton';

function HomePage({ setItem }) {
    // Use the history for updating
    const history = useHistory();

    // useState will get the data
    const [items, setItems] = useState([]);

    // Retrieve the shopping list
    const retrieve = async () => {
        const response = await fetch('/items');
        const items = await response.json();
        setItems(items);
    } 
    

    // Edit an Item
    const onEdit = async item => {
        setItem(item);
        history.push("/edit");
    }


    // delete an item
    const onDelete = async _id => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
        const response = await fetch(`/items/${_id}`, { method: 'DELETE' });
            if (response.status === 204) {
                const getResponse = await fetch('/items');
                const items = await getResponse.json();
                setItems(items);
            } else {
                console.error(`Could not remove item of _id = ${_id}, status code = ${response.status}`)
            }
        }
    }

    // Retrieve items
    useEffect(() => {
        retrieve();
    }, []);
    
    // send fetch POST request to item-controller
    const sendUpdateAllRequest = async (itemsJSON) => {
        const response = await fetch('/update-all', { 
            method: 'post', 
            body: JSON.stringify(itemsJSON),
            headers: {
                'Content-Type': 'application/json',
            }
        });
            if (response.status !== 200) {
                const errMessage = await response.json();
                alert(`Could not update all item prices. Status code = ${response.status}. ${errMessage.Error}`)
            }
            else {
                alert('Item prices were all updated!');
    
                window.location.reload();
            }
    }
    

    // Update ALL items
    const onUpdate = async () => {
        const question = 'Are you sure you want to update all item prices? This is a very costly request. This will also force-reset page, clearing any previous profession searches.';

        if (window.confirm(question)) {
            let itemsJSON = {}
            for (let i = 0; i < items.length; i ++) {
                itemsJSON[i] = items[i];
            }
            sendUpdateAllRequest(itemsJSON);            
        }
    }

    // Show item
    return (
        <>
            <article>
                <h2>Your Shopping List</h2>
                <p>
                    Here are all of the items you have searched up! To add more, please click on "Search Price" button below!
                    The professions tab will give you all of the prices of items you may need to level a specific profession.
                </p>
                <p>
                    To update all prices in your list, click "Update All" below the list to do so! 
                </p>
                <LinkButton to="../search">Search Price</LinkButton>
                <ItemList 
                    items={items} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                />
                <Total
                    items={items}
                />
                <button id="update-all" className='update-all' onClick={onUpdate}>Update All</button>
            </article>
        </>
    );
}

export default HomePage;