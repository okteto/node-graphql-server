import React from 'react';

const Book = (props) => {
  const { book } = props;
  return (
    <div>
      <div>
        {book.title} - {book.author}
      </div>
    </div>
  );
};

export default Book;