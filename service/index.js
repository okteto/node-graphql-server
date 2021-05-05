const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const { v4: uuidv4 } = require('uuid');
const Redis = require("ioredis");

const redis = new Redis(6379, "redis");
const key = "books";

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book{
    id: String
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
    addBook(title: String!, author: String!): Book!
  }
`;

  const resolvers = {
    Query: {
      books: async () => {
        const keys = await redis.lrange("books", 0, -1);
        
        const books = [];
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const b = await redis.hgetall(key);
          if (b.id) {
            books.push(b);
          }
        }
        
        return books;
      },
    },
    Mutation: {
      addBook: async (_, {title, author}, {dataSources}) => {
        const book = {
          id: uuidv4(),
          title: title,
          author: author,
        }

        await redis.hmset(`book:${book.id}`, book)
        await redis.lpush("books", `book:${book.id}`)

        return book;
      },
    }
  };

  const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }])
  });

  server.listen({port: 4001, host: "0.0.0.0"}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
  