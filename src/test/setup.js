import connectWithDb from "../core/mongo";


export const testSetup = async() => {
  await connectWithDb();
  console.log('hello')
}