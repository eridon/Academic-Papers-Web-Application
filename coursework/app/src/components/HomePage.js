import React from "react";
import library from "../components/img/janko-ferlic-sfL_QOnmy00-unsplash.jpg";
import Footer from "./Footer";

/**
 * HomePage is a functional component that displays a heading, body text, an image, and a footer.
 *
 * @author Eridon Keta - 20044984.
 */

const HomePage = () => {
    // Declare the heading and body text for the page.
    const heading = "Welcome to the Home Page";
    const body = "This website displays information about research papers that were presented at the following conference: CHI PLAY 2021: The Annual Symposium on Computer-Human Interaction in Play.";


    return (
        <div>
            {/* Render the heading and body text */}
            <header>
                <h1>{heading}</h1>
                <p>{body}</p>
            </header>
            {/* Render the image and image credit */}
            <main>
                <img src={library} alt="" title="A photo of a well-lit library" />
                <p>
                    Photo by:{" "}
                    <a href="https://unsplash.com/@itfeelslikefilm?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                        🇸🇮 Janko Ferlič
                    </a>{" "}
                    on{" "}
                    <a href="https://unsplash.com/photos/sfL_QOnmy00?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                        Unsplash
                    </a>
                </p>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
