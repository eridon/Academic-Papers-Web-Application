import React, { useState, useEffect } from 'react';
import UpdateAward from './UpdateAward';
import Footer from './Footer';
import { Buffer } from 'buffer';

/**
 * AdminPage is a functional component that displays a page for administering the awards of papers.
 * 
 * This page allows the user to sign in and out, view a list of papers and their current award status,
 * as well as update the award status of individual papers.
 * 
 * @param {object} props - the component's props.
 * @param {array} props.papers - an array of objects representing papers and their metadata.
 * @param {boolean} props.authenticated - a boolean indicating whether the user is signed in.
 * @param {function} props.handleAuthenticated - a function to update the value of the `authenticated` prop.
 * @param {function} props.handleUpdate - a function to update the award status of a paper in the `papers` array.
 * 
 * @author Eridon Keta - 20044984.
 */

function AdminPage(props) {
    // Declare the state variables.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [papers, setPapers] = useState(props.papers);

    // Check if there is a valid token in local storage when the component mounts.
    useEffect(
        () => {
            if (localStorage.getItem('token')) {
                // If there is a valid token, set the authenticated prop to true.
                props.handleAuthenticated(true)
            }
        }
        , [])

    /**
     * Event handler for when the user changes the username input.
     * 
     * @param {event} event - The change event.
     */
    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    /**
     * Event handler for when the user changes the password input.
     * 
     * @param {event} event - The change event.
     */
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    // Event handler for the "Show password" button.
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    /**
     * Event handler for when the user clicks the submit button.
     */
    const handleClick = () => {
        // Encode the username and password in base64.
        const encodedString = Buffer.from(
            username + ':' + password
        ).toString('base64');
        // Clear the error message.
        setErrorMessage("");

        // Send a POST request to the API to authenticate the user and return a token.
        fetch('http://unn-w20044984.newnumyspace.co.uk/kf6012/coursework/api/auth', {
            method: 'POST',
            headers: new Headers({ Authorization: 'Basic ' + encodedString }),
        })
            .then((response) => response.json())
            .then((json) => {
                /**
                 * If the authentication was successful, set the authenticated prop to true
                 * and store the token in local storage.
                 */
                if (json.message === 'Success') {
                    props.handleAuthenticated(true);
                    localStorage.setItem('token', json.data.token);
                } else {
                    // If the authentication was not successful, set the error message.
                    setErrorMessage("Incorrect Username or Password. Please Try Again.");
                }
            })
            .catch((e) => {
                console.log(e.message);
            });
    }

    /**
     * handleUpdate is a function that sends a GET request to the API to retrieve the updated list of papers
     * and updates the papers array with the updated data.
     *
     * @param {void}
     *
     * @returns {void}
     */
    const handleUpdate = () => {
        // Send a GET request to the API to retrieve the updated list of papers
        fetch("http://unn-w20044984.newnumyspace.co.uk/kf6012/coursework/api/papers")
            .then(response => response.json())
            .then(json => {
                // Update the papers array with the updated data
                setPapers(json.data);
            })
            .catch(e => {
                console.log(e.message);
            });
    };

    // Event handler for the sign out button.
    const handleSignOut = () => {
        props.handleAuthenticated(false);
        setUsername("");
        setPassword("");
        setErrorMessage("");
        localStorage.removeItem('token');
    }

    // Map the papers array to an array of UpdateAward components.
    const allPapers = props.papers.map(
        // For each paper, create a new UpdateAward component.
        (value, key) => <section key={key}>
            <UpdateAward paper={value} handleUpdate={handleUpdate} />
        </section>
    )

    return (
        <div>
            {props.authenticated && <div>
                <input type="button" value="Sign Out" onClick={handleSignOut} />
                <h1>Welcome to the Admin Page</h1>
                <p>
                    This page allows you to view a list of papers and their current award status,
                    as well as update the award status of individual papers.
                </p>

                {allPapers}
            </div>}
            {!props.authenticated && <div>
                <h1>Welcome to the Admin Page</h1>
                <h3>Sign In</h3>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={handleUsername}
                />
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    value={password}
                    onChange={handlePassword}
                />
                <button onClick={handleShowPassword}>{showPassword ? "Hide Password" : "Show Password"}</button>
                <input type="button"
                    value="Submit"
                    onClick={handleClick}
                    disabled={!username || !password}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            }
            <Footer />
        </div>
    )

}
export default AdminPage