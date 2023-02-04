/**
 * Footer is a functional component that displays a footer with information about the creator of the website.
 * 
 * @returns {JSX} - The JSX for the footer element.
 * 
 * @author Eridon Keta - 20044984.
 */

const Footer = () => {
    // Declare the footer information.
    const footerInfo = 'Created By: Eridon Keta - 2022/23 - Student ID: 20044984';

    return (
        <div className="footer">
            <footer>
                {footerInfo}
            </footer>
        </div>
    );
};

export default Footer;
