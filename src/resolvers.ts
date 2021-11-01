import { Connection } from "typeorm";
import { Frog } from "./entity/Frog";

export default function makeResolvers(connection: Connection) {
  return {
    Query: {
      frogs: async () => await getAllFrogs(connection),
    },
  };
}

async function getAllFrogs(connection: Connection): Promise<Array<Frog>> {
  let frogRepository = connection.getRepository(Frog);
  const frogs = await frogRepository.find();
  return frogs;
}
