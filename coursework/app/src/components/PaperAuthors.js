import React, { useState } from 'react';

/**
 * PaperAuthors Component  - displays the authors of a paper and its details.
 *
 * This component uses the useState hook to store the authors, loading status, and visibility of the paper details. 
 * It also includes a function to retrieve the authors from an API
 * and a function to map the authors array to a JSX element for each author.
 * 
 * @author Eridon Keta - 20044984.
 */

function PaperAuthors(props) {
    // Declare state variables.
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);

    /**
     * getAuthors is a function that retrieves the authors of a paper from an API and stores the data in the 'authors' state.
     * 
     * @param {object} props - the properties passed to the PaperAuthors component.
     * @param {array} authors - the array containing the data of the authors retrieved from the API.
     * @param {boolean} loading - a boolean value indicating if the data is still being retrieved from the API.
     */
    const getAuthors = () => {
        fetch("http://unn-w20044984.newnumyspace.co.uk/kf6012/coursework/api/authors?paper_id=" + props.data.paper_id)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setAuthors(json.data)
                setLoading(false)
            })
            .catch((e) => {
                console.log(e.message)
            });
    }

    /**
     * allAuthors is a variable that maps the authors array to a JSX element for each author.
     *
     * @param {array} authors - an array of authors to be mapped.
     * @returns {JSX} a JSX element for each author.
     */
    const allAuthors = authors.map(
        (value, key) => (
            <div key={key}>
                <span>{value.first_name} {value.last_name}, </span>
                <span>{value.institution}, {value.country}</span>
            </div>
        )
    );

    // Toggles the visibility of the paper details.
    const visibleDetails = () => {
        getAuthors();
        setVisible(!visible);
    };

    return (
        <div onClick={visibleDetails}>
            <h2>{props.data.title}</h2>
            {/* If the details are visible, render the abstract, authors, award status, and loading message */}
            {visible && <div>
                <p>
                    <strong>Abstract: </strong>{props.data.abstract}
                </p>
                <p>
                    <strong>Authors: </strong>{allAuthors}
                </p>
                <p>
                    <strong>Award Status: </strong>
                    {props.data.award === null ? 'None' : (props.data.award ? 'Awarded' : props.data.award)}
                </p>
                {loading && <p>Loading...</p>}
            </div>}
        </div>
    )
}


export default PaperAuthors;