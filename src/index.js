import request from "./google-api/index.js";

request().catch((err) => {
  console.error(err.message);
});
