import React from 'react';
/**
 * Search is a functional component that receives props as an argument.
 * 
 * This component is responsible for rendering an input field that allows the user to filter papers by search term.
 * 
 * @param {Object} props - The props object passed to the component.
 * @param {function} props.handler - A function that updates the search term in the parent component.
 * @param {string} props.searchTerm - The current search term.
 * 
 * @author Eridon Keta - 20044984.
 */

function Search(props) {
    /**
     * onChange is an event handler that updates the search term in the parent component.
     * 
     * @param {Event} event - The change event of the input field.
     */
    const onChange = (event) => props.handler(event.target.value);

    return (
        <input value={props.searchTerm} onChange={onChange} placeholder="Click Here to Search"
            className="search-bar" />
    )
}

export default Search;