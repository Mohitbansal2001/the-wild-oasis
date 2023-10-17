const flags = require("./src/data/flags");
const fs = require("fs");

fs.writeFileSync(
  __dirname + "/flagsArray.json",
  JSON.stringify(
    Object.entries(flags).map(([label, value]) => ({ label, value })),
    null,
    2
  )
);
