import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { createConnection } from "typeorm";
import { Frog } from "./entity/Frog";

import makeResolvers from "./resolvers";
import typeDefs from "./typeDefs";

(async () => {
  try {
    const connection = await createConnection();
    const resolvers = makeResolvers(connection);

    const server = new ApolloServer({
      resolvers,
      typeDefs,
    });

    const { url } = await server.listen();
    console.log(`Server is ready at ${url}`);
  } catch (error) {
    console.error(error);
  }
})();
