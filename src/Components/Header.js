// Header.js
import React from "react";
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <h1>Book Recommender</h1>
                <h2>Discover Your Next Great Read!</h2>
            </div>
        );
    }
}

export default Header;
