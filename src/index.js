import { getOffices, getUsers, request } from "./google-api/index.js";

const listOffice = await getOffices();
const listUsers = await getUsers(listOffice[0]);

console.log(listUsers);

request().catch((err) => {
  console.error(err.message);
});
