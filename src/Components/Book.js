import React from 'react';
import axios from 'axios';
import config from '../config';
import './Book.css';

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            trendingBooks: [],
            searchResults: [],
            searchQuery: '',
            isSearching: false,
        };
    }

    TRENDING_URL = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=';
    SEARCH_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

    componentDidMount() {
        // Fetch trending books when the component mounts
        axios.get(this.TRENDING_URL + config.MY_KEY)
            .then(res => {
                this.setState({
                    isLoaded: true,
                    trendingBooks: res.data.results.books
                });
            })
            .catch(error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleSearchSubmit = () => {
        const { searchQuery } = this.state;
        if (searchQuery.trim() !== '') {
            // Set searching state to true
            this.setState({ isSearching: true, isLoaded: false });

            // Fetch search results from Google Books API
            axios.get(`${this.SEARCH_URL}${searchQuery}`)
                .then(res => {
                    this.setState({
                        isLoaded: true,
                        searchResults: res.data.items || [],
                        error: null,
                    });
                })
                .catch(error => {
                    this.setState({
                        isLoaded: true,
                        error,
                        searchResults: []
                    });
                });
        }
    };

    render() {
        const { error, isLoaded, trendingBooks, searchResults, searchQuery, isSearching } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            // Determine which list to display based on whether a search is active
            const booksToDisplay = isSearching ? searchResults : trendingBooks;

            return (
                <div className="content">
                    {/* Search input */}
                    <input
                        type="text"
                        placeholder="Search for any book..."
                        value={searchQuery}
                        onChange={this.handleSearchChange}
                        className="search-input"
                    />
                    <button onClick={this.handleSearchSubmit}>Search</button>

                    {/* Book list */}
                    <div className="book-list">
                        {booksToDisplay.map((item, index) => (
                            <div key={index} className="book-item">
                                <img src={item.volumeInfo?.imageLinks?.thumbnail || item.book_image} alt="Book cover" />
                                <div className="book-info">
                                    <h3>{item.volumeInfo?.title || item.title}</h3>
                                    <p>by {item.volumeInfo?.authors?.join(', ') || item.author}</p>
                                    <p>{item.volumeInfo?.description || item.description}</p>
                                    <a href={item.volumeInfo?.infoLink || item.amazon_product_url}>Buy on Amazon</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    }
}

export default Book;
