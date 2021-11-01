import { gql } from "apollo-server";

export default gql`
  type Query {
    frogs: [Frog]
    frog(id: ID!): Frog
  }

  type Mutation {
    addFrog(name: String!, breed: String!): Frog
  }

  type Frog {
    id: ID!
    name: String
    breed: String
  }
`;
