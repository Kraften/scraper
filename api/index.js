var express = require("express");
const app = express();
const axios = require("axios").default;

app.get("/", (req, res) => {
  axios
    .get(
      "https://api.browse.ai/v2/robots/7dc791d6-407f-40a7-bb1c-44828319a52b/tasks/34b674b6-13f5-410c-b051-3437d9c27f44",
      {
        headers: {
          Authorization:
            "Bearer 7027a69b-202f-41ce-bc8b-4ddd7f5af1e0:290a3601-98c6-4ff1-b171-ad38a796cbd2",
        },
      }
    )
    .then((as) => {
      const object = {
        name: as.data.result.capturedTexts.name,
        concerts: as.data.result.capturedLists.concerts,
      };
      console.log(object);
      res.send(object);
    });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
