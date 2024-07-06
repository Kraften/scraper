var express = require("express");
const app = express();
const axios = require("axios").default;
require("dotenv").config();

app.get("/", (req, res) => {
  axios
    .get(
      "https://api.browse.ai/v2/robots/7dc791d6-407f-40a7-bb1c-44828319a52b/tasks/34b674b6-13f5-410c-b051-3437d9c27f44",
      {
        headers: {
          Authorization: `Bearer ${process.env.BROWSEAI_TOKEN}`,
        },
      }
    )
    .then((as) => {
      const object = {
        name: as.data.result.capturedTexts.name,
        concerts: as.data.result.capturedLists.concerts,
      };
      res.send(object);
    });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
