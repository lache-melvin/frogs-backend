import { createConnection } from "typeorm";
import { Frog } from "./entity/Frog";

async function getAllFrogs(): Promise<Array<Frog>> {
  const connection = await createConnection();
  let frogRepository = connection.getRepository(Frog);
  const frogs = await frogRepository.find();
  return frogs;
}

export default {
  Query: {
    frogs: getAllFrogs,
  },
};
