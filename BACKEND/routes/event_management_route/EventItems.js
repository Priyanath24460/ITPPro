const express = require("express");
const router = express.Router();
const Event = require("../../models/event_management_model/EventItem");

router.route("/addn").post((req, res) => {
  const items = req.body; // Expecting an array of items
  console.log("Received items:", items); // Log received items
  Event.insertMany(items)
    .then(() => {
      console.log("Items added successfully");
      res.json("Items Added");
    })
    .catch((err) => {
      console.error("Error adding items:", err);
      res.status(500).json({ error: "Error adding items", details: err.message });
    });
});

router.route("/").get((req, res) => {
  Event.find()
    .then((items) => {
      console.log("Fetched items:", items); // Log fetched items
      res.json(items);
    })
    .catch((err) => {
      console.error("Error fetching items:", err);
      res.status(500).json("Error fetching items");
    });
});

router.route("/update/:id").put(async (req, res) => {
  let eventId = req.params.id;
  const { event_id,event_name, items, quantity, price, cost } = req.body;

  const updateEvent = {
    event_id,
    event_name,
    items,
    quantity,
    price,
    cost,
  };

  const update = await Event.findByIdAndUpdate(eventId, updateEvent)
    .then(() => {
      res.status(200).send({ status: "Event updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with update event" });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let eventId = req.params.id;

  await Event.findByIdAndDelete(eventId)
    .then(() => {
      res.status(200).send({ status: "Event deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with delete event", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let eventId = req.params.id;
  const event = await Event.findById(eventId)
    .then((event) => {
      res.status(200).send({ status: "event fetched", event });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with get event", error: err.message });
    });
});

router.route("/allitems").get((req, res) => {
  Event.find()
    .then((items) => {
      console.log("Fetched items:", items); // Log fetched items
      res.json(items);
    })
    .catch((err) => {
      console.error("Error fetching items:", err);
      res.status(500).json("Error fetching items");
    });
});

module.exports = router;
