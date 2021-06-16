const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book @key(fields: "id"){
    id: ID!
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
    {
      id: '1',
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      id: '2',
      title: 'City of Glass',
      author: 'Paul Auster',
    },
    {
      id: '3',
      title: '100 Years of Solitude',
      author: 'Gabriel García Marquez',
    },
    {
      id: '4',
      title: 'Telegraph Avenue',
      author: 'Michael Chabon',
    },
  ];

  const resolvers = {
    Query: {
      books: () => books,
    },
  };

  const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }])
  });

  server.listen({port: 4001, host: "0.0.0.0"}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
  