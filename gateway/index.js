const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  serviceList: [
    // List of federation-capable GraphQL endpoints...
    { name: "books", url: "http://service:4001/graphql" },
  ]
});

const server = new ApolloServer({
  gateway, subscriptions: false, playground: true, introspection: true
});

server.listen({port: 4000, host:"0.0.0.0"}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});