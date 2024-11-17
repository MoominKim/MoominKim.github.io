const express = require("express");
const app = express();

app.use(express.json());

let counters = { a: 0, b: 0, c: 0, d: 0 };

app.post("/api/increase", (req, res) => {
  const { button } = req.body;
  if (counters.hasOwnProperty(button)) {
    counters[button]++;
    res.json({ success: true, counter: counters[button] });
  } else {
    res.status(400).json({ success: false, message: "Invalid button" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
