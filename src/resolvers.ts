import { Connection } from "typeorm";
import { Frog } from "./entity/Frog";

export default function makeResolvers(connection: Connection) {
  return {
    Query: {
      frogs: async () => await getAllFrogs(connection),
    },
    Mutation: {
      addFrog: async (
        _: any,
        { name, breed }: { name: string; breed: string }
      ) => await insertFrog({ name, breed }, connection),
    },
  };
}

async function getAllFrogs(connection: Connection): Promise<Array<Frog>> {
  let frogRepository = connection.getRepository(Frog);
  const frogs = await frogRepository.find();
  return frogs;
}

async function insertFrog(
  frog: { name: string; breed: string },
  connection: Connection
): Promise<Frog | undefined> {
  let frogRepository = connection.getRepository(Frog);
  const newFrog = new Frog();
  newFrog.name = frog.name;
  newFrog.breed = frog.breed;
  await frogRepository.save(newFrog);

  const createdFrog = await frogRepository.findOne(newFrog.id);
  return createdFrog;
}
