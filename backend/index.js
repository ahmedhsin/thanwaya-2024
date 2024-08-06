const express = require("express");
var cors = require('cors')

const sqlite3 = require("sqlite3").verbose();
const app = express();
app.use(cors())

const port = 3000;
const db = new sqlite3.Database("./data.db");
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/results/id/:id", async (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM results WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    res.json(row || {});
  });
});

app.get("/results/name/:name", async (req, res) => {
  const name = req.params.name;
db.all(
    "SELECT * FROM results WHERE name LIKE ? LIMIT 10",
    [`%${name}%`],
    (err, rows) => {
        if (err) {
            res.status(400).send(err.message);
            return;
        }
        res.json(rows || {});
    }
);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
