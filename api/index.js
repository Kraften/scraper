var express = require("express");
const app = express();
const axios = require("axios").default;
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");
require("dotenv").config();

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY.split(String.raw`\n`).join("\n"),
  }),
});

const db = getFirestore();

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
    .then(async (response) => {
      const concerts = response.data.result.capturedLists.concerts.map((c) => {
        return {
          date: c.date.replace(/(\r\n|\n|\r)/gm, " "),
          place: c.place.replace(/(\r\n|\n|\r)/gm, " "),
          venue: c.venue
            .replace(/(\r\n|\n|\r)/gm, " ")
            .replace(c.place, "")
            .replace("  ", ""), // Removes \n and checks if venue includes city and country name if it does, removes it.
        };
      });
      const docRef = db
        .collection("concerts")
        .doc(response.data.result.capturedTexts.name);

      await docRef.set({ ...concerts });
      res.send(concerts);
    });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
