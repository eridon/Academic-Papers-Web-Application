import React, { useState } from 'react';

/**
 * UpdateAward is a functional component that receives props as an argument.
 * 
 * This component is responsible for updating the award field in the database for a specific paper 
 * when the user selects a new value from the dropdown menu. 
 * 
 * @param {Object} props - The props object passed to the component.
 * @param {Object} props.paper - The paper object that needs to be updated.
 * @param {function} props.handleUpdate - A function that updates the papers data in the parent component.
 * 
 * @author Eridon Keta - 20044984.
 */

function UpdateAward(props) {

    // Declare the state variable.
    const [award, setAward] = useState(props.paper.award ? 'true' : 'null');
    /**
     * handleSelect is an event handler that updates the award field in the database for a specific paper,
     * It sends a POST request to the update API route with the paper_id and the new award value.
     * 
     * @param {Event} event - The change event of the dropdown menu.
     */
    const handleSelect = (event) => {
        // Update the award state variable
        setAward(event.target.value);
        // Create a new FormData object to store the paper_id and award value.
        const formData = new FormData();
        formData.append('award', event.target.value);
        formData.append('paper_id', props.paper.paper_id);

        // Retrieve the token from local storage
        const token = localStorage.getItem('token');

        // Send a POST request to the update API route with the form data and the authorization header.
        fetch("http://unn-w20044984.newnumyspace.co.uk/kf6012/coursework/api/update", {
            method: 'POST',
            headers: new Headers({ "Authorization": "Bearer " + token }),
            body: formData
        })
            .then((response) => response.text())
            .then((json) => {
                console.log(json)
                props.handleUpdate();
            })
            .catch((e) => {
                console.log(e.message)
            })
    }

    // Render the paper title and the dropdown menu.
    return (
        <div>
            {props.paper.title}
            <select value={award} onChange={handleSelect}>
                <option value="true">Awarded</option>
                <option value="null">Non-Awarded</option>
            </select>
        </div>
    )
}

export default UpdateAward;
