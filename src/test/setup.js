import dbConnection from "../core/mongo";


export const testSetup = async () => {
  await dbConnection();
}