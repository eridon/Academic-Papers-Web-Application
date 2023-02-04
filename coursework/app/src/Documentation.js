import React from "react";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Footer from "./components/Footer";

/**
 * Documentation is a functional component that displays a heading, body text, and a footer.
 * 
 * @param {string} heading - The heading of the documentation page.
 * @param {string} body - The body text of the documentation page.
 * @param {array} items - An array of objects containing the name and description of each endpoint.
 * @returns {JSX.Element} - The documentation page.
 *
 * @author Eridon Keta - 20044984.
 */

const Documentation = ({ heading, body, items }) => {
    // Declare a state variable to store the selected endpoint information.
    const [selectedItem, setSelectedItem] = useState("");

    // Handles the selection of an endpoint from the dropdown menu and updates the state variable.
    heading = "Welcome to the Web API Documentation Page"
    body = "This page displays information about each web API endpoint that has been implemented for this project."
    items = [
        {
            id: 1,
            name: "/api",
            description: (
                <div>
                    <h3>URL:</h3>
                    <p>http://unn-w20044984.newnumyspace.co.uk/kf6012/coursework/api/</p>
                    <h3>Description:</h3>
                    <p>Returns an array containing website author information, link to the
                        documentation page and the name of the conference.
                    </p>
                    <h3>Methods Supported:</h3>
                    <p>GET</p>
                    <h3>Authentication Required:</h3>
                    <p>False</p>
                    <h3>Parameters Supported:</h3>
                    <p>None</p>
                    <h3>Likely Response Codes:</h3>
                    <ul>
                        <li>200 - OK (Base endpoint details are returned)</li>
                        <li>404 - Not Found (Incorrect Path)</li>
                    </ul>
                    <h3>Response Keys:</h3>
                    <ul>
                        <li>length</li>
                        <li>message</li>
                        <li>details</li>
                        <ul>
                            <li>Full Name</li>
                            <li>Student ID</li>
                        </ul>
                        <li>documentation</li>
                        <li>conference</li>
                    </ul>
                    <h3>Example Request:</h3>
                    <p>http://unn-w20044984.newnumyspace.co.uk/kf6012/coursework/api/</p>
                    <h3>Example Response:</h3>
                    <p>
                        <code>
                            "length": 2,
                            "message": "Success",
                            "details":
                            "Full Name": "Eridon Keta",
                            "Student ID": "20044984"
                            "documentation": [
                            "http://unn-w20044984.newnumyspace.co.uk/kf6012/coursework/app/documentation"
                            ],
                            "conference": [
                            "CHI PLAY '21: The Annual Symposium on Computer-Human Interaction in Play"
                            ]
                        </code>
                    </p>
                </div >
            )
        },
        {
            id: 2,
            name: "/api/authors",
            description: (
                <div>
                    <h3>URL:</h3>
                    <p>http://unn-w20044984.newnumyspace.co.uk/kf6012/coursework/api/authors</p>
                    <h3>Description:</h3>
                    <p>Returns an array of author information</p>
                    <h3>Methods Supported:</h3>
                    <p>GET</p>
                    <h3>Authentication Required:</h3>
                    <p>False</p>
                    <h3>Parameters Supported:</h3>
                    <ul>
                        <li>id (int, optional): Returns the author with the corresponding id</li>
                        <li>paper_id (string, optional): Returns author(s) associated with the corresponding paper id</li>
                        <li>search (string, optional): Returns author(s) with the corresponding first, middle, or last name</li>
                    </ul>
                    <h3>Likely Response Codes:</h3>
                    <ul>
                        <li>200 - OK (Author details are returned)</li>
                        <li>204 - No Content (No author exists with the given ID)</li>
                        <li>400 - Bad Request (There is an invalid parameter or combination of parameters)</li>
                        <li>404 - Not Found (Incorrect Path)</li>
                    </ul>
                    <h3>Response Keys:</h3>
                    <ul>
                        <li>length</li>
                        <li>message</li>
                        <li>data</li>
                        <ul>
                            <li>author_id</li>
                            <li>first_name</li>
                            <li>middle_initial</li>
                            <li>last_name</li>
                            <li>institution</li>
                            <li>country</li>
                        </ul>
                    </ul>
                    <h3>Example Request:</h3>
                    <p>http://unn-w20044984.newnumyspace.co.uk/kf6012/coursework/api/author?id=64216</p>
                    <h3>Example Response:</h3>
                    <p>
                        <code>
                            "length": 1,
                            "message": "Success",
                            "data": [
                            "author_id": "64216",
                            "first_name": "Mihovil",
                            "middle_initial": null,
                            "last_name": "Karac",
                            "institution": "TU Delft",
                            "country": "Netherlands"
                            ]
                        </code>
                    </p>
                </div >
            ),
        },
        {
            id: 3,
            name: "/api/papers",
            description: (
                <div>
                    <h3>URL:</h3>
                    <p>http://unn-w20044984.newnumyspace.co.uk/kf6012/coursework/api/papers</p>
                    <h3>Description:</h3>
                    <p>Returns an array of paper information</p>
                    <h3>Methods Supported:</h3>
                    <p>GET</p>
                    <h3>Authentication Required:</h3>
                    <p>False</p>
                    <h3>Parameters Supported:</h3>
                    <ul>
                        <li>id (int, optional): Returns the paper with the corresponding id</li>
                        <li>track (string, optional): Returns papers with corresponding track type</li>
                        <li>award (string, optional): Returns papers with the corresponding award status</li>
                        <li>search (string, optional): Returns papers with the corresponding search term in the title or abstract</li>
                    </ul>
                    <h3>Likely Response Codes:</h3>
                    <ul>
                        <li>200 - OK (Paper details are returned)</li>
                        <li>204 - No Content (No paper exists with the given ID)</li>
                        <li>400 - Bad Request (There is an invalid parameter or combination of parameters)</li>
                        <li>404 - Not Found (Incorrect Path)</li>
                    </ul>
                    <h3>Response Keys:</h3>
                    <ul>
                        <li>length</li>
                        <li>message</li>
                        <li>data</li>
                        <ul>
                            <li>paper_id</li>
                            <li>title</li>
                            <li>award</li>
                            <li>abstract</li>
                            <li>full_track</li>
                            <li>short_track</li>
                        </ul>
                    </ul>
                    <h3>Example Request:</h3>
                    <p>http://unn-w20044984.newnumyspace.co.uk/kf6012/coursework/api/papers?id=64455</p>
                    <h3>Example Response:</h3>
                    <p>
                        <code>
                            "length": 1,
                            "message": "Success",
                            "data": [
                            "paper_id": "64455",
                            "title": "Can Digital Games Teach Scientific Inquiry? A Case of How Affordances Can Become Constraints",
                            "award": null,
                            "abstract": "Digital games are increasingly being used to teach the processes of scientific inquiry. These games often make at least one of four key assumptions about scientific inquiry: that inquiry is a problem-solving process which is value-neutral, bounded by strict subject-matter constraints, and conducted by practitioners separable from society. However, feminist, STS, and pragmatist scholars have demonstrated the flawed nature of these assumptions. They highlight instead that: inquiry is a process of problematization that is value-laden, unbounded by subject-matter, and conducted by practitioners who socially, politically, and culturally situated. In this paper, I argue that three of the key affordances of digital games—their procedural, evaluative, and fictional qualities—can constrain their ability to teach inquiry understood as such. I examine these affordances and their relationship to the nature of scientific inquiry through a design case examining our game Solaria designed to teach students how to inquire into the development of solar cells. Specifically, I ask: To what extent can the procedural, evaluative, and fictional affordances of digital games (designed to teach students about solar cells) support the learning of scientific inquiry as a problematizing, situated, and value-laden process, unbounded by subject-matter constraints? I discuss how these affordances of games supported but ultimately limited the design of the game by trivializing real situations, predetermining criteria for progress, and distancing students from real-world risks and responsibilities, respectively. In conclusion, I briefly discuss how understanding these limitations can support the design of educational environments to complement digital games for teaching scientific inquiry.",
                            "full_track": "CHI PLAY 2021 Full Papers",
                            "short_track": "fullpapers"
                            ]
                        </code>
                    </p>

                </div >
            ),
        },
        {
            id: 4,
            name: "/api/auth",
            description: (
                <div>
                    <h3>URL:</h3>
                    <p>http://unn-w20044984.newnumyspace.co.uk/kf6012/coursework/api/auth</p>
                    <h3>Description:</h3>
                    <p>Returns an array of token information</p>
                    <h3>Methods Supported:</h3>
                    <p>POST</p>
                    <h3>Authentication Required:</h3>
                    <p>True</p>
                    <h3>Parameters Supported:</h3>
                    <p>None</p>
                    <h3>Likely Response Codes:</h3>
                    <ul>
                        <li>200 - OK (Token details are returned)</li>
                        <li>401 - Authorisation Required (Invalid Credientials)</li>
                        <li>404 - Not Found (Incorrect Path)</li>
                        <li>405 - Method Not Allowed (Invalid Request Method)</li>
                    </ul>
                    <h3>Response Keys:</h3>
                    <ul>
                        <li>length</li>
                        <li>message</li>
                        <li>data</li>
                        <ul>
                            <li>token</li>
                        </ul>
                    </ul>
                    <h3>Example Request:</h3>
                    <p>http://unn-w20044984.newnumyspace.co.uk/kf6012/coursework/api/auth</p>
                    <h3>Example Response:</h3>
                    <p>
                        <code>
                            "length": 0,
                            "message": "Success",
                            "data":
                            "token": ""
                        </code>
                    </p>
                </div >
            ),
        },
        {
            id: 5,
            name: "/api/update",
            description: (
                <div>
                    <h3>URL:</h3>
                    <p>http://unn-w20044984.newnumyspace.co.uk/kf6012/coursework/api/update</p>
                    <h3>Description:</h3>
                    <p>Updates the award status of a paper in the database</p>
                    <h3>Methods Supported:</h3>
                    <p>POST</p>
                    <h3>Authentication Required:</h3>
                    <p>True</p>
                    <h3>Parameters Supported:</h3>
                    <p>None</p>
                    <h3>Likely Response Codes:</h3>
                    <ul>
                        <li>200 - OK (Award status is updated)</li>
                        <li>400 - Bad Request (Award Parameter Required)</li>
                        <li>401 - Unauthorised (Bearer Token Required)</li>
                        <li>404 - Not Found (Incorrect Path)</li>
                        <li>405 - Method Not Allowed (Invalid Request Method)</li>
                    </ul>
                    <h3>Response Keys:</h3>
                    <ul>
                        <li>length</li>
                        <li>message</li>
                        <li>data</li>
                    </ul>
                    <h3>Example Request:</h3>
                    <p>http://unn-w20044984.newnumyspace.co.uk/kf6012/coursework/api/auth</p>
                    <h3>Example Response:</h3>
                    <p>
                        <code>

                            "length": 0,
                            "message": "Success",
                            "data": null
                        </code>
                    </p>
                </div >
            ),
        }
    ];

    return (
        <div>
            {/* Render the heading and body text */}
            <header>
                <h1>{heading}</h1>
                <p>{body}</p>
            </header>
            <main>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Select an Endpoint
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {items.map(item => {
                            return (
                                <Dropdown.Item key={item.id} onClick={() => setSelectedItem(item.description)}>
                                    {item.name}
                                </Dropdown.Item>
                            );
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                {selectedItem ? <div>{selectedItem}</div> : null}
            </main>
            <Footer />
        </div>
    );
};

export default Documentation;
