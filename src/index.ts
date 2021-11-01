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
    // --- If u got no frogs ---
    // console.log("Inserting a new frog into the database...");
    // const frog = new Frog();
    // frog.name = "Filip";
    // frog.breed = "Tree Frog";
    // await frogRepository.save(frog);
    // console.log("saved");

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
