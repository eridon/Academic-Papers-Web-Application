import React, { useState } from 'react';
import PaperAuthors from './PaperAuthors';
import SelectAward from './SelectAward';
import Search from './Search';
import Footer from './Footer';

/**
 * PapersPage Component - displays all the papers in the database that match the selected track, search term, and award.
 * 
 * This component uses the useState hook to store the selected track, search term, and award status. 
 * It also includes a function to search for a given term in the title and abstract of a paper 
 * and a function to filter the papers based on the selected award status.
 *
 * @author Eridon Keta - 20044984.
 */

function PapersPage(props) {
    // Declare state variables.
    const [searchTerm, setSearchTerm] = useState('');
    const [selectTrack, setSelectTrack] = useState('all');
    const [selectAward, setSelectAward] = useState('all');

    /**
     * searchPapers is a function that searches for a given term in the title and abstract of a paper.
     *
     * @param {object} value - the paper object to search.
     * @returns {boolean} true if the search term is found in the title or abstract, false otherwise.
     */
    const searchPapers = (value) => {
        const fullDetails = value.title + " " + value.abstract;
        return fullDetails.toLowerCase().includes(searchTerm.toLowerCase());
    }

    /**
     * filterByAward is a function that filters the papers based on the selected award status.
     *
     * @param {object} value - the paper object to filter.
     * @returns {boolean} true if the paper matches the selected award status, false otherwise.
     */
    const filterByAward = (value) => {
        return (
            (selectAward === 'all') ||
            (selectAward === 'null' && !value.award) ||
            (selectAward === 'true' && (value.award === true || value.award === 'true'))
        );
    }

    /**
     * allPapers is an array of JSX elements representing the papers that match the search and award filters.
     * 
     * @param {array} papers - an array of objects representing the papers to be displayed.
     * @param {function} searchPapers - a function that filters the papers based on the search term.
     * @param {function} filterByAward - a function that filters the papers based on the award status.
     * @returns {JSX} an array of JSX elements representing the filtered papers.
     */
    const allPapers = props.papers
        .filter(searchPapers)
        .filter(filterByAward)
        .map((value, key) => (
            <section key={value.paper_id}>
                <PaperAuthors data={value} />
            </section>
        ));

    /**
     * handleSelectTrack is a function that updates the state of the selectTrack variable.
     *
     * @param {string} track - the selected track value.
     */
    const handleSelectTrack = (track) => {
        setSelectTrack(track);
    };

    /**
     * handleSearch is a function that updates the state of the searchTerm variable.
     *
     * @param {string} term - the search term entered by the user.
     */
    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    /**
     * handleSelectAward is a function that updates the state of the selectAward variable.
     *
     * @param {string} award - the selected award value.
     */
    const handleSelectAward = (award) => {
        setSelectAward(award);
    };

    /**
     * Renders a message indicating that no papers were found.
     * @param {Array} allPapers - An array of papers.
     * @param {boolean} loading - A boolean representing the loading state of the component.
     * @return {JSX} - The JSX element to render.
     */
    const noPapersFoundMessage = (allPapers, loading) => {
        // If the length of allAuthors is 0 and the component is not loading, return the JSX element. Otherwise, return null.
        return allPapers.length === 0 && !loading && <p>No Papers Found.</p>;
    };

    return (
        <div>
            <h1>Welcome to the Papers Page</h1>
            <p>This page allows you to view a list of research papers that were presented at the CHI PLAY 2021 conference.
                You may also filter the papers by award status and search for specific papers using the search bar.
                Clicking on a paper will show you the full details including the abstract, associated authors, and award status.
            </p>
            <SelectAward
                selectAward={selectAward}
                handler={handleSelectAward}
            />
            <Search
                searchTerm={searchTerm}
                handler={handleSearch}
            />
            {props.loading && <p>Loading...</p>}
            {allPapers}
            {noPapersFoundMessage(allPapers, props.loading)}
            <Footer />
        </div>
    )
}

export default PapersPage;