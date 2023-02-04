import React, { useState, useEffect } from 'react';
import Footer from './Footer';

/**
 * AuthorsPage component that displays all the authors in the database.
 * 
 * This component uses the useState and useEffect hooks to fetch the authors 
 * from the API and display them on the page. It also includes a search bar
 * that allows the user to filter the authors by name.
 * 
 * @param {Array} authors - an array of author objects retrieved from the API.
 * @param {boolean} loading - a boolean representing the loading state of the component.
 * @param {string} searchTerm - a string representing the search term entered by the user.
 * 
 * @author Eridon Keta - 20044984.
 */

const AuthorsPage = () => {
    // Declare state variables.
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch the authors from the API when the component mounts.
    useEffect(() => {
        fetch('http://unn-w20044984.newnumyspace.co.uk/kf6012/coursework/api/authors')
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                setAuthors(json.data);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, []);

    /**
     * Search function that filters the list of authors by name.
     * 
     * @param {object} value - the author object being filtered.
     * @param {string} value.first_name - the first name of the author.
     * @param {string} value.last_name - the last name of the author.
     * @returns {boolean} - true if the author's name includes the search term, false otherwise.
     */
    const searchAuthor = (value) => {
        const fullname = value.first_name.toLowerCase() + ' ' + value.last_name.toLowerCase();
        // Check if the search term is included in the full name.
        return fullname.includes(searchTerm.toLowerCase());
    };

    /**
     * Map function that creates JSX elements for the filtered authors.
     * 
     * @param {object} value - the author object being mapped.
     * @param {string} value.first_name - the first name of the author.
     * @param {string} value.last_name - the last name of the author.
     * @param {number} key - the index of the current element in the array.
     * @returns {JSX.Element} - a JSX element representing the author.
     */
    const allAuthors = authors.filter(searchAuthor).map((value, key) => (
        <div className="author-card" key={key}>
            <h3>{value.first_name} {value.last_name}</h3>
            <p><strong>Institution: </strong>{value.institution}</p>
            <p><strong>Country: </strong>{value.country}</p>
        </div>
    ));

    /**
     * This function updates the searchTerm state variable with the value of the input element.
     * 
     * @param {object} event - the event object of the input element.
     */
    const onChange = (event) => setSearchTerm(event.target.value);

    /**
     * Renders a message indicating that no authors were found.
     * @param {Array} allAuthors - An array of authors.
     * @param {boolean} loading - A boolean representing the loading state of the component.
     * @return {JSX} - The JSX element to render.
     */
    const noAuthorsFoundMessage = (allAuthors, loading) => {
        // If the length of allAuthors is 0 and the component is not loading, return the JSX element. Otherwise, return null.
        return allAuthors.length === 0 && !loading && <p>No Authors Found.</p>;
    };

    return (
        <div>
            <h1>Welcome to the Authors Page</h1>
            <p>
                This page allows you to view all the authors in our database and filter the list by name using the search bar.
                Additional information about the authors' affiliation, such as their institution and country, is also included.
            </p>
            <input value={searchTerm} onChange={onChange} placeholder="Click Here to Search" />
            {loading && <p>Loading...</p>}
            <div className="author-cards-container">
                {allAuthors}
                {noAuthorsFoundMessage(allAuthors, loading)}
            </div>
            <Footer />
        </div>
    );
};

export default AuthorsPage;
