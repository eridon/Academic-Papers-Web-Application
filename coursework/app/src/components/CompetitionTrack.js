import React, { useState } from 'react';
import PaperAuthors from './PaperAuthors';
import SelectAward from './SelectAward';
import Search from './Search';
import Footer from './Footer';

/**
 * CompetitionTrack Component - displays all the competition track papers in the database.
 * 
 * This component uses the useState hook to store the selected track, search term, and award.
 * It also includes SelectTrack, SelectAward, and Search components to allow the user to filter
 * the papers by track, award, and search term.
 * 
 * @author Eridon Keta - 20044984.
 */

function CompetitionTrack(props) {
    // Declare state variables
    const [selectTrack, setSelectTrack] = useState('competition');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectAward, setSelectAward] = useState('all');

    /**
     * searchPapers - Filters papers based on a search term.
     *
     * @param {Object} value - The paper object to filter.
     * @returns {Boolean} - True if the search term is found in the paper's title or abstract, false otherwise.
     */
    const searchPapers = (value) => {
        const fullDetails = value.title + " " + value.abstract;
        return fullDetails.toLowerCase().includes(searchTerm.toLowerCase());
    };

    /**
     * selectPapers - Filters papers based on the selected track.
     *
     * @param {Object} value - The paper object to filter.
     * @returns {Boolean} - True if the paper's short_track matches the selected track, false otherwise.
     */
    const selectPapers = (value) => (
        // Check if the value has a short_track and if it matches the selected track.
        value.short_track && value.short_track.toLowerCase() === selectTrack.toLowerCase()
    );

    /**
     * filterByAward - Filters papers based on the selected award.
     *
     * @param {Object} value - The paper object to filter.
     * @returns {Boolean} - True if the paper's award matches the selected award, false otherwise.
     */
    const filterByAward = (value) => {
        return (
            (selectAward === 'all') ||
            (selectAward === 'null' && !value.award) ||
            (selectAward === 'true' && (value.award === true || value.award === 'true'))
        );
    };

    /**
     * allPapers - Maps the filtered papers to JSX elements.
     *
     * @param {Array} papers - The list of papers to map.
     * @returns {Array} - The list of JSX elements.
     */
    const allPapers = props.papers.filter(searchPapers).filter(selectPapers).filter(filterByAward).map(
        (value, key) => <section key={key}>
            <PaperAuthors data={value} />
        </section>
    );

    /**
     * Event handler for when the user selects an award from the dropdown menu.
     * 
     * @param {string} award - the selected award value.
     */
    const handleSelectAward = (award) => {
        setSelectAward(award);
    }

    /**
     * Event handler for when the user selects a track from the dropdown menu.
     * 
     * @param {string} short_track - the selected track value.
     */
    const handleSelectTrack = (short_track) => {
        setSelectTrack(short_track);
    }

    /**
     * Event handler for when the user searches for a paper using the search bar.
     * 
     * @param {string} term - the search term entered by the user.
     */
    const handleSearch = (term) => {
        setSearchTerm(term);
    }

    /**
     * Function to capitalize the first letter of the track name.
     * 
     * @param {string} selectTrack - the current track value.
     * @returns {string} - the capitalized track value.
     */
    const capitalisedTrack = selectTrack.charAt(0).toUpperCase() + selectTrack.slice(1);

    /**
     * Renders a message indicating that no papers were found.
     * @param {Array} allPapers - An array of papers.
     * @return {JSX} - The JSX element to render.
     */
    const noPapersFoundMessage = (allPapers) => {
        // If the length of allPapers is 0, return the JSX element. Otherwise, return null.
        return allPapers.length === 0 && <p>No Papers Found</p>;
    };

    return (
        <div>
            {/* Display the selected track in the page title */}
            <h1>{capitalisedTrack} Papers</h1>
            <p>
                This page allows you to view a list of Student Game Design Competition Papers that were presented at the CHI PLAY 2021 conference.
                You may also filter the papers by award status and search for specific papers using the search bar.
                Clicking on a paper will show you the full details including the abstract, associated authors, and award status.
            </p>
            {/* Render the SelectAward and SelectTrack components */}
            <SelectAward selectAward={selectAward} handler={handleSelectAward} />
            <Search searchTerm={searchTerm} handler={handleSearch} />
            {props.loading && <p>Loading...</p>}
            {allPapers}
            {noPapersFoundMessage(allPapers)}
            <Footer />
        </div>
    )

}

export default CompetitionTrack;
