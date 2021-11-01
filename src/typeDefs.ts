import { gql } from "apollo-server";

export default gql`
  type Query {
    frogs: [Frog]
  }

  type Frog {
    id: ID!
    name: String
    breed: String
  }
`;
