import { Connection } from "typeorm";
import { Frog } from "./entity/Frog";

export default function makeResolvers(connection: Connection) {
  return {
    Query: {
      frogs: async () => await getAllFrogs(connection),
      frog: async (_: any, { id }: { id: any }) =>
        await getFrog(id, connection),
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

async function getFrog(
  id: any,
  connection: Connection
): Promise<Frog | undefined> {
  let frogRepository = connection.getRepository(Frog);
  const frog = await frogRepository.findOne(id);
  return frog;
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

  const createdFrog = await getFrog(newFrog.id, connection);
  return createdFrog;
}
