import React from 'react';

/**
 * SelectAward component - a dropdown menu that allows the user to filter papers by award status.
 *
 * This component allows the user to select whether they want to view all papers,
 * awarded papers, or non-awarded papers. The selected value is passed to the parent
 * component through the `handler` prop.
 *
 * @param {object} props - the component's props.
 * @param {string} props.selectAward - the current value of the dropdown menu.
 * @param {function} props.handler - a function to handle the dropdown menu selection.
 * 
 * @author Eridon Keta - 20044984.
 */

const SelectAward = (props) => {
    /**
     * onSelect is an event handler that updates the selected award status in the parent component 
     * whenever the value of the dropdown menu changes.
     * 
     * @param {Event} event - The change event of the dropdown menu.
     */
    const onSelect = (event) => {
        props.handler(event.target.value);
    };

    return (
        <div>
            <select value={props.selectAward} onChange={onSelect}>
                <option value="all">All</option>
                <option value="true">Awarded Papers</option>
                <option value="null">Non-Awarded Papers</option>
            </select>
        </div>
    );
};

export default SelectAward;

