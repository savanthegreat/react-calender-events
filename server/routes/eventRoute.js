const express = require("express");
const router = express.Router();

const EventScheduler = require("../model/EventScheduler");

router.get("/", (req, res) => {
  EventScheduler.find()
    .then((events) => res.json(events))
    .catch((err) => res.status(404).send("No Events Found"));
});

// router.get("/book/:id", (req, res) => {
//   Book.findById(req.params.id)
//     .then((book) => res.json(book))
//     .catch((err) => res.status(404).send("No Book Found"));
// });

router.delete("/event/:id", (req, res) => {
  EventScheduler.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).send("Event Deleted"))
    .catch((err) => res.status(404).send("No Event Found " + req.params.id));
});

router.post("/create-event", (req, res) => {
  //   console.log(req.body);
  EventScheduler.create({
    event_title: req.body.title,
    start_date: req.body.start,
    end_date: req.body.end,
    event_description: req.body.description,
    event_priority: req.body.priority,
  })
    .then((event) => res.json(event))
    .catch((err) => res.status(404).send(err));
});

router.put("/event/:id", (req, res) => {
  EventScheduler.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
  })
    .then((event) => {
      console.log(event);
      res.json(event);
    })
    .catch((err) => res.status(404).send("Error in Updating Event."));
});

module.exports = router;
