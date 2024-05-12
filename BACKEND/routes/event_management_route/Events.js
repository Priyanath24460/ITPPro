const router = require("express").Router();
const Event = require("../../models/event_management_model/Event");
const mongoose = require('mongoose');

router.route("/add").post(async (req, res) => {
    const { event_id, event_name, date, time, location } = req.body;

    // Check if the event_id already exists
    const existingEvent = await Event.findOne({ event_id });
    if (existingEvent) {
        return res.status(400).json({ error: "Event ID already exists" });
    }

    const newEvent = new Event({
        event_id,
        event_name,
        date,
        time,
        location
    });

    newEvent.save()
        .then(() => res.status(200).json("Event Added"))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Error adding event" });
        });
});

router.route("/").get((req, res) => {
    Event.find()
        .then((events) => res.json(events))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Error fetching events" });
        });
});

router.put('/update/:id', async (req, res) => {
    try {
      const eventId = req.params.id;
      const { event_id, event_name, date, time, location } = req.body;
  
      // Update the event in the database using the event_id field
      const updatedEventDoc = await Event.findOneAndUpdate({ event_id: eventId }, { event_name, date, time, location }, { new: true });
  
      if (!updatedEventDoc) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      // Event successfully updated
      res.status(200).json(updatedEventDoc);
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.route("/delete/:event_id").delete(async (req, res) => {
    let eventId = req.params.event_id;
    console.log("Attempting to delete event with ID:", eventId);

    try {
        // Assuming 'event_id' is a field in your Event model
        await Event.findOneAndDelete({ event_id: eventId });
        console.log("Event deleted successfully:", eventId);
        res.status(200).send({ status: "Event deleted" });
    } catch (err) {
        console.error("Error deleting event:", err.message);
        res.status(500).send({ status: "Error with delete event", error: err.message });
    }
});


router.route("/get/:id").get(async (req,res)=>{
    let userId = req.params.id;
    const user = await Event.findById(userId)
    .then((event)=>{
        res.status(200).send({status: "event fetched", event});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get event", error: err.message});
    });
});

module.exports = router;
