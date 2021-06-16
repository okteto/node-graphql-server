import React from 'react';
import Book from './Book';
import { useQuery, gql } from "@apollo/client";

const BOOK_QUERY = gql`
{
    books{
        id, title, author
    }
}
`;

const BookList = () => {
    const { loading, error, data } = useQuery(BOOK_QUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
          {data && (
            <>
              {data.books.map((book) => (
                <Book key={book.id} book={book} />
              ))}
            </>
          )}
        </div>
      );
              
};

export default BookList;