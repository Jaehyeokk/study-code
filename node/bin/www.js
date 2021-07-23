const app = require("../index");
const syncDb = require("./sync-db");

syncDb().then(() => {
  console.log("Sync database");
  // Server
  app.listen(3000, function () {
    console.log("Server runnig at port 3000");
  });
});
