import React from 'react';
import ItemList from '../components/ItemList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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
        else {
            // Do nothing!
        }
        
    }

    // Retrieve items
    useEffect(() => {
        retrieve();
    }, []);

    // Show item
    return (
        <>
            <article>
                <h2>Your Shopping List</h2>
                <p>
                    Here are all of the items you have searched up! To add more, please click on "Search Price" button above!
                    The professions tab will give you all of the prices of items you may need to level a specific profession.
                </p>
                <ItemList 
                    items={items} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                />
            </article>
        </>
    );
}

export default HomePage;