const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const Redis = require("ioredis");

const redis = new Redis(6379, "redis");
const key = "books";

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

  type Mutation {
    addBook(id: [ID]!, title: String!, author: String!): Book!
  }
`;

  const resolvers = {
    Query: {
      books: () => {
        const r = await redis.lrange(key, 0, -1);
        const result = [];
        r.forEach(b => {
          console.log(r);
        })

        return result;
      },
    },
    Mutation: {
      addBook: (id, title, author) => {
        const book = {
          id: id, 
          title: title, 
          author:author
        };

        return redis.rpush(key, book)
      },
    }
  };

  const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }])
  });

  server.listen({port: 4001, host: "0.0.0.0"}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
  