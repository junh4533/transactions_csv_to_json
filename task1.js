const fs = require("file-system");

let example = [
  {
    id: 12411824,
    name: "Hilary Gulgowski PhD",
    email: "ilana.mayert@kuhn-green.org",
  },
  {
    id: "12411824",
    name: "Hilary Gulgowski PhD",
    email: "ilana.mayert@kuhn-green.org",
  },
];

fs.readFile("./users.csv", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  }
  {
    const splitData = data.split("\n");
    // console.log(splitData);
    // console.log(splitData[0].split(","));

    let output = [];
    for (let i = 1; i < splitData.length; i++) {
      let obj = {};
      let rawData = splitData[i].split(",");
      obj["id"] = rawData[0];
      obj["name"] = rawData[1];
      obj["email"] = rawData[2];
      output.push(obj);
    }

    console.log(JSON.stringify(output));
  }
});
