# My Books App

This repository contains an example of how to develop a federated GraphQL application using Node, [Apollo Server](https://github.com/apollographql/apollo-server), React, and Okteto.

[![Develop on Okteto](https://okteto.com/develop-okteto.svg)](https://cloud.okteto.com/deploy)

## Components

### Proxy

NGINX proxy fronting the entire application. Use this so the application has a single entry point.

### Frontend

A react application that displays the list of books. It calls the graphQL service to get the information.

### Gateway

A GraphQL gateway service. This allows us to federate multiple services together under the same endpoint.

### Service

A GraphQL service that returns a list of books.

## Develop with Okteto

Deploy your copy of the application in Okteto Cloud. After that, open a terminal, navigate to the folder of service you want to develop, and run `okteto up` to activate the development environment, and `yarn start` to star the service in your remote terminal. All the dependencies and the code will be synchronized by okteto.