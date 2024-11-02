import React from 'react';
import './BookList.css';

function BookList({ books }) {
  const genres = Array.from(new Set(books.map(book => book.genre)));

  return (
    <div className="book-list">
      {genres.map((genre) => (
        <div key={genre} className="genre-section">
          <h2 className="genre-title">{genre}</h2>
          <ul>
            {books.filter(book => book.genre === genre).map((book) => (
              <li key={book.title} className="book-item">
                <span className="book-title">{book.title}</span>
                <span className="book-author">by {book.author}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default BookList;
